import subprocess
import time
import urllib.request
import json
import base64
import os
import socket
from PIL import Image
import io

BRAIN_DIR = r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a'
CHROME = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'

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

    def screenshot(self):
        res = self.send('Page.captureScreenshot', {'format': 'png'})
        return base64.b64decode(res['result']['data'])

    def evaluate(self, expr):
        res = self.send('Runtime.evaluate', {'expression': expr, 'returnByValue': True})
        return res.get('result', {}).get('result', {}).get('value')

    def close(self):
        self.sock.close()

def main():
    print("=== LIVE VERIFICATION SUITE ===")
    
    proc = subprocess.Popen([
        CHROME,
        '--headless=new',
        '--remote-debugging-port=9235',
        '--no-sandbox',
        '--disable-gpu',
        'about:blank'
    ])
    time.sleep(1.5)

    try:
        with urllib.request.urlopen('http://127.0.0.1:9235/json/list') as r:
            pages = json.loads(r.read())
            ws_url = pages[0]['webSocketDebuggerUrl']
            path = ws_url.split('9235')[1]

        cdp = CDP('127.0.0.1', 9235, path)

        # 2. Set mobile viewport 390x844
        cdp.send('Emulation.setDeviceMetricsOverride', {
            'width': 390,
            'height': 844,
            'deviceScaleFactor': 1,
            'mobile': True
        })

        # 3. Navigate
        print("Navigating to http://localhost:8088/index.html...", flush=True)
        t0 = time.time()
        cdp.send('Page.navigate', {'url': 'http://localhost:8088/index.html'})

        # Sample time points for animation:
        # t = 0.5s: Gazing (looking into each other's eyes)
        # t = 0.85s: Groom blinking in gazing pose
        # t = 1.45s: Bride blinking in gazing pose
        # t = 2.4s: Stage 2 transition (heads turning + hands rising)
        # t = 3.2s: Stage 3 Namaste pose held with gentle smile
        # t = 4.2s: Front Groom blinking
        # t = 5.1s: Front Bride blinking
        time_points = [
            (0.5, 'live_01_gazing_0_5s.png'),
            (0.85, 'live_02_groom_blink_0_85s.png'),
            (1.45, 'live_03_bride_blink_1_45s.png'),
            (2.4, 'live_04_turning_to_namaste_2_4s.png'),
            (3.2, 'live_05_namaste_held_3_2s.png'),
            (4.2, 'live_06_front_groom_blink_4_2s.png'),
            (5.1, 'live_07_front_bride_blink_5_1s.png')
        ]

        frames = []
        for t_target, fname in time_points:
            elapsed = time.time() - t0
            to_wait = t_target - elapsed
            if to_wait > 0:
                time.sleep(to_wait)
            raw = cdp.screenshot()
            img = Image.open(io.BytesIO(raw))
            frames.append(img)
            p = os.path.join(BRAIN_DIR, fname)
            img.save(p)
            print(f"Captured {fname} at {t_target:.2f}s ({os.path.getsize(p)} bytes)")

        # Create animated GIF
        gif_path = os.path.join(BRAIN_DIR, 'live_verified_animation.gif')
        durations = [350, 600, 600, 800, 1000, 900, 900]
        frames[0].save(
            gif_path,
            save_all=True,
            append_images=frames[1:],
            duration=durations,
            loop=0
        )
        print(f"Saved animated GIF: {gif_path} ({os.path.getsize(gif_path)} bytes)")

        # 4. Test CLICK HERE button
        print("Testing CLICK HERE button...")
        cdp.evaluate("document.getElementById('open-invitation-btn').click()")
        time.sleep(0.8) # wait for animation modal sheet
        raw_sheet = cdp.screenshot()
        sheet_path = os.path.join(BRAIN_DIR, 'live_verified_modal_sheet.png')
        with open(sheet_path, 'wb') as f:
            f.write(raw_sheet)
        print(f"Captured live_verified_modal_sheet.png ({len(raw_sheet)} bytes)")

        # 5. Check Console Errors & Missing Resources
        console_errors = cdp.evaluate("window.__errors || []")
        print("Console errors:", console_errors)

        # 6. Check DOM Elements Spacing
        spacing_info = cdp.evaluate("""
        (() => {
            const shloka = document.querySelector('.cover-shloka-header').getBoundingClientRect();
            const blessings = document.querySelector('.cover-blessings-subtitle').getBoundingClientRect();
            const title = document.querySelector('.cover-family-invitation').getBoundingClientRect();
            const sub = document.querySelector('.cover-invitation-sub').getBoundingClientRect();
            const divider = document.querySelector('.cover-gold-divider').getBoundingClientRect();
            const medallion = document.querySelector('.medallion-hero-wrap').getBoundingClientRect();
            const couple = document.querySelector('.cover-couple-title').getBoundingClientRect();
            const dates = document.querySelector('.cover-dates-badge').getBoundingClientRect();
            const venue = document.querySelector('.cover-venue-line').getBoundingClientRect();
            const btn = document.querySelector('.cover-action-container').getBoundingClientRect();
            
            return {
                gap_shloka_to_blessings: blessings.top - shloka.bottom,
                gap_blessings_to_title: title.top - blessings.bottom,
                gap_title_to_sub: sub.top - title.bottom,
                gap_sub_to_divider: divider.top - sub.bottom,
                gap_divider_to_medallion: medallion.top - divider.bottom,
                gap_medallion_to_couple: couple.top - medallion.bottom,
                gap_couple_to_dates: dates.top - couple.bottom,
                gap_dates_to_venue: venue.top - dates.bottom,
                gap_venue_to_btn: btn.top - venue.bottom
            };
        })()
        """)
        print("Measured DOM Spacing (in px):", json.dumps(spacing_info, indent=2))

        cdp.close()
    finally:
        proc.terminate()

    print("=== LIVE VERIFICATION FINISHED ===")

if __name__ == '__main__':
    main()
