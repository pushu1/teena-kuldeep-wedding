import os
import sys
import json
import base64
import time
import socket
import subprocess
import urllib.request
import shutil
import pypdfium2 as pdfium

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
HTML_PATH = os.path.join(PROJECT_DIR, 'print_royal_invitation.html').replace('\\', '/')
OUT_PDF = os.path.join(PROJECT_DIR, 'assets', 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf')

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

def generate():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    cdp_port = s.getsockname()[1]
    s.close()

    edge_cmd = [
        EDGE_PATH,
        f"--remote-debugging-port={cdp_port}",
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        f"file:///{HTML_PATH}"
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

        # Wait until fonts and images are ready
        for _ in range(10):
            res = cdp.send("Runtime.evaluate", {
                "expression": "document.fonts.status === 'loaded' && document.images.length >= 3 && Array.from(document.images).every(i => i.complete)"
            })
            if res.get('result', {}).get('result', {}).get('value') is True:
                break
            time.sleep(0.5)

        time.sleep(1.0)

        # Print to PDF using exact A4 paper dimensions with zero margins (margins handled in CSS)
        pdf_res = cdp.send("Page.printToPDF", {
            "landscape": False,
            "displayHeaderFooter": False,
            "printBackground": True,
            "preferCSSPageSize": True,
            "paperWidth": 8.27,
            "paperHeight": 11.69,
            "marginTop": 0,
            "marginBottom": 0,
            "marginLeft": 0,
            "marginRight": 0,
            "generateTaggedPDF": True,
            "generateDocumentOutline": True
        })

        pdf_b64 = pdf_res.get('result', {}).get('data', '')
        assert pdf_b64, f"Print to PDF failed: {pdf_res}"

        pdf_data = base64.b64decode(pdf_b64)
        
        targets = [
            OUT_PDF,
            os.path.join(PROJECT_DIR, 'assets', 'kuldeep-teena-wedding-invitation.pdf'),
            os.path.join(PROJECT_DIR, 'downloads', 'kuldeep-teena-wedding-invitation.pdf'),
            os.path.join(PROJECT_DIR, 'public', 'downloads', 'kuldeep-teena-wedding-invitation.pdf'),
            os.path.join(PROJECT_DIR, 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf'),
            os.path.join(PROJECT_DIR, 'kuldeep-teena-wedding-invitation.pdf'),
        ]

        for t in targets:
            with open(t, 'wb') as f:
                f.write(pdf_data)
            print(f"Saved PDF to: {t} ({len(pdf_data)} bytes)")

        # Render PDF pages to PNG for visual inspection
        pdf_doc = pdfium.PdfDocument(OUT_PDF)
        print(f"Total pages in PDF: {len(pdf_doc)}")
        for i in range(len(pdf_doc)):
            page = pdf_doc[i]
            img = page.render(scale=2.0).to_pil()
            out_img = os.path.join(PROJECT_DIR, 'verification_screens', f'edge_pdf_page_{i+1}.png')
            img.save(out_img)
            print(f"Rendered Page {i+1} screenshot: {out_img}")

    finally:
        edge_proc.terminate()

if __name__ == '__main__':
    generate()
