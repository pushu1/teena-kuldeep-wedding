import urllib.request
import time
import json
import pypdf

LIVE_URL = "https://pushu1.github.io/teena-kuldeep-wedding/"
print(f"Checking live deployment at: {LIVE_URL}")

max_attempts = 15
for attempt in range(1, max_attempts + 1):
    time.sleep(3)
    try:
        # Check index.html
        req = urllib.request.Request(LIVE_URL + "index.html", headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            has_teena = "TEENA" in html or "teena-kuldeep" in html
            
        # Check app.js
        req_js = urllib.request.Request(LIVE_URL + "app.js", headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req_js) as resp_js:
            js = resp_js.read().decode('utf-8', errors='ignore')
            has_chanda = "Chanda Devi" in js
            has_jasraj = "Jasraj" in js
            has_manju = "Manju Devi" in js
            has_adigaud = "Adigaud" in js

        print(f"Attempt {attempt}: index.html OK ({len(html)} bytes), app.js OK ({len(js)} bytes)")
        print(f"  has_teena: {has_teena}, has_chanda: {has_chanda}, has_jasraj: {has_jasraj}, has_adigaud: {has_adigaud}")

        if has_teena and has_chanda and has_jasraj and has_adigaud:
            print("\n[SUCCESS] Live website is FULLY DEPLOYED and serving the latest build!")
            break
    except Exception as e:
        print(f"Attempt {attempt}: {e}")
