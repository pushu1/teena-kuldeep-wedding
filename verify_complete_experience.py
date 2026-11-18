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

class CDPClient:
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
        payload = json.dumps({"id": self.msg_id, "method": method, "params": params or {}}).encode('utf-8')
        length = len(payload)
        mask_key = os.urandom(4)
        header = bytearray([0x81])
        if length < 126:
            header.append(0x80 | length)
        elif length < 65536:
            header.append(0x80 | 126)
            header.extend(length.to_bytes(2, 'big'))
        else:
            header.append(0x80 | 127)
            header.extend(length.to_bytes(8, 'big'))
        header.extend(mask_key)
        masked = bytearray(b ^ mask_key[i % 4] for i, b in enumerate(payload))
        self.sock.sendall(header + masked)
        return self.msg_id

    def recv(self, target_id=None):
        while True:
            head = self._recv_exact(2)
            length = head[1] & 0x7F
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

    def capture_screenshot(self):
        mid = self.send('Page.captureScreenshot', {'format': 'png'})
        res = self.recv(mid)
        data = base64.b64decode(res['result']['data'])
        return data

    def close(self):
        self.sock.close()

def run_tests():
    print("=== STARTING COMPREHENSIVE TESTING ===")
    
    # -------------------------------------------------------------------------
    # TEST 1: ANIMATION SEQUENCE OVER TIME (Stage 1 -> Stage 2 -> Stage 3)
    # -------------------------------------------------------------------------
    print("\n--- Test 1: Real-Time Animation Verification ---")
    proc = subprocess.Popen([
        CHROME,
        '--headless=new',
        '--remote-debugging-port=9226',
        '--no-sandbox',
        '--disable-gpu',
        '--window-size=430,932',
        'about:blank'
    ])
    time.sleep(1.5)
    
    anim_frames = []
    try:
        with urllib.request.urlopen('http://127.0.0.1:9226/json/list') as r:
            pages = json.loads(r.read())
            ws_url = pages[0]['webSocketDebuggerUrl']
            path = ws_url.split('9226')[1]

        cdp = CDPClient('127.0.0.1', 9226, path)
        t_start = time.time()
        cdp.send('Page.navigate', {'url': 'http://localhost:8088/index.html'})
        
        # Sample points in time (relative to page load):
        # 0.5s: Stage 1 (Gazing)
        # 0.85s: Groom blinking in gazing pose
        # 1.45s: Bride blinking in gazing pose
        # 2.3s: Stage 2 (Turning faces + raising hands)
        # 3.2s: Stage 3 (Namaste pose complete)
        # 4.1s: Groom blinking in front pose
        # 5.0s: Bride blinking in front pose
        sample_times = [0.5, 0.85, 1.45, 2.3, 3.2, 4.1, 5.0]
        
        for st in sample_times:
            now = time.time() - t_start
            wait_time = st - now
            if wait_time > 0:
                time.sleep(wait_time)
            
            raw_png = cdp.capture_screenshot()
            img = Image.open(io.BytesIO(raw_png))
            anim_frames.append(img)
            
            fname = f'anim_frame_{int(st*1000)}ms.png'
            fpath = os.path.join(BRAIN_DIR, fname)
            img.save(fpath)
            print(f"Captured {fname} at {st:.2f}s (size: {os.path.getsize(fpath)} bytes)")

        # Test CLICK HERE button
        print("Testing CLICK HERE button...")
        cdp.send('Runtime.evaluate', {'expression': "document.getElementById('open-invitation-btn').click()"})
        time.sleep(0.8) # wait for sheet to slide open
        raw_sheet = cdp.capture_screenshot()
        sheet_img = Image.open(io.BytesIO(raw_sheet))
        sheet_path = os.path.join(BRAIN_DIR, 'verified_sheet_opened.png')
        sheet_img.save(sheet_path)
        print(f"Captured verified_sheet_opened.png (size: {os.path.getsize(sheet_path)} bytes)")

        cdp.close()
    finally:
        proc.terminate()

    # Save animated GIF verification
    if anim_frames:
        gif_path = os.path.join(BRAIN_DIR, 'verified_couple_animation.gif')
        durations = [350, 600, 600, 900, 900, 900, 900]
        anim_frames[0].save(
            gif_path,
            save_all=True,
            append_images=anim_frames[1:],
            duration=durations,
            loop=0
        )
        print(f"Created animated verification GIF: {gif_path} ({os.path.getsize(gif_path)} bytes)")

    # -------------------------------------------------------------------------
    # TEST 2: ALL REQUIRED RESPONSIVE SCREEN SIZES
    # -------------------------------------------------------------------------
    print("\n--- Test 2: Responsive Dimensions Verification ---")
    resolutions = [
        ('responsive_360x800.png', 360, 800),
        ('responsive_390x844.png', 390, 844),
        ('responsive_430x932.png', 430, 932),
        ('responsive_1366x768.png', 1366, 768)
    ]

    for name, w, h in resolutions:
        proc_r = subprocess.Popen([
            CHROME,
            '--headless=new',
            '--remote-debugging-port=9227',
            '--no-sandbox',
            '--disable-gpu',
            f'--window-size={w},{h}',
            'about:blank'
        ])
        time.sleep(1.2)
        try:
            with urllib.request.urlopen('http://127.0.0.1:9227/json/list') as r:
                pages = json.loads(r.read())
                ws_url = pages[0]['webSocketDebuggerUrl']
                path = ws_url.split('9227')[1]

            cdp_r = CDPClient('127.0.0.1', 9227, path)
            cdp_r.send('Page.navigate', {'url': 'http://localhost:8088/index.html?state=namaste'})
            time.sleep(1.0)
            
            raw = cdp_r.capture_screenshot()
            out_p = os.path.join(BRAIN_DIR, name)
            with open(out_p, 'wb') as f:
                f.write(raw)
            print(f"Captured {name} ({w}x{h}) -> {os.path.getsize(out_p)} bytes")
            cdp_r.close()
        finally:
            proc_r.terminate()

    print("\n=== ALL TESTS COMPLETED SUCCESSFULLY ===")

if __name__ == '__main__':
    run_tests()
