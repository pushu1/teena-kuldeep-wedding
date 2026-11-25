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

profile_dir = os.path.join(PROJECT_DIR, f'.browser_roboto_{PORT_CDP}')
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

        # Envelope screenshot
        screenshot(cdp, 'roboto_slab_01_desktop_envelope.png')

        # Skip intro directly to main website flow
        cdp.send('Runtime.evaluate', {
            'expression': '''(function() {
                var skip = document.querySelector('.skip-btn');
                if (skip) skip.click();
            })()'''
        })
        time.sleep(2.5)

        # Evaluate computed font families on all requested elements in the main flow
        font_eval = cdp.send('Runtime.evaluate', {
            'expression': '''(function() {
                var sels = [
                    ['Main Wedding Title (Envelope)', '.env-sub-title'],
                    ['TEENA & KULDEEP (Hero)', '.hero-name-primary'],
                    ['Section Headings', '.section-title-gold'],
                    ['Wedding Date Highlight', '.date-main'],
                    ['Bride/Groom Profile Name', '.profile-name'],
                    ['Relationship Heading', '.relationship-heading'],
                    ['Parent Lineage', '.parent-name'],
                    ['Wedding Event Title', '.event-title'],
                    ['Venue Heading', '.venue-name-title'],
                    ['Family Invitation Quote', '.quote-text'],
                    ['Compliments Host Name', '.host-name'],
                    ['RSVP Blessings Title', '.blessings-title'],
                    ['Countdown Numbers', '.unit-number'],
                    ['Countdown Labels', '.unit-label'],
                    ['Buttons & Nav (View Card)', '.nav-btn-view-card'],
                    ['Buttons & Nav (Download PDF)', '.nav-btn-download-pdf'],
                    ['Music Pill Button', '.royal-music-pill-btn'],
                    ['Footer Couple Signature', '.footer-couple-names'],
                    ['Sticky Nav Brand Title', '.brand-title'],
                    ['Base Body Typography', 'body']
                ];
                return sels.map(function(s) {
                    var el = document.querySelector(s[1]);
                    return {
                        label: s[0],
                        selector: s[1],
                        fontFamily: el ? window.getComputedStyle(el).fontFamily : 'NOT FOUND',
                        fontWeight: el ? window.getComputedStyle(el).fontWeight : 'NOT FOUND'
                    };
                });
            })()''',
            'returnByValue': True
        })

        results = font_eval.get('result', {}).get('result', {}).get('value', [])
        print("\n" + "="*80)
        print(f"{'ELEMENT CATEGORY':<30} | {'COMPUTED FONT FAMILY':<30} | {'WEIGHT'}")
        print("="*80)
        all_roboto_slab = True
        has_courgette = False
        for row in results:
            print(f"{row['label']:<30} | {row['fontFamily']:<30} | {row['fontWeight']}")
            if 'Roboto Slab' not in row['fontFamily']:
                all_roboto_slab = False
            if 'Courgette' in row['fontFamily']:
                has_courgette = True

        print("="*80)
        print(f"All elements verified using 'Roboto Slab'? {all_roboto_slab}")
        print(f"Courgette completely eliminated (0 instances)? {not has_courgette}")

        # Desktop Hero Screenshot
        screenshot(cdp, 'roboto_slab_02_desktop_hero.png')

        # Scroll to Bride & Groom Family
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('bride-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'roboto_slab_03_desktop_bride_family.png')

        # Scroll to Celebrations / Events
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('events-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'roboto_slab_04_desktop_events.png')

        # Scroll to Venue
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('venue-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'roboto_slab_05_desktop_venue.png')

        # Scroll to Countdown
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('countdown-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'roboto_slab_06_desktop_countdown.png')

        # Scroll to Footer
        cdp.send('Runtime.evaluate', {
            'expression': '''window.scrollTo(0, document.body.scrollHeight);'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'roboto_slab_07_desktop_footer.png')

        # 2. Mobile Viewport (390x844 - iPhone 14)
        cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 390, 'height': 844, 'deviceScaleFactor': 2, 'mobile': True
        })
        cdp.send('Runtime.evaluate', {'expression': '''window.scrollTo(0, 0);'''})
        time.sleep(1.5)
        screenshot(cdp, 'roboto_slab_08_mobile_hero.png')

        # Mobile Groom section
        cdp.send('Runtime.evaluate', {
            'expression': '''document.getElementById('groom-section').scrollIntoView();'''
        })
        time.sleep(1.5)
        screenshot(cdp, 'roboto_slab_09_mobile_groom.png')

        print("\nAll Roboto Slab typography tests & verification screenshots completed successfully!")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()

if __name__ == '__main__':
    run()
