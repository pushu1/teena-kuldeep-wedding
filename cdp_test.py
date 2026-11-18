import socket
import os
import base64
import hashlib
import json
import time
import subprocess
import urllib.request

class SimpleWebSocket:
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
        # Masked client frame
        length = len(payload)
        mask_key = os.urandom(4)
        header = bytearray([0x81]) # text frame
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
            # Read first 2 bytes
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

    def close(self):
        self.sock.close()

# Test with headless chrome
CHROME = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
BRAIN_DIR = r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a'
proc = subprocess.Popen([
    CHROME,
    '--headless=new',
    '--remote-debugging-port=9225',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=430,932',
    'about:blank'
])
time.sleep(1.5)

try:
    with urllib.request.urlopen('http://127.0.0.1:9225/json/list') as r:
        pages = json.loads(r.read())
        ws_url = pages[0]['webSocketDebuggerUrl']
        # ws://127.0.0.1:9225/devtools/page/...
        path = ws_url.split('9225')[1]

    ws = SimpleWebSocket('127.0.0.1', 9225, path)
    
    # Navigate
    ws.send('Page.navigate', {'url': 'http://localhost:8088/index.html'})
    time.sleep(0.5)

    # Evaluate at 0.5s
    mid = ws.send('Runtime.evaluate', {'expression': 'document.body.className'})
    print('At 0.5s body class:', ws.recv(mid)['result']['result']['value'])

    # Wait until 2.5s (after the 2000ms timeout!)
    time.sleep(2.2)
    mid = ws.send('Runtime.evaluate', {'expression': 'document.body.className'})
    print('At 2.7s body class:', ws.recv(mid)['result']['result']['value'])

    # Take screenshot at 2.7s
    mid = ws.send('Page.captureScreenshot', {'format': 'png'})
    png_data = base64.b64decode(ws.recv(mid)['result']['data'])
    out_file = os.path.join(BRAIN_DIR, 'test_cdp_namaste.png')
    with open(out_file, 'wb') as f:
        f.write(png_data)
    print('Saved to:', out_file, 'size:', len(png_data))

    ws.close()
finally:
    proc.terminate()
