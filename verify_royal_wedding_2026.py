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
import pypdf
import pypdfium2 as pdfium
import re

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
EDGE_PATHS = [
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    r'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
]
EDGE_PATH = next((p for p in EDGE_PATHS if os.path.exists(p)), None)
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'verification_screens')
os.makedirs(OUTPUT_DIR, exist_ok=True)

class WeddingInvitationHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PROJECT_DIR, **kwargs)

    def end_headers(self):
        if self.path.lower().endswith('.pdf'):
            self.send_header('Content-Type', 'application/pdf')
            self.send_header('Content-Disposition', 'inline')
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

class CDP:
    def __init__(self, host, port, path):
        self.sock = socket.create_connection((host, port), timeout=30)
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
            try:
                msg = json.loads(data.decode('utf-8', errors='ignore'))
                if target_id is None or msg.get('id') == target_id:
                    return msg
            except Exception:
                pass

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
    if 'result' in res and 'data' in res['result']:
        b = base64.b64decode(res['result']['data'])
        out_path = os.path.join(OUTPUT_DIR, name)
        with open(out_path, 'wb') as f:
            f.write(b)
        print(f"Captured: {name} ({len(b)} bytes)")
        return out_path
    print(f"Failed to capture: {name}")

def run_tests():
    print("========================================================")
    print("STARTING END-TO-END ROYAL WEDDING 2026 VERIFICATION TEST")
    print("========================================================")

    # 1. Start HTTP Server on a dynamic free port
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    PORT_HTTP = s.getsockname()[1]
    s.close()

    server = HTTPServer(('127.0.0.1', PORT_HTTP), WeddingInvitationHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    print(f"HTTP Server serving '{PROJECT_DIR}' at http://127.0.0.1:{PORT_HTTP}/")

    # 2. Start Headless Edge for CDP testing
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    PORT_CDP = s.getsockname()[1]
    s.close()

    profile_dir = os.path.join(PROJECT_DIR, f'.browser_verify_{PORT_CDP}')
    os.makedirs(profile_dir, exist_ok=True)

    proc = subprocess.Popen([
        EDGE_PATH,
        '--headless=new',
        f'--remote-debugging-port={PORT_CDP}',
        f'--user-data-dir={profile_dir}',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        '--hide-scrollbars',
        f"http://127.0.0.1:{PORT_HTTP}/index.html"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    try:
        time.sleep(2.5)
        targets_url = f"http://127.0.0.1:{PORT_CDP}/json"
        with urllib.request.urlopen(targets_url) as resp:
            targets = json.loads(resp.read().decode())

        page_target = next(t for t in targets if t.get('type') == 'page')
        ws_url = page_target['webSocketDebuggerUrl']
        host_port, path = ws_url.replace("ws://", "").split('/', 1)
        host, port_str = host_port.split(':')
        cdp = CDP(host, int(port_str), '/' + path)
        cdp.send("Page.enable")

        url = f"http://127.0.0.1:{PORT_HTTP}/index.html"

        # ----------------------------------------------------
        # TEST 1: MOBILE VIEWPORT (390 x 844 iPhone) - OPENING ENVELOPE
        # ----------------------------------------------------
        print("\n--- TEST 1: Mobile Viewport 390x844 ---")
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 390,
            "height": 844,
            "deviceScaleFactor": 2,
            "mobile": True
        })
        cdp.send("Page.navigate", {"url": url})
        time.sleep(2.5)
        screenshot(cdp, "royal_01_mobile_opening_closed_envelope.png")

        # ----------------------------------------------------
        # TEST 2: DESKTOP VIEWPORT (1440 x 900) - OPENING ENVELOPE
        # ----------------------------------------------------
        print("\n--- TEST 2: Desktop Viewport 1440x900 ---")
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 1440,
            "height": 900,
            "deviceScaleFactor": 1,
            "mobile": False
        })
        cdp.send("Page.navigate", {"url": url})
        time.sleep(2)
        screenshot(cdp, "royal_02_desktop_opening_closed_envelope.png")

        # ----------------------------------------------------
        # TEST 3: CLICK "OPEN YOUR INVITATION" -> FIREWORKS & OPENING
        # ----------------------------------------------------
        print("\n--- TEST 3: Clicking 'OPEN YOUR INVITATION' ---")
        cdp.send("Runtime.evaluate", {
            "expression": "document.querySelector('.btn-royal-open-invitation').click()"
        })
        time.sleep(1.2)
        screenshot(cdp, "royal_03_desktop_envelope_opening_and_fireworks.png")

        # Wait for full transition to main website (approx 4s)
        time.sleep(3.6)
        screenshot(cdp, "royal_04_desktop_hero_revealed.png")

        # ----------------------------------------------------
        # TEST 4: HERO SECTION NO BUTTONS & MAIN SECTIONS INSPECTION
        # ----------------------------------------------------
        print("\n--- TEST 4: Main Sections & Hero Inspection ---")

        # Verify that the 4 top action buttons and their container are completely gone from hero
        hero_check = cdp.send("Runtime.evaluate", {
            "expression": """(() => {
                const hero = document.getElementById('hero-section');
                const btnGroup = hero.querySelector('.hero-cta-button-group');
                const viewCardBtn = hero.querySelector('.btn-view-card');
                const downloadBtn = hero.querySelector('.btn-download-pdf');
                const itineraryBtn = hero.querySelector('.btn-secondary-itinerary');
                const venueBtn = hero.querySelector('.btn-secondary-venue');
                const heroText = hero.innerText;
                return {
                    hasGroup: !!btnGroup,
                    hasViewCard: !!viewCardBtn,
                    hasDownload: !!downloadBtn,
                    hasItinerary: !!itineraryBtn,
                    hasVenue: !!venueBtn,
                    hasTeena: heroText.includes('TEENA'),
                    hasKuldeep: heroText.includes('KULDEEP'),
                    hasDate: heroText.includes('11 DECEMBER 2026')
                };
            })()""",
            "returnByValue": True
        })
        hc = hero_check.get('result', {}).get('result', {}).get('value', {})
        print(f"Hero Section Button Audit: {hc}")
        assert not hc.get('hasGroup'), "ERROR: .hero-cta-button-group still exists in hero!"
        assert not hc.get('hasViewCard'), "ERROR: View Card button still exists in hero!"
        assert not hc.get('hasDownload'), "ERROR: Download button still exists in hero!"
        assert not hc.get('hasItinerary'), "ERROR: Itinerary button still exists in hero!"
        assert not hc.get('hasVenue'), "ERROR: Venue button still exists in hero!"
        assert hc.get('hasTeena') and hc.get('hasKuldeep'), "ERROR: Teena & Kuldeep missing from hero!"
        print("Hero Action Buttons Container successfully and completely removed!")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('bride-section').scrollIntoView()"})
        time.sleep(0.8)
        screenshot(cdp, "royal_05_desktop_bride_family_section.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('groom-section').scrollIntoView()"})
        time.sleep(0.8)
        screenshot(cdp, "royal_06_desktop_groom_family_section.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('events-section').scrollIntoView()"})
        time.sleep(0.8)
        screenshot(cdp, "royal_07_desktop_events_itinerary.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('venue-section').scrollIntoView()"})
        time.sleep(0.8)
        screenshot(cdp, "royal_08_desktop_venue_and_directions.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('countdown-section').scrollIntoView()"})
        time.sleep(0.8)
        screenshot(cdp, "royal_09_desktop_countdown_timer.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('family-section').scrollIntoView()"})
        time.sleep(0.8)
        screenshot(cdp, "royal_10_desktop_family_compliments_rsvp.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('footer-section').scrollIntoView()"})
        time.sleep(0.8)
        screenshot(cdp, "royal_11_desktop_final_blessings_footer.png")

        # Check live website DOM text content
        dom_text_eval = cdp.send("Runtime.evaluate", {
            "expression": "document.body.innerText",
            "returnByValue": True
        })
        dom_text = dom_text_eval.get('result', {}).get('result', {}).get('value', '')
        print("\n--- DOM Content Check ---")
        assert "NAINA" not in dom_text.upper(), "ERROR: NAINA found in live website text!"
        assert "TEENA" in dom_text.upper(), "ERROR: TEENA missing in live website text!"
        assert "MANJU DEVI" in dom_text.upper(), "ERROR: Mrs. Manju Devi missing in live website text!"
        assert "RAMGOPAL VAJPAYEE" in dom_text.upper(), "ERROR: Mr. Ramgopal Vajpayee missing in live website text!"
        assert "CHAMPALAL" in dom_text.upper(), "ERROR: Champalal missing in live website text!"
        assert "PEPI DEVI" in dom_text.upper(), "ERROR: Late Mrs. Pepi Devi missing in live website text!"
        assert "JASRAJ" in dom_text.upper(), "ERROR: Jasraj Ji Upadhyay missing in live website text!"
        assert "CHANDA DEVI" in dom_text.upper(), "ERROR: Chanda Devi missing in live website text!"
        assert "ADIGAUD" in dom_text.upper(), "ERROR: ADIGAUD venue missing in live website text!"
        assert "MAHESH NAGAR" in dom_text.upper(), "ERROR: MAHESH NAGAR missing in live website text!"
        assert "ADINATH" not in dom_text.upper(), "ERROR: ADINATH found in live website text!"
        
        # Verify Groom Specific Lineage Hierarchy in Section
        groom_lineage_eval = cdp.send("Runtime.evaluate", {
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
        gl = groom_lineage_eval.get('result', {}).get('result', {}).get('value', {})
        print(f"Groom Lineage Audit: {gl}")
        assert "SON OF" in gl.get('relHeading', '').upper(), f"Missing SON OF heading: {gl}"
        assert "CHANDA DEVI" in gl.get('parentNames', '').upper(), f"Chanda Devi missing from parents: {gl}"
        assert "JASRAJ" in gl.get('parentNames', '').upper(), f"Jasraj Ji missing from parents: {gl}"
        assert "GRANDSON OF" in gl.get('gpLabel', '').upper(), f"Missing GRANDSON OF label: {gl}"
        assert "PEPI DEVI" in gl.get('gpNames', '').upper(), f"Pepi Devi missing from grandparents: {gl}"
        assert "CHAMPALAL" in gl.get('gpNames', '').upper(), f"Champalal missing from grandparents: {gl}"
        print("Groom Lineage Hierarchy PASSED: SON OF (Mrs. Chanda Devi & Mr. Jasraj Ji Upadhyay) and GRANDSON OF (Late Mrs. Pepi Devi & Late Mr. Champalal Ji Upadhyay) verified!")

        # ----------------------------------------------------
        # TEST 5: FULL-SCREEN CARD VIEWER MODAL
        # ----------------------------------------------------
        print("\n--- TEST 5: Opening Card Viewer Modal ---")
        cdp.send("Runtime.evaluate", {
            "expression": "document.querySelector('.btn-view-card-footer').click()"
        })
        time.sleep(1)
        screenshot(cdp, "royal_12_viewer_modal_single_page.png")

        # Close Modal
        cdp.send("Runtime.evaluate", {
            "expression": "document.querySelector('.btn-close-modal').click()"
        })
        time.sleep(0.5)

        # ----------------------------------------------------
        # TEST 6: VERIFY DOWNLOAD LINK IN NAV AND FOOTER
        # ----------------------------------------------------
        print("\n--- TEST 6: PDF Download Link Verification ---")
        dl_eval = cdp.send("Runtime.evaluate", {
            "expression": "document.querySelector('.btn-download-pdf-footer').getAttribute('href')",
            "returnByValue": True
        })
        dl_href = dl_eval.get('result', {}).get('result', {}).get('value', '')
        print(f"Footer Download Button Href: {dl_href}")
        assert "Teena_Kuldeep" in dl_href and dl_href.endswith(".pdf"), f"Unexpected download link: {dl_href}"

        # Test downloading via HTTP server
        pdf_http_url = f"http://127.0.0.1:{PORT_HTTP}/{dl_href}"
        with urllib.request.urlopen(pdf_http_url) as resp:
            data = resp.read()
            print(f"Successfully downloaded PDF via HTTP! Size: {len(data)} bytes, Content-Type: {resp.headers.get('Content-Type')}")
            assert len(data) > 100000, "Downloaded PDF seems too small!"

        # ----------------------------------------------------
        # TEST 7: DEEP PDF STRUCTURAL & CONTENT AUDIT
        # ----------------------------------------------------
        print("\n--- TEST 7: Deep Single-Page PDF Verification ---")
        pdf_path = os.path.join(PROJECT_DIR, 'Teena_Kuldeep_New_Royal_Digital_Invitation.pdf')
        reader = pypdf.PdfReader(pdf_path)
        assert len(reader.pages) == 1, f"Expected 1 page, found {len(reader.pages)}"
        page = reader.pages[0]
        w = float(page.mediabox.width)
        h = float(page.mediabox.height)
        print(f"Page size: {w:.2f} x {h:.2f} pt (A5)")

        clean_text = re.sub(r'[^A-Z0-9]', '', page.extract_text().upper())
        print(f"Extracted Clean Text: {clean_text}")

        assert "ROYALWEDDINGCELEBRATION" in clean_text
        assert "NAINA" not in clean_text, "ERROR: Found forbidden name NAINA in PDF!"
        assert "TEENA" in clean_text
        assert "KULDEEP" in clean_text
        assert "FRIDAY11DECEMBER2026" in clean_text
        assert "TWOHEARTSONEBEAUTIFULJOURNEY" in clean_text
        assert "CLICKHERE" in clean_text
        assert "OPENYOURWEDDINGINVITATION" in clean_text

        forbidden = ["naina", "ramgopal", "manju", "janki", "pepi", "champalal", "chyamalal", "jasraj", "upadhyay", "vajpayee", "dharamshala", "9782715591"]
        for f in forbidden:
            assert f not in page.extract_text().lower(), f"Forbidden word '{f}' in PDF!"

        annots = page.get('/Annots')
        assert annots and len(annots) >= 1
        found_link = False
        for a in annots:
            obj = a.get_object()
            action = obj.get('/A')
            if action and action.get('/URI') == 'https://pushu1.github.io/param-pummy-wedding/':
                found_link = True
                print(f"Active PDF Hyperlink verified: {action.get('/URI')} with Rect {obj.get('/Rect')}")
        assert found_link, "PDF Link Annotation to website not found!"

        # ----------------------------------------------------
        # TEST 8: MOBILE FLOW SECTIONS (390 x 844)
        # ----------------------------------------------------
        print("\n--- TEST 8: Mobile Flow 390x844 Sections ---")
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 390,
            "height": 844,
            "deviceScaleFactor": 2,
            "mobile": True
        })
        time.sleep(0.5)
        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('hero-section').scrollIntoView({ behavior: 'instant' }); window.scrollTo(0, 0);"})
        time.sleep(1.0)
        screenshot(cdp, "royal_13_mobile_hero_view.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('bride-section').scrollIntoView()"})
        time.sleep(0.6)
        screenshot(cdp, "royal_14_mobile_bride_family_section.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('events-section').scrollIntoView()"})
        time.sleep(0.6)
        screenshot(cdp, "royal_15_mobile_events_section.png")

        cdp.send("Runtime.evaluate", {"expression": "document.getElementById('venue-section').scrollIntoView()"})
        time.sleep(0.6)
        screenshot(cdp, "royal_16_mobile_venue_section.png")

        print("\n========================================================")
        print("ALL VERIFICATIONS COMPLETED SUCCESSFULLY WITH 100% PASS!")
        print("========================================================")

    finally:
        try:
            proc.terminate()
            time.sleep(0.5)
            shutil.rmtree(profile_dir, ignore_errors=True)
        except Exception:
            pass
        server.shutdown()

if __name__ == '__main__':
    run_tests()
