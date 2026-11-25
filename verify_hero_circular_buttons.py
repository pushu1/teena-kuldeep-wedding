import os
import sys
import time
import json
import base64
import socket
import subprocess

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
CHROME_PATH = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
BROWSER_BIN = CHROME_PATH if os.path.exists(CHROME_PATH) else EDGE_PATH
BRAIN_DIR = r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a'
VERIF_DIR = os.path.join(PROJECT_DIR, 'verification_screens')
os.makedirs(BRAIN_DIR, exist_ok=True)
os.makedirs(VERIF_DIR, exist_ok=True)

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
                raise ConnectionResetError('CDP closed')
            buf.extend(chunk)
        return buf

def capture_screenshot(cdp, filepath):
    res = cdp.send("Page.captureScreenshot", {"format": "png"})
    data = base64.b64decode(res['result']['data'])
    with open(filepath, 'wb') as f:
        f.write(data)
    print(f"Captured: {filepath}")

def main():
    port = 9445
    profile_dir = os.path.join(PROJECT_DIR, '.browser_profile_circular_btns')
    os.makedirs(profile_dir, exist_ok=True)

    proc = subprocess.Popen([
        BROWSER_BIN,
        '--headless=new',
        f'--remote-debugging-port={port}',
        f'--user-data-dir={profile_dir}',
        '--no-first-run',
        '--disable-gpu',
        '--window-size=1280,900',
        'about:blank'
    ])

    time.sleep(1.2)
    try:
        import urllib.request
        with urllib.request.urlopen(f'http://127.0.0.1:{port}/json') as resp:
            tabs = json.loads(resp.read().decode('utf-8'))
        ws_url = tabs[0]['webSocketDebuggerUrl']
        path = ws_url.split(f':{port}')[1]

        cdp = CDP('127.0.0.1', port, path)
        cdp.send("Page.enable")
        cdp.send("DOM.enable")
        cdp.send("Runtime.enable")

        # Navigate to local server
        url = 'http://localhost:8088'
        print(f"Navigating to {url}...")
        cdp.send("Page.navigate", {"url": url})
        time.sleep(2.0)

        # Verify buttons in DOM
        check_expr = """
        (() => {
            const btnInv = document.querySelector('.btn-invitation');
            const btnVen = document.querySelector('.btn-venue');
            const getBox = el => {
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return { x: r.x, y: r.y, width: r.width, height: r.height };
            };
            return {
                btnInv: btnInv ? {
                    exists: true,
                    text: btnInv.innerText.replace(/\\s+/g, ' '),
                    ariaLabel: btnInv.getAttribute('aria-label'),
                    rect: getBox(btnInv)
                } : null,
                btnVen: btnVen ? {
                    exists: true,
                    text: btnVen.innerText.replace(/\\s+/g, ' '),
                    href: btnVen.getAttribute('href'),
                    target: btnVen.getAttribute('target'),
                    rect: getBox(btnVen)
                } : null
            };
        })()
        """
        eval_res = cdp.send("Runtime.evaluate", {"expression": check_expr, "returnByValue": True})
        print("RAW eval_res:", eval_res)
        val = eval_res.get('result', {}).get('result', {}).get('value', {})
        print("DOM Buttons Status:", json.dumps(val, indent=2))
        assert val['btnInv'] and val['btnInv']['exists'], "Invitation button not found!"
        assert val['btnVen'] and val['btnVen']['exists'], "Venue button not found!"
        assert val['btnVen']['href'] == 'https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9', f"Unexpected venue href: {val['btnVen']['href']}"

        # 1. Desktop Screenshot of Hero with Circular Buttons
        out_desk = os.path.join(BRAIN_DIR, 'website_hero_circular_buttons_desktop.png')
        capture_screenshot(cdp, out_desk)
        capture_screenshot(cdp, os.path.join(VERIF_DIR, 'website_hero_circular_buttons_desktop.png'))

        # 2. Hover over invitation button
        inv_rect = val['btnInv']['rect']
        hx = inv_rect['x'] + inv_rect['width'] / 2
        hy = inv_rect['y'] + inv_rect['height'] / 2
        cdp.send("Input.dispatchMouseEvent", {"type": "mouseMoved", "x": hx, "y": hy})
        time.sleep(0.5)

        out_hover = os.path.join(BRAIN_DIR, 'website_hero_circular_buttons_hover.png')
        capture_screenshot(cdp, out_hover)
        capture_screenshot(cdp, os.path.join(VERIF_DIR, 'website_hero_circular_buttons_hover.png'))

        # 3. Mobile iPhone 12/13/14 (390x844) Viewport Simulation
        cdp.send("Emulation.setDeviceMetricsOverride", {
            "width": 390,
            "height": 844,
            "deviceScaleFactor": 2.0,
            "mobile": True
        })
        time.sleep(0.8)

        out_mob = os.path.join(BRAIN_DIR, 'website_hero_circular_buttons_mobile_390x844.png')
        capture_screenshot(cdp, out_mob)
        capture_screenshot(cdp, os.path.join(VERIF_DIR, 'website_hero_circular_buttons_mobile_390x844.png'))

        print("All website circular button verification screenshots captured successfully!")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except Exception:
            proc.kill()

if __name__ == '__main__':
    main()
