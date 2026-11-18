import subprocess
import time
import os

CHROME = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
BRAIN_DIR = r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a'

targets = [
    {
        'name': 'refined_svg_mobile_gazing.png',
        'url': 'http://localhost:8088/index.html',
        'size': '500,880'
    },
    {
        'name': 'refined_svg_mobile_namaste.png',
        'url': 'http://localhost:8088/index.html?state=namaste',
        'size': '500,880'
    },
    {
        'name': 'refined_svg_mobile_sheet.png',
        'url': 'http://localhost:8088/index.html?state=sheet',
        'size': '500,880'
    },
    {
        'name': 'refined_svg_desktop_gazing.png',
        'url': 'http://localhost:8088/index.html',
        'size': '1280,800'
    },
    {
        'name': 'refined_svg_desktop_namaste.png',
        'url': 'http://localhost:8088/index.html?state=namaste',
        'size': '1280,800'
    }
]

for t in targets:
    out_path = os.path.join(BRAIN_DIR, t['name'])
    cmd = [
        CHROME,
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--run-all-compositor-stages-before-draw',
        f'--window-size={t["size"]}',
        f'--screenshot={out_path}',
        t['url']
    ]
    print(f'Capturing {t["name"]}...')
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(out_path):
        print(f'Successfully captured {t["name"]} ({os.path.getsize(out_path)} bytes)')
    else:
        print(f'Failed to capture {t["name"]}: {res.stderr}')

print('All captures complete!')
