import urllib.request
import time

url = f'https://pushu1.github.io/param-pummy-wedding/?t={int(time.time())}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache'})

try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        print('HTTP Status:', resp.status)
        print('Last-Modified:', resp.headers.get('Last-Modified'))
        print('ETag:', resp.headers.get('ETag'))
        raw = resp.read()
        content = raw.decode('utf-8', errors='ignore')
        print('Content Length:', len(content))
        print('Titles found:', [l.strip() for l in content.splitlines() if 'title' in l.lower()][:3])
        print('Has <div id="root">:', '<div id="root">' in content)
        print('Has app.js:', 'app.js' in content)
        print('Has Teena:', 'Teena' in content or 'TEENA' in content)
        print('Has Naina:', 'Naina' in content or 'NAINA' in content)
        print('Has Adigaud:', 'Adigaud' in content or 'ADIGAUD' in content)
        print('Has Vajpayee:', 'Vajpayee' in content or 'VAJPAYEE' in content)
except Exception as e:
    print('Request error:', e)
