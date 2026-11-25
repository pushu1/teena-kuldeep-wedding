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
        self.sock = socket.create_connection((host, port), timeout=15)
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
        resp = self.sock.recv(4096)
        if b"101 " not in resp:
            raise RuntimeError(f"WebSocket upgrade failed: {resp[:200]}")
        self.msg_id = 1

    def send(self, method, params=None):
        mid = self.msg_id
        self.msg_id += 1
        payload = json.dumps({"id": mid, "method": method, "params": params or {}})
        frame = bytearray([0x81])
        b_payload = payload.encode('utf-8')
        length = len(b_payload)
        mask = os.urandom(4)
        if length <= 125:
            frame.append(0x80 | length)
        elif length <= 65535:
            frame.append(0x80 | 126)
            frame.extend(length.to_bytes(2, 'big'))
        else:
            frame.append(0x80 | 127)
            frame.extend(length.to_bytes(8, 'big'))
        frame.extend(mask)
        masked = bytearray(b ^ mask[i % 4] for i, b in enumerate(b_payload))
        frame.extend(masked)
        self.sock.sendall(frame)

        # Receive until matching id
        while True:
            head = self.sock.recv(2)
            if not head:
                return {}
            length = head[1] & 0x7F
            if length == 126:
                length = int.from_bytes(self.sock.recv(2), 'big')
            elif length == 127:
                length = int.from_bytes(self.sock.recv(8), 'big')
            data = bytearray()
            while len(data) < length:
                chunk = self.sock.recv(length - len(data))
                if not chunk:
                    break
                data.extend(chunk)
            try:
                msg = json.loads(data.decode('utf-8', errors='ignore'))
                if msg.get('id') == mid:
                    return msg.get('result', {})
            except Exception:
                pass

    def evaluate(self, expr):
        res = self.send("Runtime.evaluate", {"expression": expr, "returnByValue": True})
        return res.get('result', {}).get('value')

    def screenshot(self, path):
        res = self.send("Page.captureScreenshot", {"format": "png", "quality": 95})
        b64 = res.get('data')
        if b64:
            with open(path, 'wb') as f:
                f.write(base64.b64decode(b64))
            print(f"Saved: {os.path.basename(path)}")

def run_tests():
    port = 8096
    server = HTTPServer(('127.0.0.1', port), WeddingInvitationHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    print(f"HTTP Server started at http://127.0.0.1:{port}")

    cdp_port = 9336
    user_data = os.path.join(PROJECT_DIR, '.browser_profile_verify_ref')
    os.makedirs(user_data, exist_ok=True)

    cmd = [
        EDGE_PATH,
        '--headless=new',
        f'--remote-debugging-port={cdp_port}',
        f'--user-data-dir={user_data}',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        'about:blank'
    ]
    proc = subprocess.Popen(cmd)
    time.sleep(2)

    try:
        targets_url = f"http://127.0.0.1:{cdp_port}/json"
        with urllib.request.urlopen(targets_url) as resp:
            targets = json.loads(resp.read().decode('utf-8'))
        page_target = next(t for t in targets if t.get('type') == 'page')
        ws_url = page_target['webSocketDebuggerUrl']
        path = ws_url.split(f":{cdp_port}")[1]

        cdp = CDP("127.0.0.1", cdp_port, path)
        cdp.send("Page.enable")
        cdp.send("DOM.enable")

        # 1. MOBILE VIEWPORT TEST (390 x 844 iPhone 14/15)
        print("\n--- Testing Mobile Viewport (390x844) ---")
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 390,
            "height": 844,
            "deviceScaleFactor": 2,
            "mobile": True
        })

        cdp.send("Page.navigate", {"url": f"http://127.0.0.1:{port}/index.html"})
        time.sleep(2.5)

        # Capture Gate Landing Screen (Doors Closed)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_01_gate_doors_closed_mobile.png"))

        # Click crest to trigger 3D door opening
        print("Tapping crest to open haveli doors...")
        cdp.evaluate("document.querySelector('.gate-center-crest').click()")
        time.sleep(0.5)

        # Capture Door Opening Animation state
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_02_gate_doors_opening_mobile.png"))

        # Wait for full gate open and main page reveal
        time.sleep(1.2)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_03_hero_cover_revealed_mobile.png"))

        # Scroll to Formal Invitation Section
        cdp.evaluate("document.getElementById('formal-invitation').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_04_formal_invitation_mobile.png"))

        # Scroll to Save The Date & Scratch Cards
        cdp.evaluate("document.getElementById('save-the-date').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_05_scratch_cards_unrevealed_mobile.png"))

        # Reveal cards
        print("Revealing scratch cards...")
        cdp.evaluate("document.querySelector('.btn-reveal-hint')?.click()")
        time.sleep(0.6)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_06_scratch_cards_revealed_mobile.png"))

        # Scroll to Auspicious Muhurat & Timeline
        cdp.evaluate("document.getElementById('auspicious-muhurat').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_07_auspicious_muhurat_mobile.png"))

        # Scroll to Schedule of Events Timeline
        cdp.evaluate("document.getElementById('schedule-of-events').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_08_schedule_events_top_mobile.png"))

        cdp.evaluate("window.scrollBy(0, 480)")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_09_schedule_events_bottom_mobile.png"))

        # Scroll to Venue Section
        cdp.evaluate("document.getElementById('venue-location').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_10_venue_section_mobile.png"))

        # Scroll to Our Gallery
        cdp.evaluate("document.getElementById('our-gallery').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_11_our_gallery_photo1_mobile.png"))

        # Click next arrow on gallery
        cdp.evaluate("document.querySelector('.gallery-nav-arrow.arrow-right').click()")
        time.sleep(0.5)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_12_our_gallery_photo2_mobile.png"))

        # Scroll to Wardrobe Planner
        cdp.evaluate("document.getElementById('wardrobe-planner').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_13_wardrobe_planner_haldi_mobile.png"))

        # Click Sangeet Tab
        cdp.evaluate("document.querySelectorAll('.wardrobe-tab-pill')[1]?.click()")
        time.sleep(0.5)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_14_wardrobe_planner_sangeet_mobile.png"))

        # Open Wardrobe Modal
        cdp.evaluate("document.querySelector('.wardrobe-card-surface').click()")
        time.sleep(0.5)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_15_wardrobe_modal_open_mobile.png"))

        # Close Modal
        cdp.evaluate("document.querySelector('.wardrobe-modal-close-btn').click()")
        time.sleep(0.4)

        # Scroll to RSVP Section
        cdp.evaluate("document.getElementById('rsvp-section').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_16_rsvp_form_mobile.png"))

        # Scroll to Closing Footer
        cdp.evaluate("document.getElementById('closing-footer').scrollIntoView({ behavior: 'instant', block: 'start' })")
        time.sleep(0.8)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_17_closing_footer_mobile.png"))

        # 2. DESKTOP VIEWPORT TEST (1280 x 800)
        print("\n--- Testing Desktop Viewport (1280x800) ---")
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 1280,
            "height": 800,
            "deviceScaleFactor": 1,
            "mobile": False
        })
        cdp.send("Page.navigate", {"url": f"http://127.0.0.1:{port}/index.html"})
        time.sleep(2)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_18_desktop_gate_doors_closed.png"))

        # Open gate on desktop
        cdp.evaluate("document.querySelector('.gate-center-crest').click()")
        time.sleep(1.5)
        cdp.screenshot(os.path.join(OUTPUT_DIR, "v2_19_desktop_invitation_revealed.png"))

        print("\nAll verification screenshots captured successfully!")

    finally:
        try:
            proc.terminate()
        except:
            pass
        server.shutdown()

if __name__ == '__main__':
    run_tests()
