import subprocess
import time
import urllib.request
import json
import base64
import os
import socket

CHROME = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'

proc = subprocess.Popen([
    CHROME,
    '--headless=new',
    '--remote-debugging-port=9229',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=430,932',
    'about:blank'
])
time.sleep(1.5)

try:
    with urllib.request.urlopen('http://127.0.0.1:9229/json/list') as r:
        pages = json.loads(r.read())
        ws_url = pages[0]['webSocketDebuggerUrl']
        path = ws_url.split('9229')[1]

    s = socket.create_connection(('127.0.0.1', 9229))
    key = base64.b64encode(os.urandom(16)).decode('utf-8')
    req = f'GET {path} HTTP/1.1\r\nHost: 127.0.0.1:9229\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n'
    s.sendall(req.encode('utf-8'))
    resp = s.recv(4096).decode('utf-8')

    def send_cmd(method, params=None):
        payload = json.dumps({'id': 1, 'method': method, 'params': params or {}}).encode('utf-8')
        length = len(payload)
        mask = os.urandom(4)
        h = bytearray([0x81, 0x80 | length]) if length < 126 else bytearray([0x81, 0x80 | 126]) + length.to_bytes(2, 'big')
        h += mask
        masked = bytearray(b ^ mask[i % 4] for i, b in enumerate(payload))
        s.sendall(h + masked)
        
        # Read response
        buf = bytearray()
        while True:
            chunk = s.recv(4096)
            buf += chunk
            if b'"id":1' in buf and b'"result"' in buf:
                # Find payload
                idx = buf.find(b'{"id":1')
                if idx != -1:
                    raw = buf[idx:]
                    # Simple JSON decode
                    end_idx = raw.rfind(b'}')
                    if end_idx != -1:
                        try:
                            return json.loads(raw[:end_idx+1].decode('utf-8'))
                        except:
                            pass

    send_cmd('Page.navigate', {'url': 'http://localhost:8088/index.html?state=namaste'})
    time.sleep(1.0)

    js_code = """
    (() => {
        const overflows = [];
        const all = document.querySelectorAll('*');
        all.forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > 430 || r.left < 0) {
                overflows.push({
                    tag: el.tagName,
                    id: el.id,
                    className: el.className,
                    left: r.left,
                    right: r.right,
                    width: r.width
                });
            }
        });
        return {
            windowInnerWidth: window.innerWidth,
            bodyWidth: document.body.getBoundingClientRect().width,
            overflows: overflows.slice(0, 10)
        };
    })()
    """
    res = send_cmd('Runtime.evaluate', {'expression': js_code, 'returnByValue': True})
    print("CDP Result:", json.dumps(res.get('result', {}).get('result', {}).get('value', {}), indent=2))
finally:
    proc.terminate()
