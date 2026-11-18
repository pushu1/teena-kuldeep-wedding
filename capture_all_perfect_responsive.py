import subprocess
import time
import urllib.request
import json
import base64
import os
import socket

CHROME = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
BRAIN_DIR = r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a'

targets = [
    ('responsive_360x800_verified.png', 360, 800, True),
    ('responsive_390x844_verified.png', 390, 844, True),
    ('responsive_430x932_verified.png', 430, 932, True),
    ('responsive_1366x768_verified.png', 1366, 768, False)
]

proc = subprocess.Popen([
    CHROME,
    '--headless=new',
    '--remote-debugging-port=9231',
    '--no-sandbox',
    '--disable-gpu',
    'about:blank'
])
time.sleep(1.5)

try:
    with urllib.request.urlopen('http://127.0.0.1:9231/json/list') as r:
        pages = json.loads(r.read())
        ws_url = pages[0]['webSocketDebuggerUrl']
        path = ws_url.split('9231')[1]

    s = socket.create_connection(('127.0.0.1', 9231))
    key = base64.b64encode(os.urandom(16)).decode('utf-8')
    req = f'GET {path} HTTP/1.1\r\nHost: 127.0.0.1:9231\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n'
    s.sendall(req.encode('utf-8'))
    resp = s.recv(4096).decode('utf-8')
    msg_id = [0]

    def send_cmd(method, params=None):
        msg_id[0] += 1
        current_id = msg_id[0]
        payload = json.dumps({'id': current_id, 'method': method, 'params': params or {}}).encode('utf-8')
        length = len(payload)
        mask = os.urandom(4)
        h = bytearray([0x81, 0x80 | length]) if length < 126 else bytearray([0x81, 0x80 | 126]) + length.to_bytes(2, 'big')
        h += mask
        masked = bytearray(b ^ mask[i % 4] for i, b in enumerate(payload))
        s.sendall(h + masked)
        
        target = f'"id":{current_id}'
        buf = bytearray()
        while True:
            chunk = s.recv(4096)
            buf += chunk
            if target.encode('utf-8') in buf and b'"result"' in buf:
                idx = buf.find(target.encode('utf-8'))
                start = buf.rfind(b'{', 0, idx)
                if start != -1:
                    raw = buf[start:]
                    end = raw.rfind(b'}')
                    if end != -1:
                        try:
                            return json.loads(raw[:end+1].decode('utf-8'))
                        except:
                            pass

    for fname, w, h, is_mobile in targets:
        send_cmd('Emulation.setDeviceMetricsOverride', {
            'width': w,
            'height': h,
            'deviceScaleFactor': 1,
            'mobile': is_mobile
        })
        send_cmd('Page.navigate', {'url': 'http://localhost:8088/index.html?state=namaste'})
        time.sleep(1.0)
        
        res = send_cmd('Page.captureScreenshot', {'format': 'png'})
        png_data = base64.b64decode(res['result']['data'])
        out_p = os.path.join(BRAIN_DIR, fname)
        with open(out_p, 'wb') as f:
            f.write(png_data)
        print(f"Captured {fname} ({w}x{h}) -> {len(png_data)} bytes")

finally:
    proc.terminate()
print("All responsive captures done!")
