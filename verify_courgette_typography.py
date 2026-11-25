import os
import sys
import time
import socket
import json
import base64
import subprocess
import urllib.request
from http.server import SimpleHTTPRequestHandler, HTTPServer
import threading

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'verification_screens')
os.makedirs(OUTPUT_DIR, exist_ok=True)

EDGE_PATHS = [
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    r'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
]
EDGE_PATH = next((p for p in EDGE_PATHS if os.path.exists(p)), None)

if not EDGE_PATH:
    print('Edge not found!')
    sys.exit(1)

# Dynamically pick ports
s1 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s1.bind(('', 0))
PORT_HTTP = s1.getsockname()[1]
s1.close()

s2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s2.bind(('', 0))
PORT_CDP = s2.getsockname()[1]
s2.close()

class WeddingHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PROJECT_DIR, **kwargs)

server = HTTPServer(('127.0.0.1', PORT_HTTP), WeddingHandler)
server_thread = threading.Thread(target=server.serve_forever, daemon=True)
server_thread.start()

profile_dir = os.path.join(PROJECT_DIR, f'.browser_courgette_{PORT_CDP}')
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

def run():
    print(f"Starting Edge with CDP on port {PORT_CDP}...")
    proc = subprocess.Popen([
        EDGE_PATH,
        '--headless=new',
        f'--remote-debugging-port={PORT_CDP}',
        f'--user-data-dir={profile_dir}',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        '--autoplay-policy=no-user-gesture-required',
        f'http://127.0.0.1:{PORT_HTTP}/index.html'
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    try:
        time.sleep(3.5)
        raw = urllib.request.urlopen(f'http://127.0.0.1:{PORT_CDP}/json').read()
        targets = json.loads(raw.decode('utf-8'))
        page_target = next(t for t in targets if t.get('type') == 'page')
        ws_url = page_target['webSocketDebuggerUrl']
        host_port, path = ws_url.replace("ws://", "").split('/', 1)
        host, port_str = host_port.split(':')
        cdp = CDP(host, int(port_str), '/' + path)
        cdp.send("Page.enable")

        # 1. Desktop viewport (1280x900)
        cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 1280, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False
        })
        time.sleep(2)

        # Check envelope typography before opening
        env_font_eval = cdp.send('Runtime.evaluate', {
            'expression': '''(function() {
                var el = document.querySelector('.env-couple-title');
                var sub = document.querySelector('.env-sub-title');
                var dt = document.querySelector('.env-date-strip');
                return {
                    couple_font: el ? window.getComputedStyle(el).fontFamily : 'null',
                    sub_font: sub ? window.getComputedStyle(sub).fontFamily : 'null',
                    date_font: dt ? window.getComputedStyle(dt).fontFamily : 'null',
                };
            })()''',
            'returnByValue': True
        })
        print("Envelope typography:", env_font_eval.get('result', {}).get('value'))

        screenshot(cdp, 'courgette_01_desktop_envelope.png')

        # Skip intro directly to main website flow
        cdp.send('Runtime.evaluate', {
            'expression': '''(function() {
                var skip = document.querySelector('.skip-btn');
                if (skip) skip.click();
            })()'''
        })
        time.sleep(2.5)

        # Evaluate computed font families on all key elements in the main flow
        font_eval = cdp.send('Runtime.evaluate', {
            'expression': '''(function() {
                function getFF(sel) {
                    var el = document.querySelector(sel);
                    return el ? window.getComputedStyle(el).fontFamily : 'NOT_FOUND';
                }
                return {
                    hero_name_primary: getFF('.hero-name-primary'),
                    hero_shubh_vivah: getFF('.hero-shubh-vivah'),
                    date_main: getFF('.date-main'),
                    hero_journey_quote: getFF('.hero-journey-quote'),
                    section_title_gold: getFF('.section-title-gold'),
                    section_subtitle_script: getFF('.section-subtitle-script'),
                    profile_name: getFF('.profile-name'),
                    family_welcome_note: getFF('.family-welcome-note .note-text'),
                    day_main_heading: getFF('.day-main-heading'),
                    day_calendar_date: getFF('.day-calendar-date'),
                    event_title: getFF('.event-title'),
                    venue_name_title: getFF('.venue-name-title'),
                    quote_text: getFF('.quote-text'),
                    host_name: getFF('.host-name'),
                    blessings_title: getFF('.blessings-title'),
                    footer_treasured_quote: getFF('.footer-treasured-quote'),
                    footer_couple_names: getFF('.footer-couple-names'),
                    brand_title: getFF('.brand-title'),
                    body_font: window.getComputedStyle(document.body).fontFamily
                };
            })()''',
            'returnByValue': True
        })

        results = font_eval.get('result', {}).get('value', {})
        print("\n=== COMPUTED FONT FAMILIES ===")
        all_courgette = True
        for k, v in results.items():
            print(f"  {k}: {v}")
            if k != 'body_font' and 'Courgette' not in v:
                all_courgette = False

        print("\nAll key decorative typography using Courgette?", all_courgette)

        # Desktop Hero Screenshot
        screenshot(cdp, 'courgette_02_desktop_hero.png')

        # Scroll to Bride & Groom Family
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('bride-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'courgette_03_desktop_bride_family.png')

        # Scroll to Celebrations / Events
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('events-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'courgette_04_desktop_events.png')

        # Scroll to Venue
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('venue-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'courgette_05_desktop_venue.png')

        # Scroll to Footer
        cdp.send('Runtime.evaluate', {
            'expression': '''window.scrollTo(0, document.body.scrollHeight);'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'courgette_06_desktop_footer.png')

        # 2. Mobile Viewport (390x844 - iPhone 14 / modern mobile)
        cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 390, 'height': 844, 'deviceScaleFactor': 2, 'mobile': True
        })
        cdp.send('Runtime.evaluate', {'expression': '''window.scrollTo(0, 0);'''})
        time.sleep(1.5)
        screenshot(cdp, 'courgette_07_mobile_hero.png')

        # Mobile Family section
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('groom-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'courgette_08_mobile_groom.png')

        print("\nAll typography tests & verification screenshots completed successfully!")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()

if __name__ == '__main__':
    run()
