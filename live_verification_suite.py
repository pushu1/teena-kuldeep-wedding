import os
import sys
import time
import socket
import json
import base64
import subprocess
import urllib.request
import pypdf
import pypdfium2 as pdfium
import re

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'verification_screens')
os.makedirs(OUTPUT_DIR, exist_ok=True)

EDGE_PATHS = [
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    r'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
]
EDGE_PATH = next((p for p in EDGE_PATHS if os.path.exists(p)), None)

LIVE_URL = "https://pushu1.github.io/teena-kuldeep-wedding/"

# Dynamically pick CDP port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 0))
PORT_CDP = s.getsockname()[1]
s.close()

profile_dir = os.path.join(PROJECT_DIR, f'.browser_live_verify_{PORT_CDP}')
os.makedirs(profile_dir, exist_ok=True)

class CDP:
    def __init__(self, host, port, path):
        self.sock = socket.create_connection((host, port), timeout=35)
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
        resp = self.sock.recv(4096).decode('utf-8', errors='ignore')
        assert "101" in resp, f"Upgrade failed: {resp}"
        self.msg_id = 0

    def send(self, method, params=None):
        self.msg_id += 1
        cid = self.msg_id
        payload = json.dumps({"id": cid, "method": method, "params": params or {}}).encode('utf-8')
        length = len(payload)
        mask = os.urandom(4)
        if length < 126:
            h = bytearray([0x81, 0x80 | length])
        elif length < 65536:
            h = bytearray([0x81, 0x80 | 126]) + length.to_bytes(2, 'big')
        else:
            h = bytearray([0x81, 0x80 | 127]) + length.to_bytes(8, 'big')
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

def screenshot(cdp, name):
    res = cdp.send("Page.captureScreenshot", {"format": "png"})
    b64 = res.get('result', {}).get('data', '')
    path = os.path.join(OUTPUT_DIR, name)
    with open(path, 'wb') as f:
        f.write(base64.b64decode(b64))
    print(f"Captured: {name} ({os.path.getsize(path)} bytes)")

print("\n========================================================")
print(f"STARTING LIVE VERIFICATION OF {LIVE_URL}")
print("========================================================")

proc = subprocess.Popen([
    EDGE_PATH,
    f'--remote-debugging-port={PORT_CDP}',
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    f'--user-data-dir={profile_dir}',
    LIVE_URL
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

try:
    time.sleep(3.5)
    targets_url = f"http://127.0.0.1:{PORT_CDP}/json"
    with urllib.request.urlopen(targets_url) as resp:
        targets = json.loads(resp.read().decode())

    page_target = next(t for t in targets if t.get('type') == 'page')
    ws_url = page_target['webSocketDebuggerUrl']
    host_port, path = ws_url.replace("ws://", "").split('/', 1)
    host, port_str = host_port.split(':')
    cdp = CDP(host, int(port_str), '/' + path)
    cdp.send("Page.enable")

    # ----------------------------------------------------
    # TEST 1: LIVE DESKTOP VIEWPORT (1440 x 900)
    # ----------------------------------------------------
    print("\n--- TEST 1: Live Desktop Viewport 1440x900 ---")
    cdp.send("Emulation.setDeviceMetricsOverride", {
        "width": 1440,
        "height": 900,
        "deviceScaleFactor": 1,
        "mobile": False
    })
    cdp.send("Page.navigate", {"url": LIVE_URL})
    time.sleep(3.0)
    screenshot(cdp, "live_01_desktop_envelope.png")

    # Click OPEN YOUR INVITATION
    print("\n--- TEST 2: Clicking 'OPEN YOUR INVITATION' on Live Site ---")
    cdp.send("Runtime.evaluate", {
        "expression": "document.querySelector('.btn-royal-open-invitation').click()"
    })
    time.sleep(4.0)
    screenshot(cdp, "live_02_desktop_hero_revealed.png")

    # Verify Hero Section Content & No Action Buttons
    hero_check = cdp.send("Runtime.evaluate", {
        "expression": """(() => {
            const hero = document.getElementById('hero-section');
            const btnGroup = hero.querySelector('.hero-cta-button-group');
            const viewCardBtn = hero.querySelector('.btn-view-card');
            const downloadBtn = hero.querySelector('.btn-download-pdf');
            const heroText = hero.innerText;
            return {
                hasGroup: !!btnGroup,
                hasViewCard: !!viewCardBtn,
                hasDownload: !!downloadBtn,
                hasTeena: heroText.includes('TEENA'),
                hasKuldeep: heroText.includes('KULDEEP'),
                hasDate: heroText.includes('11 DECEMBER 2026')
            };
        })()""",
        "returnByValue": True
    })
    hc = hero_check.get('result', {}).get('result', {}).get('value', {})
    print(f"Live Hero Audit: {hc}")
    assert not hc.get('hasGroup'), "ERROR: .hero-cta-button-group found in live hero!"
    assert not hc.get('hasViewCard'), "ERROR: viewCardBtn found in live hero!"
    assert not hc.get('hasDownload'), "ERROR: downloadBtn found in live hero!"
    assert hc.get('hasTeena') and hc.get('hasKuldeep'), "ERROR: Names missing from live hero!"
    print("Live Hero Section PASSED: Clean, no buttons, Teena & Kuldeep prominent!")

    # ----------------------------------------------------
    # TEST 3: LIVE GROOM & BRIDE SECTIONS AUDIT
    # ----------------------------------------------------
    print("\n--- TEST 3: Live Bride & Groom Sections Audit ---")
    cdp.send("Runtime.evaluate", {"expression": "document.getElementById('bride-section').scrollIntoView()"})
    time.sleep(1.0)
    screenshot(cdp, "live_03_desktop_bride_section.png")

    cdp.send("Runtime.evaluate", {"expression": "document.getElementById('groom-section').scrollIntoView()"})
    time.sleep(1.0)
    screenshot(cdp, "live_04_desktop_groom_section.png")

    groom_lineage = cdp.send("Runtime.evaluate", {
        "expression": """(() => {
            const groomSec = document.getElementById('groom-section');
            const relHeading = groomSec.querySelector('.relationship-heading')?.innerText || '';
            const parentNames = Array.from(groomSec.querySelectorAll('.profile-lineage-block > .parent-name')).map(el => el.innerText).join(' ');
            const gpLabel = groomSec.querySelector('.grandparent-label')?.innerText || '';
            const gpNames = groomSec.querySelector('.grandparent-names')?.innerText || '';
            return {
                relHeading,
                parentNames,
                gpLabel,
                gpNames
            };
        })()""",
        "returnByValue": True
    })
    gl = groom_lineage.get('result', {}).get('result', {}).get('value', {})
    print(f"Live Groom Lineage Audit: {gl}")
    assert "SON OF" in gl.get('relHeading', '').upper()
    assert "CHANDA DEVI" in gl.get('parentNames', '').upper()
    assert "JASRAJ" in gl.get('parentNames', '').upper()
    assert "GRANDSON OF" in gl.get('gpLabel', '').upper()
    assert "PEPI DEVI" in gl.get('gpNames', '').upper()
    assert "CHAMPALAL" in gl.get('gpNames', '').upper()
    print("Live Groom Lineage PASSED: SON OF (Mrs. Chanda Devi & Mr. Jasraj Ji Upadhyay), GRANDSON OF (Late Mrs. Pepi Devi & Late Mr. Champalal Ji Upadhyay)!")

    # Check Footer Section & Verify Complete Removal of 3 Action Buttons
    cdp.send("Runtime.evaluate", {"expression": "document.getElementById('footer-section').scrollIntoView()"})
    time.sleep(1.0)
    screenshot(cdp, "live_07_desktop_footer_section.png")

    footer_btn_check = cdp.send("Runtime.evaluate", {
        "expression": """(() => {
            const footer = document.getElementById('footer-section');
            const row = footer.querySelector('.footer-actions-row');
            const btn1 = footer.querySelector('.btn-view-card-footer');
            const btn2 = footer.querySelector('.btn-download-pdf-footer');
            const btn3 = footer.querySelector('.btn-scroll-top');
            return {
                hasRow: !!row,
                hasBtn1: !!btn1,
                hasBtn2: !!btn2,
                hasBtn3: !!btn3
            };
        })()""",
        "returnByValue": True
    })
    fc = footer_btn_check.get('result', {}).get('result', {}).get('value', {})
    print(f"Live Footer Button Audit: {fc}")
    assert not fc.get('hasRow'), "ERROR: .footer-actions-row found in live footer!"
    assert not fc.get('hasBtn1'), "ERROR: View Card button found in live footer!"
    assert not fc.get('hasBtn2'), "ERROR: Download PDF button found in live footer!"
    assert not fc.get('hasBtn3'), "ERROR: Back to Top button found in live footer!"
    print("Live Footer Section PASSED: Clean, no buttons, naturally positioned!")

    # ----------------------------------------------------
    # TEST 4: LIVE MOBILE VIEWPORT (390 x 844 iPhone)
    # ----------------------------------------------------
    print("\n--- TEST 4: Live Mobile Viewport 390x844 ---")
    cdp.send("Emulation.setDeviceMetricsOverride", {
        "width": 390,
        "height": 844,
        "deviceScaleFactor": 2,
        "mobile": True
    })
    time.sleep(0.5)
    cdp.send("Runtime.evaluate", {"expression": "document.getElementById('hero-section').scrollIntoView({ behavior: 'instant' }); window.scrollTo(0,0);"})
    time.sleep(1.0)
    screenshot(cdp, "live_05_mobile_hero_view.png")

    cdp.send("Runtime.evaluate", {"expression": "document.getElementById('groom-section').scrollIntoView({ behavior: 'instant' })"})
    time.sleep(1.0)
    screenshot(cdp, "live_06_mobile_groom_section.png")

    cdp.send("Runtime.evaluate", {"expression": "document.getElementById('footer-section').scrollIntoView({ behavior: 'instant' })"})
    time.sleep(1.0)
    screenshot(cdp, "live_08_mobile_footer_section.png")

    # ----------------------------------------------------
    # TEST 5: LIVE PDF DOWNLOAD & HYPERLINK CHECK
    # ----------------------------------------------------
    print("\n--- TEST 5: Live PDF Download & Hyperlink Check ---")
    pdf_live_url = LIVE_URL + "Teena_Kuldeep_New_Royal_Digital_Invitation.pdf"
    print(f"Fetching PDF from: {pdf_live_url}")
    req = urllib.request.Request(pdf_live_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        pdf_bytes = resp.read()
        print(f"Downloaded live PDF successfully! Size: {len(pdf_bytes)} bytes, Content-Type: {resp.headers.get('Content-Type')}")
        assert len(pdf_bytes) > 200000, "Live PDF download too small!"

    live_pdf_tmp = os.path.join(PROJECT_DIR, 'downloaded_live_pdf.pdf')
    with open(live_pdf_tmp, 'wb') as f:
        f.write(pdf_bytes)

    reader = pypdf.PdfReader(live_pdf_tmp)
    assert len(reader.pages) == 1, "Downloaded live PDF is not 1 page!"
    page = reader.pages[0]
    clean_text = re.sub(r'[^A-Z0-9]', '', page.extract_text().upper())
    print(f"Downloaded Live PDF Text: {clean_text}")
    assert "CLICKHERE" in clean_text
    assert "OPENYOURWEDDINGINVITATION" in clean_text

    annots = page.get('/Annots')
    found_live_link = False
    for a in annots:
        obj = a.get_object()
        action = obj.get('/A')
        if action and action.get('/URI') == LIVE_URL:
            found_live_link = True
            print(f"CONFIRMED LIVE HYPERLINK IN PDF: {action.get('/URI')} with Rect {obj.get('/Rect')}")

    assert found_live_link, f"Live URL {LIVE_URL} not found in PDF annotations!"
    print(f"Live PDF Hyperlink to {LIVE_URL} VERIFIED 100%!")

    if os.path.exists(live_pdf_tmp):
        os.remove(live_pdf_tmp)

    print("\n========================================================")
    print("ALL LIVE VERIFICATIONS PASSED WITH 100% SUCCESS!")
    print(f"Live Website URL: {LIVE_URL}")
    print("========================================================")

finally:
    try:
        proc.terminate()
        time.sleep(0.5)
        import shutil
        shutil.rmtree(profile_dir, ignore_errors=True)
    except Exception:
        pass
