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

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
OUTPUT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\verification_screens'
os.makedirs(OUTPUT_DIR, exist_ok=True)

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
    http_port = find_free_port()
    cdp_port = find_free_port()

    # Start local HTTP Server
    os.chdir(PROJECT_DIR)
    httpd = HTTPServer(('127.0.0.1', http_port), SimpleHTTPRequestHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"Local HTTP server running at http://127.0.0.1:{http_port}")

    # Launch Edge in headless mode with remote debugging
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
    time.sleep(1.8)

    try:
        # Get CDP targets
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
        cdp.send("Console.enable")

        time.sleep(1.5)

        # 1. Check Console Errors
        check_res = cdp.send("Runtime.evaluate", {
            "expression": "JSON.stringify({ title: document.title, rootChildren: document.getElementById('root')?.children.length || 0, mandapExists: !!document.getElementById('mandap-hero'), meetCoupleExists: !!document.getElementById('meet-couple'), ceremoniesCount: document.querySelectorAll('.ceremony-stream-card').length, countdownExists: !!document.getElementById('wedding-countdown') })"
        })
        eval_data = json.loads(check_res.get('result', {}).get('result', {}).get('value', '{}'))
        print("DOM State Verification:", eval_data)

        # 2. Test Device Views & Capture Screenshots
        viewports = [
            ("desktop_1280x850", 1280, 850, 1.0),
            ("tablet_768x1024", 768, 1024, 1.0),
            ("mobile_iphone14_430x932", 430, 932, 2.0),
            ("mobile_iphone12_390x844", 390, 844, 2.0),
            ("mobile_android_360x780", 360, 780, 2.0),
        ]

        for name, w, h, dsf in viewports:
            cdp.send("Emulation.setDeviceMetricsOverride", {
                "width": w,
                "height": h,
                "deviceScaleFactor": dsf,
                "mobile": (w <= 640)
            })
            time.sleep(0.5)

            # Scroll back to top
            cdp.send("Runtime.evaluate", {
                "expression": "(() => { const p = document.getElementById('invitation-scroll-pane'); if (p) p.scrollTop = 0; window.scrollTo(0,0); })()"
            })
            time.sleep(0.5)

            # Capture Mandap Hero Screenshot
            shot = cdp.send("Page.captureScreenshot", {"format": "png"})
            data = base64.b64decode(shot['result']['data'])
            file_path = os.path.join(OUTPUT_DIR, f"{name}_mandap.png")
            with open(file_path, "wb") as f:
                f.write(data)
            print(f"Captured: {file_path}")

        # 3. Capture Scrolled Meet the Couple & Character Animation
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 430,
            "height": 932,
            "deviceScaleFactor": 2.0,
            "mobile": True
        })
        time.sleep(0.3)

        # Scroll to Meet the Couple
        cdp.send("Runtime.evaluate", {
            "expression": "(() => { const el = document.getElementById('meet-couple'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' }); })()"
        })
        time.sleep(1.0)
        shot = cdp.send("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(OUTPUT_DIR, "mobile_meet_couple.png"), "wb") as f:
            f.write(base64.b64decode(shot['result']['data']))
        print("Captured: mobile_meet_couple.png")

        # Scroll to Groom & Bride Portraits
        cdp.send("Runtime.evaluate", {
            "expression": "(() => { const el = document.getElementById('groom-intro'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' }); })()"
        })
        time.sleep(0.8)
        shot = cdp.send("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(OUTPUT_DIR, "mobile_groom_portrait.png"), "wb") as f:
            f.write(base64.b64decode(shot['result']['data']))
        print("Captured: mobile_groom_portrait.png")

        # Scroll to Ceremonies & Countdown
        cdp.send("Runtime.evaluate", {
            "expression": "(() => { const el = document.getElementById('wedding-ceremonies'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' }); })()"
        })
        time.sleep(0.8)
        shot = cdp.send("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(OUTPUT_DIR, "mobile_ceremonies.png"), "wb") as f:
            f.write(base64.b64decode(shot['result']['data']))
        print("Captured: mobile_ceremonies.png")

        # Scroll to Venue & Navigation
        cdp.send("Runtime.evaluate", {
            "expression": "(() => { const el = document.getElementById('venue-location'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' }); })()"
        })
        time.sleep(0.8)
        shot = cdp.send("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(OUTPUT_DIR, "mobile_venue_map.png"), "wb") as f:
            f.write(base64.b64decode(shot['result']['data']))
        print("Captured: mobile_venue_map.png")

        print("ALL VERIFICATION SCREENSHOTS SUCCESSFULLY CAPTURED!")

    finally:
        edge_proc.terminate()
        httpd.shutdown()

if __name__ == '__main__':
    run_verification()
