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
edge_bin = next(p for p in EDGE_PATHS if os.path.exists(p))

HTML_FILE = os.path.join(PROJECT_DIR, 'print_single_page_cover.html')
FILE_URL = f"file:///{HTML_FILE.replace(os.sep, '/')}"

OUT_PDF = os.path.join(PROJECT_DIR, 'Teena_Kuldeep_Digital_Wedding_Invitation.pdf')
PRODUCTION_URL = "https://pushu1.github.io/param-pummy-wedding/"

PORT = 9228
browser_profile_dir = os.path.join(PROJECT_DIR, '.browser_pdf_gen')
os.makedirs(browser_profile_dir, exist_ok=True)

proc = subprocess.Popen([
    edge_bin,
    '--headless=new',
    f'--remote-debugging-port={PORT}',
    f'--user-data-dir={browser_profile_dir}',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    'about:blank'
])

try:
    time.sleep(2)
    tabs = json.loads(urllib.request.urlopen(f'http://127.0.0.1:{PORT}/json').read())
    ws_url = tabs[0]['webSocketDebuggerUrl']
    parts = ws_url.replace('ws://', '').split('/')
    host_port = parts[0].split(':')
    host, port = host_port[0], int(host_port[1])
    path = '/' + '/'.join(parts[1:])

    sock = socket.create_connection((host, port), timeout=20)
    key = base64.b64encode(os.urandom(16)).decode('utf-8')
    req = (f'GET {path} HTTP/1.1\r\nHost: {host}:{port}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n')
    sock.sendall(req.encode('utf-8'))
    resp = sock.recv(4096)
    assert b"101 " in resp, f"WebSocket upgrade failed: {resp}"

    msg_id = [1]
    def send(method, params=None):
        mid = msg_id[0]
        msg_id[0] += 1
        p = json.dumps({'id': mid, 'method': method, 'params': params or {}})
        b = p.encode('utf-8')
        f = bytearray([0x81])
        l = len(b)
        m = os.urandom(4)
        if l <= 125: f.append(0x80 | l)
        elif l <= 65535: f.append(0x80 | 126); f.extend(l.to_bytes(2, 'big'))
        else: f.append(0x80 | 127); f.extend(l.to_bytes(8, 'big'))
        f.extend(m)
        f.extend(bytearray(x ^ m[i % 4] for i, x in enumerate(b)))
        sock.sendall(f)
        while True:
            h = sock.recv(2)
            pl = h[1] & 0x7F
            if pl == 126: pl = int.from_bytes(sock.recv(2), 'big')
            elif pl == 127: pl = int.from_bytes(sock.recv(8), 'big')
            data = bytearray()
            while len(data) < pl: data.extend(sock.recv(pl - len(data)))
            j = json.loads(data.decode('utf-8', errors='ignore'))
            if j.get('id') == mid: return j

    print(f"Navigating to single-page cover HTML: {FILE_URL}")
    send('Page.enable')
    send('Page.navigate', {'url': FILE_URL})
    time.sleep(3)

    # Wait for document fonts
    fonts_ready = send('Runtime.evaluate', {'expression': 'document.fonts.ready.then(() => true)', 'awaitPromise': True})
    print("Fonts ready:", fonts_ready)

    # Emulate print media
    send('Emulation.setEmulatedMedia', {'media': 'print'})
    time.sleep(1)

    print("Generating single page vector PDF via Page.printToPDF...")
    # Exact A5 Portrait: 148mm = 5.827 inches, 210mm = 8.268 inches
    pdf_res = send('Page.printToPDF', {
        'paperWidth': 5.827,
        'paperHeight': 8.268,
        'marginTop': 0,
        'marginBottom': 0,
        'marginLeft': 0,
        'marginRight': 0,
        'printBackground': True,
        'preferCSSPageSize': True,
        'generateTaggedPDF': True
    })

    if 'result' not in pdf_res or 'data' not in pdf_res['result']:
        raise RuntimeError(f"PDF generation failed: {pdf_res}")

    raw_pdf_bytes = base64.b64decode(pdf_res['result']['data'])
    tmp_pdf = os.path.join(PROJECT_DIR, 'tmp_single_cover.pdf')
    with open(tmp_pdf, 'wb') as f:
        f.write(raw_pdf_bytes)

    # Inspect page count
    reader = pypdf.PdfReader(tmp_pdf)
    page_count = len(reader.pages)
    print(f"Total raw PDF pages: {page_count}")
    assert page_count == 1, f"Expected exactly 1 page, but got {page_count}!"

    page = reader.pages[0]
    page_w = float(page.mediabox.width)
    page_h = float(page.mediabox.height)
    print(f"Page dimensions: {page_w:.1f} x {page_h:.1f} pt")

    # In A5 (419.5 x 595.3 pt), our CLICK HERE button is positioned in the lower third
    # Bounding box covering the entire golden button area:
    btn_w = 300.0
    btn_x1 = (page_w - btn_w) / 2
    btn_x2 = (page_w + btn_w) / 2
    btn_y1 = page_h * 0.18
    btn_y2 = page_h * 0.35

    link_annot = DictionaryObject({
        NameObject('/Type'): NameObject('/Annot'),
        NameObject('/Subtype'): NameObject('/Link'),
        NameObject('/Rect'): ArrayObject([
            FloatObject(btn_x1),
            FloatObject(btn_y1),
            FloatObject(btn_x2),
            FloatObject(btn_y2)
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
        page[NameObject('/Annots')] = ArrayObject([link_annot])
    else:
        page['/Annots'].append(link_annot)

    with open(OUT_PDF, 'wb') as f:
        writer.write(f)

    print(f"Successfully generated Master 1-Page PDF at:\n  {OUT_PDF}")
    if os.path.exists(tmp_pdf):
        os.remove(tmp_pdf)

    # ----------------------------------------------------
    # Verify link with PyPDF
    # ----------------------------------------------------
    verify_reader = pypdf.PdfReader(OUT_PDF)
    assert len(verify_reader.pages) == 1, "Verification error: not 1 page"
    annots = verify_reader.pages[0].get('/Annots')
    verified_url = False
    for a in annots:
        obj = a.get_object()
        action = obj.get('/A')
        if action and action.get('/URI') == PRODUCTION_URL:
            verified_url = True
            print(f"VERIFIED EMBEDDED HYPERLINK: {action.get('/URI')}")
    assert verified_url, "Failed to verify embedded hyperlink in output PDF!"

    # Copy to all expected locations
    targets = [
        os.path.join(PROJECT_DIR, 'assets', 'Teena_Kuldeep_Digital_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'downloads', 'Teena_Kuldeep_Digital_Wedding_Invitation.pdf'),
        os.path.join(PROJECT_DIR, 'public', 'downloads', 'Teena_Kuldeep_Digital_Wedding_Invitation.pdf'),
        # Backwards compatibility copies
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

    # Render single page to PNG using pypdfium2 for instant inspection
    doc = pdfium.PdfDocument(OUT_PDF)
    print(f"Total PDF pages in final output: {len(doc)}")
    verify_dir = os.path.join(PROJECT_DIR, 'verification_screens')
    os.makedirs(verify_dir, exist_ok=True)

    bitmap = doc[0].render(scale=2.0)
    pil_image = bitmap.to_pil()
    out_img = os.path.join(verify_dir, 'single_page_pdf_cover_rendered.png')
    pil_image.save(out_img)
    print(f"Saved single page preview: {out_img}")

    # Also update card viewer assets
    pil_image.save(os.path.join(PROJECT_DIR, 'assets', 'pdf_card_cover.png'))
    pil_image.save(os.path.join(PROJECT_DIR, 'assets', 'pdf_card_page_1.png'))
    print("Updated card viewer image assets successfully!")

except Exception as e:
    print(f"Error during PDF generation: {e}")
    raise
finally:
    try:
        proc.terminate()
    except Exception:
        pass
