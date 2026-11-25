import os
import sys
import time
import socket
import json
import base64
import subprocess
import urllib.request
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
import pypdfium2 as pdfium

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'verification_screens')
os.makedirs(OUTPUT_DIR, exist_ok=True)

class WeddingInvitationHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.lower().endswith('.pdf'):
            self.send_header('Content-Type', 'application/pdf')
            self.send_header('Content-Disposition', 'inline')
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

class CDP:
    def __init__(self, host, port, path):
        self.sock = socket.create_connection((host, port))
        key = base64.b64encode(os.urandom(16)).decode('utf-8')
        req = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {host}:{port}\r\n"
            f"Upgrade: websocket\r\n"
            f"Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            f"Sec-WebSocket-Version: 13\r\n\r\n"
        )
        self.sock.sendall(req.encode('utf-8'))
        resp = self.sock.recv(4096).decode('utf-8')
        assert "101" in resp, f"Upgrade failed: {resp}"
        self.msg_id = 0

    def send(self, method, params=None):
        self.msg_id += 1
        cid = self.msg_id
        payload = json.dumps({"id": cid, "method": method, "params": params or {}}).encode('utf-8')
        length = len(payload)
        mask = os.urandom(4)
        h = bytearray([0x81, 0x80 | length]) if length < 126 else bytearray([0x81, 0x80 | 126]) + length.to_bytes(2, 'big')
        h += mask
        masked = bytearray(b ^ mask[i % 4] for i, b in enumerate(payload))
        self.sock.sendall(h + masked)
        return self.recv(cid)

    def recv(self, target_id=None):
        while True:
            head = self._recv_exact(2)
            b1, b2 = head[0], head[1]
            length = b2 & 0x7F
            if length == 126:
                length = int.from_bytes(self._recv_exact(2), 'big')
            elif length == 127:
                length = int.from_bytes(self._recv_exact(8), 'big')
            data = self._recv_exact(length)
            msg = json.loads(data.decode('utf-8', errors='ignore'))
            if target_id is None or msg.get('id') == target_id:
                return msg

    def _recv_exact(self, n):
        buf = bytearray()
        while len(buf) < n:
            chunk = self.sock.recv(n - len(buf))
            if not chunk:
                raise EOFError("Socket closed")
            buf.extend(chunk)
        return buf

def find_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

def run_verification():
    # 1. Verify PDF Page Count is strictly 1
    pdf_path = os.path.join(PROJECT_DIR, 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf')
    doc = pdfium.PdfDocument(pdf_path)
    page_count = len(doc)
    print(f"VERIFICATION 1: PDF total page count = {page_count}")
    assert page_count == 1, f"Expected exactly 1 page in PDF, but found {page_count}!"

    # 2. Start local server
    http_port = find_free_port()
    cdp_port = find_free_port()

    os.chdir(PROJECT_DIR)
    httpd = HTTPServer(('127.0.0.1', http_port), WeddingInvitationHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"Local HTTP server running at http://127.0.0.1:{http_port}")

    # 3. Test PDF HTTP Headers directly
    pdf_test_url = f"http://127.0.0.1:{http_port}/Kuldeep_Teena_Royal_Wedding_Invitation.pdf"
    req = urllib.request.Request(pdf_test_url, method='HEAD')
    with urllib.request.urlopen(req) as resp:
        content_type = resp.headers.get('Content-Type')
        content_disp = resp.headers.get('Content-Disposition')
        print(f"VERIFICATION 2: PDF Headers -> Status={resp.status}, Content-Type={content_type}, Content-Disposition={content_disp}")
        assert 'application/pdf' in content_type, f"Unexpected Content-Type: {content_type}"
        assert 'inline' in content_disp, f"Unexpected Content-Disposition: {content_disp}"

    # 4. Launch Edge in headless mode
    edge_cmd = [
        EDGE_PATH,
        f"--remote-debugging-port={cdp_port}",
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        f"http://127.0.0.1:{http_port}/index.html"
    ]
    edge_proc = subprocess.Popen(edge_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2.0)

    try:
        targets_url = f"http://127.0.0.1:{cdp_port}/json"
        with urllib.request.urlopen(targets_url) as resp:
            targets = json.loads(resp.read().decode())
        
        target = next(t for t in targets if t.get('type') == 'page')
        ws_url = target['webSocketDebuggerUrl']
        host_port, path = ws_url.replace("ws://", "").split('/', 1)
        host, port_str = host_port.split(':')
        cdp = CDP(host, int(port_str), '/' + path)

        cdp.send("Page.enable")
        cdp.send("Runtime.enable")
        time.sleep(1.5)

        # 5. Verify DOM State & ensure NO white page exists
        check_dom = cdp.send("Runtime.evaluate", {
            "expression": "JSON.stringify({ title: document.title, coverExists: !!document.getElementById('invitation-cover'), openBtnExists: !!document.getElementById('btn-open-invitation'), downloadBtnExists: !!document.getElementById('btn-download-pdf-cover'), groomImgLoaded: document.querySelector('.portrait-groom img')?.complete, brideImgLoaded: document.querySelector('.portrait-bride img')?.complete, whiteCardExists: !!document.querySelector('.pearl-stationery-card'), scheduleTableExists: !!document.querySelector('.stationery-ceremonies-card') })"
        })
        dom_data = json.loads(check_dom.get('result', {}).get('result', {}).get('value', '{}'))
        print("VERIFICATION 3: DOM State:", dom_data)

        assert dom_data.get('coverExists'), "Cover page not found in DOM!"
        assert not dom_data.get('whiteCardExists'), "Old white card still exists in DOM!"
        assert not dom_data.get('scheduleTableExists'), "Old schedule table still exists in DOM!"
        print("CONFIRMED: Old white page is completely absent from DOM!")

        # 6. Capture Screenshots on Desktop and Mobile
        # Viewport: Desktop (1280x850)
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 1280, "height": 850, "deviceScaleFactor": 1.0, "mobile": False
        })
        time.sleep(0.6)
        shot1 = cdp.send("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(OUTPUT_DIR, "screen_cover_desktop.png"), "wb") as f:
            f.write(base64.b64decode(shot1.get("result", {}).get("data", "")))
        print("Captured: screen_cover_desktop.png")

        # Viewport: iPhone 14 (430x932)
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 430, "height": 932, "deviceScaleFactor": 2.0, "mobile": True
        })
        time.sleep(0.6)
        shot2 = cdp.send("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(OUTPUT_DIR, "screen_cover_mobile_iphone.png"), "wb") as f:
            f.write(base64.b64decode(shot2.get("result", {}).get("data", "")))
        print("Captured: screen_cover_mobile_iphone.png")

        # Viewport: Android (360x780)
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 360, "height": 780, "deviceScaleFactor": 2.0, "mobile": True
        })
        time.sleep(0.6)
        shot3 = cdp.send("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(OUTPUT_DIR, "screen_cover_mobile_android.png"), "wb") as f:
            f.write(base64.b64decode(shot3.get("result", {}).get("data", "")))
        print("Captured: screen_cover_mobile_android.png")

        print("\nALL VERIFICATIONS PASSED SUCCESSFULLY!")

    finally:
        edge_proc.terminate()

if __name__ == '__main__':
    run_verification()
