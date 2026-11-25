import os
import sys
import json
import base64
import time
import socket
import subprocess
import urllib.request
import shutil
import pypdf
from pypdf.generic import DictionaryObject, NameObject, ArrayObject, FloatObject, TextStringObject
import pypdfium2 as pdfium

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
EDGE_PATHS = [
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    r'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
]
EDGE_PATH = next((p for p in EDGE_PATHS if os.path.exists(p)), None)
if not EDGE_PATH:
    raise FileNotFoundError("Microsoft Edge executable not found.")

HTML_FILE = os.path.join(PROJECT_DIR, 'print_new_luxury_cover.html').replace('\\', '/')
FILE_URL = f"file:///{HTML_FILE}"

OUT_PDF = os.path.join(PROJECT_DIR, 'Teena_Kuldeep_New_Royal_Digital_Invitation.pdf')
PRODUCTION_URL = "https://pushu1.github.io/teena-kuldeep-wedding/"

# Find an available port dynamically
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 0))
PORT = s.getsockname()[1]
s.close()

profile_dir = os.path.join(PROJECT_DIR, f'.browser_pdf_{PORT}')
os.makedirs(profile_dir, exist_ok=True)

class CDP:
    def __init__(self, host, port, path):
        self.sock = socket.create_connection((host, port), timeout=25)
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

print(f"Launching Edge headless on port {PORT} with target {FILE_URL}...")
proc = subprocess.Popen([
    EDGE_PATH,
    f'--remote-debugging-port={PORT}',
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    f'--user-data-dir={profile_dir}',
    FILE_URL
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

try:
    time.sleep(2.5)
    targets_url = f"http://127.0.0.1:{PORT}/json"
    with urllib.request.urlopen(targets_url) as resp:
        targets = json.loads(resp.read().decode())

    print(f"Discovered targets: {[t.get('type') for t in targets]}")
    # Must pick the 'page' target
    page_target = next(t for t in targets if t.get('type') == 'page')
    ws_url = page_target['webSocketDebuggerUrl']
    host_port, path = ws_url.replace("ws://", "").split('/', 1)
    host, port_str = host_port.split(':')
    cdp = CDP(host, int(port_str), '/' + path)

    cdp.send("Page.enable")
    time.sleep(1.0)

    fonts_ready = cdp.send("Runtime.evaluate", {
        "expression": "document.fonts.ready.then(() => true)",
        "awaitPromise": True
    })
    print("Fonts ready status:", fonts_ready)

    rect_res = cdp.send("Runtime.evaluate", {
        "expression": """(() => {
            const btn = document.getElementById("btn-open-wedding-website");
            const r = btn.getBoundingClientRect();
            return {
                left: r.left,
                top: r.top,
                right: r.right,
                bottom: r.bottom,
                width: r.width,
                height: r.height,
                windowW: window.innerWidth,
                windowH: window.innerHeight
            };
        })()""",
        "returnByValue": True
    })
    btn_info = rect_res.get('result', {}).get('value', {})
    print(f"DOM Button Rect info: {btn_info}")

    cdp.send("Emulation.setEmulatedMedia", {"media": "print"})
    time.sleep(0.5)

    print("Executing Page.printToPDF...")
    pdf_res = cdp.send("Page.printToPDF", {
        "paperWidth": 5.827,
        "paperHeight": 8.268,
        "marginTop": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "marginRight": 0,
        "printBackground": True,
        "preferCSSPageSize": True,
        "generateTaggedPDF": True
    })

    pdf_b64 = pdf_res.get('result', {}).get('data', '')
    if not pdf_b64:
        raise RuntimeError(f"CDP printToPDF returned no data: {pdf_res}")

    raw_pdf_bytes = base64.b64decode(pdf_b64)
    tmp_pdf_path = os.path.join(PROJECT_DIR, 'raw_new_luxury_cover.pdf')
    with open(tmp_pdf_path, 'wb') as f:
        f.write(raw_pdf_bytes)
    print(f"Raw PDF successfully generated! Bytes: {len(raw_pdf_bytes)}")

    # ----------------------------------------------------
    # Read with PyPDF and ensure link annotation is 100% active
    # ----------------------------------------------------
    reader = pypdf.PdfReader(tmp_pdf_path)
    total_pages = len(reader.pages)
    print(f"Generated raw PDF page count: {total_pages}")
    assert total_pages == 1, f"Expected strictly 1 page, found {total_pages}!"

    page = reader.pages[0]
    page_w = float(page.mediabox.width)
    page_h = float(page.mediabox.height)
    print(f"Page dimensions in points: {page_w} x {page_h} pt")

    if btn_info and btn_info.get('windowW') and btn_info.get('windowH'):
        win_w = float(btn_info['windowW'])
        win_h = float(btn_info['windowH'])
        btn_x1 = (float(btn_info['left']) / win_w) * page_w
        btn_x2 = (float(btn_info['right']) / win_w) * page_w
        btn_y1 = ((win_h - float(btn_info['bottom'])) / win_h) * page_h
        btn_y2 = ((win_h - float(btn_info['top'])) / win_h) * page_h
    else:
        btn_x1 = 55.0
        btn_x2 = 365.0
        btn_y1 = 40.0
        btn_y2 = 120.0

    print(f"Calculated PDF Button Rect: [{btn_x1:.2f}, {btn_y1:.2f}, {btn_x2:.2f}, {btn_y2:.2f}] pt")

    link_dict = DictionaryObject({
        NameObject('/Type'): NameObject('/Annot'),
        NameObject('/Subtype'): NameObject('/Link'),
        NameObject('/Rect'): ArrayObject([
            FloatObject(round(btn_x1, 2)),
            FloatObject(round(btn_y1, 2)),
            FloatObject(round(btn_x2, 2)),
            FloatObject(round(btn_y2, 2))
        ]),
        NameObject('/Border'): ArrayObject([FloatObject(0), FloatObject(0), FloatObject(0)]),
        NameObject('/C'): ArrayObject([FloatObject(0.83), FloatObject(0.69), FloatObject(0.4)]),
        NameObject('/H'): NameObject('/I'),
        NameObject('/A'): DictionaryObject({
            NameObject('/S'): NameObject('/URI'),
            NameObject('/URI'): TextStringObject(PRODUCTION_URL)
        })
    })

    writer = pypdf.PdfWriter()
    writer.add_page(page)

    if '/Annots' not in page or page['/Annots'] is None:
        page[NameObject('/Annots')] = ArrayObject([link_dict])
    else:
        page['/Annots'].append(link_dict)

    with open(OUT_PDF, 'wb') as f:
        writer.write(f)

    print(f"\nSUCCESS! Master new luxury 1-page PDF written to:\n  {OUT_PDF}")
    if os.path.exists(tmp_pdf_path):
        os.remove(tmp_pdf_path)

    # ----------------------------------------------------
    # Verify link with PyPDF
    # ----------------------------------------------------
    verify_reader = pypdf.PdfReader(OUT_PDF)
    assert len(verify_reader.pages) == 1, "Verification failed: not 1 page"
    v_page = verify_reader.pages[0]
    annots = v_page.get('/Annots')
    print(f"Verified Annots list length: {len(annots)}")
    found_url = False
    for a in annots:
        obj = a.get_object()
        action = obj.get('/A')
        if action and action.get('/URI') == PRODUCTION_URL:
            found_url = True
            print(f"FOUND VERIFIED CLICKABLE LINK: {action.get('/URI')} with Rect {obj.get('/Rect')}")

    assert found_url, f"Failed to verify URL {PRODUCTION_URL} in PDF annotations!"

    # ----------------------------------------------------
    # Copy to all target & backward-compatibility locations
    # ----------------------------------------------------
    targets = [
        os.path.join(PROJECT_DIR, 'assets', 'Teena_Kuldeep_New_Royal_Digital_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'downloads', 'Teena_Kuldeep_New_Royal_Digital_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'public', 'downloads', 'Teena_Kuldeep_New_Royal_Digital_Invitation.pdf'),

        os.path.join(PROJECT_DIR, 'Teena_Kuldeep_Digital_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'assets', 'Teena_Kuldeep_Digital_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'downloads', 'Teena_Kuldeep_Digital_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'public', 'downloads', 'Teena_Kuldeep_Digital_Wedding_Invitation.pdf'),

        os.path.join(PROJECT_DIR, 'Teena_Kuldeep_Royal_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'assets', 'Teena_Kuldeep_Royal_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'downloads', 'Teena_Kuldeep_Royal_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'public', 'downloads', 'Teena_Kuldeep_Royal_Wedding_Invitation.pdf'),

        os.path.join(PROJECT_DIR, 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'assets', 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'assets', 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(PROJECT_DIR, 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(PROJECT_DIR, 'downloads', 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(PROJECT_DIR, 'public', 'downloads', 'kuldeep-teena-wedding-invitation.pdf'),
    ]

    for t in targets:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        shutil.copyfile(OUT_PDF, t)
        print(f"Copied to: {t}")

    # ----------------------------------------------------
    # Render preview image using pypdfium2 at 2x scale
    # ----------------------------------------------------
    doc = pdfium.PdfDocument(OUT_PDF)
    bitmap = doc[0].render(scale=2.0)
    pil_img = bitmap.to_pil()
    preview_path = os.path.join(PROJECT_DIR, 'verification_screens', 'new_royal_pdf_cover_verified.png')
    os.makedirs(os.path.dirname(preview_path), exist_ok=True)
    pil_img.save(preview_path)
    print(f"Saved high-res PNG preview: {preview_path}")

    # Update asset used by card viewer modal
    card_img_target = os.path.join(PROJECT_DIR, 'assets', 'pdf_card_cover.png')
    pil_img.save(card_img_target)
    shutil.copyfile(card_img_target, os.path.join(PROJECT_DIR, 'assets', 'pdf_card_page_1.png'))
    print("Updated card viewer preview assets successfully!")

    print("\nALL PDF OPERATIONS COMPLETED PERFECTLY!")

except Exception as e:
    print(f"Error in PDF generation: {e}")
    raise
finally:
    try:
        proc.terminate()
        time.sleep(0.5)
        shutil.rmtree(profile_dir, ignore_errors=True)
    except Exception:
        pass
