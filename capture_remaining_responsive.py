import subprocess
import time
import os

CHROME = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
BRAIN_DIR = r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a'

targets = [
    ('responsive_430x932.png', 430, 932),
    ('responsive_1366x768.png', 1366, 768)
]

for name, w, h in targets:
    out_p = os.path.join(BRAIN_DIR, name)
    cmd = [
        CHROME,
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--run-all-compositor-stages-before-draw',
        f'--window-size={w},{h}',
        f'--screenshot={out_p}',
        'http://localhost:8088/index.html?state=namaste'
    ]
    subprocess.run(cmd, capture_output=True)
    if os.path.exists(out_p):
        print(f"Captured {name}: {os.path.getsize(out_p)} bytes")
    else:
        print(f"Failed to capture {name}")
