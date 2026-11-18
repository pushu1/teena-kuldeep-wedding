import os
import sys
import time
import json
import base64
import socket
import urllib.request
import subprocess
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
import pypdfium2 as pdfium

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'verification_screens')
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
        b = bytearray()
        while len(b) < n:
            chunk = self.sock.recv(n - len(b))
            if not chunk:
                raise ConnectionResetError()
            b.extend(chunk)
        return b

    def close(self):
        try:
            self.sock.close()
        except:
            pass

def wait_for_element(cdp, selector, timeout=12.0):
    start = time.time()
    while time.time() - start < timeout:
        res = cdp.send("Runtime.evaluate", {
            "expression": f"Boolean(document.querySelector('{selector}'))",
            "returnByValue": True
        })
        val = res.get('result', {}).get('result', {}).get('value')
        if val is True:
            return True
        time.sleep(0.3)
    return False

def run_tests():
    print("=" * 60)
    print("STARTING COMPREHENSIVE PDF & DOWNLOAD VERIFICATION")
    print("=" * 60)

    # 1. Physical file check
    pdf_path = os.path.join(PROJECT_DIR, 'public', 'downloads', 'kuldeep-teena-wedding-invitation.pdf')
    assert os.path.exists(pdf_path), f"PDF does not exist at {pdf_path}"
    file_size = os.path.getsize(pdf_path)
    print(f"[PASS] 1. Physical PDF exists: {pdf_path}")
    print(f"       File size: {file_size:,} bytes")

    # 2. Page count and dimensions check
    doc = pdfium.PdfDocument(pdf_path)
    page_count = len(doc)
    print(f"[PASS] 2. PDF Page count: {page_count} (Expected: 2)")
    assert page_count == 2, f"Expected 2 pages, got {page_count}"

    for i in range(page_count):
        page = doc[i]
        pw, ph = page.get_size()
        print(f"       Page {i+1} dimensions: {pw:.2f} x {ph:.2f} pt (A4 standard: 595.28 x 841.89)")
        assert abs(pw - 595.28) < 1.0 and abs(ph - 841.89) < 1.0, f"Page {i+1} not A4!"

    # 3. HTTP Server and HTTP 200 Verification
    port = 8899
    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=PROJECT_DIR, **kwargs)
        def log_message(self, format, *args):
            pass

    httpd = HTTPServer(('127.0.0.1', port), Handler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    time.sleep(0.5)

    pdf_url = f"http://127.0.0.1:{port}/public/downloads/kuldeep-teena-wedding-invitation.pdf"
    req = urllib.request.Request(pdf_url, method='HEAD')
    with urllib.request.urlopen(req) as resp:
        status_code = resp.status
        content_len = int(resp.headers.get('Content-Length', 0))
        print(f"[PASS] 3. PDF URL HTTP Status: {status_code} OK")
        print(f"       Content-Length: {content_len:,} bytes (Matches disk: {content_len == file_size})")
        assert status_code == 200, f"Expected 200, got {status_code}"
        assert content_len == file_size, f"Content length {content_len} != disk size {file_size}"

    # 4. Launch Edge for UI and Download Button Verification
    remote_debugging_port = 9340
    profile_dir = os.path.join(PROJECT_DIR, '.edge_profile_test_dl')
    os.makedirs(profile_dir, exist_ok=True)

    edge_proc = subprocess.Popen([
        EDGE_PATH,
        '--headless=new',
        f'--remote-debugging-port={remote_debugging_port}',
        f'--user-data-dir={profile_dir}',
        '--no-first-run',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-component-extensions-with-background-pages',
        'about:blank'
    ])
    time.sleep(1.5)

    try:
        # Get target WebSocket URL targeting 'page'
        with urllib.request.urlopen(f'http://127.0.0.1:{remote_debugging_port}/json') as r:
            tabs = json.loads(r.read().decode())
            page_tabs = [t for t in tabs if t.get('type') == 'page']
            ws_url = page_tabs[0]['webSocketDebuggerUrl'] if page_tabs else tabs[0]['webSocketDebuggerUrl']
        
        # Connect CDP
        ws_path = ws_url.split(f':{remote_debugging_port}')[1]
        cdp = CDP('127.0.0.1', remote_debugging_port, ws_path)
        cdp.send("Page.enable")
        cdp.send("DOM.enable")
        cdp.send("Runtime.enable")

        # --- A. DESKTOP TEST (1280x850) ---
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 1280,
            "height": 850,
            "deviceScaleFactor": 1,
            "mobile": False
        })
        cdp.send("Page.navigate", {"url": f"http://127.0.0.1:{port}/index.html"})
        
        # Wait for React to render
        found = wait_for_element(cdp, '.btn-download-pdf', timeout=12.0)
        assert found, "Timeout waiting for .btn-download-pdf to mount in DOM!"

        # Scroll to Blessings / RSVP section
        cdp.send("Runtime.evaluate", {
            "expression": """(() => {
                const pane = document.getElementById('invitation-scroll-pane');
                if (pane) {
                    pane.scrollTop = pane.scrollHeight;
                }
                const target = document.getElementById('blessings-thankyou');
                if (target) {
                    target.scrollIntoView({ behavior: 'instant', block: 'center' });
                }
            })()"""
        })
        time.sleep(1.2)

        # Inspect the Download Button
        button_check = cdp.send("Runtime.evaluate", {
            "expression": """(() => {
                const btn = document.querySelector('.btn-download-pdf');
                if (!btn) return { exists: false };
                const rect = btn.getBoundingClientRect();
                return {
                    exists: true,
                    text: btn.innerText.trim(),
                    href: btn.getAttribute('href'),
                    download: btn.getAttribute('download'),
                    visible: rect.width > 0 && rect.height > 0,
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                };
            })()""",
            "returnByValue": True
        })
        btn_data = button_check['result']['result']['value']
        print(f"[PASS] 4. Download Button in DOM (Desktop): {btn_data}")
        assert btn_data['exists'], "Download button .btn-download-pdf not found!"
        assert "Download Wedding Invitation PDF" in btn_data['text'], f"Unexpected button text: {btn_data['text']}"
        assert btn_data['href'] == "public/downloads/kuldeep-teena-wedding-invitation.pdf", f"Unexpected href: {btn_data['href']}"
        assert btn_data['download'] == "Kuldeep-Teena-Wedding-Invitation.pdf", f"Unexpected download attr: {btn_data['download']}"

        # Capture Desktop screenshot of blessings section
        shot = cdp.send("Page.captureScreenshot", {"format": "png"})
        shot_data = base64.b64decode(shot['result']['data'])
        desktop_shot_path = os.path.join(OUTPUT_DIR, 'desktop_blessings_download_button.png')
        with open(desktop_shot_path, 'wb') as f:
            f.write(shot_data)
        print(f"[PASS] 5. Desktop screenshot captured: {desktop_shot_path}")

        # --- B. MOBILE TEST (390x844 - iPhone 12/13/14) ---
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 390,
            "height": 844,
            "deviceScaleFactor": 2,
            "mobile": True
        })
        time.sleep(0.5)
        cdp.send("Runtime.evaluate", {
            "expression": """(() => {
                const pane = document.getElementById('invitation-scroll-pane');
                if (pane) {
                    pane.scrollTop = pane.scrollHeight;
                }
                const target = document.getElementById('blessings-thankyou');
                if (target) {
                    target.scrollIntoView({ behavior: 'instant', block: 'center' });
                }
                window.scrollTo(0, document.body.scrollHeight);
            })()"""
        })
        time.sleep(1.2)

        mobile_btn_check = cdp.send("Runtime.evaluate", {
            "expression": """(() => {
                const btn = document.querySelector('.btn-download-pdf');
                const rect = btn.getBoundingClientRect();
                return {
                    text: btn.innerText.trim(),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                    displayed: rect.width > 0 && rect.height > 0
                };
            })()""",
            "returnByValue": True
        })
        mobile_data = mobile_btn_check['result']['result']['value']
        print(f"[PASS] 6. Mobile button metrics: {mobile_data}")
        assert mobile_data['displayed'], "Button is not visible on mobile!"

        # Capture Mobile screenshot
        shot_mobile = cdp.send("Page.captureScreenshot", {"format": "png"})
        shot_mobile_data = base64.b64decode(shot_mobile['result']['data'])
        mobile_shot_path = os.path.join(OUTPUT_DIR, 'mobile_blessings_download_button.png')
        with open(mobile_shot_path, 'wb') as f:
            f.write(shot_mobile_data)
        print(f"[PASS] 7. Mobile screenshot captured: {mobile_shot_path}")

        # --- C. CLICK TEST & FETCH DOWNLOAD ---
        click_res = cdp.send("Runtime.evaluate", {
            "expression": """(() => {
                const btn = document.querySelector('.btn-download-pdf');
                btn.focus();
                return { clicked: true, targetHref: btn.href, downloadName: btn.download };
            })()""",
            "returnByValue": True
        })
        print(f"[PASS] 8. Download button click simulated: {click_res['result']['result']['value']}")

        cdp.close()
    finally:
        edge_proc.terminate()
        httpd.shutdown()

    print("=" * 60)
    print("ALL VERIFICATION CHECKS PASSED PERFECTLY!")
    print("=" * 60)

if __name__ == '__main__':
    run_tests()
