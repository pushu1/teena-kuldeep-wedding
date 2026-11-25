import urllib.request
import json

def fetch_api(endpoint):
    url = f"https://api.github.com/repos/pushu1/param-pummy-wedding/{endpoint}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Antigravity-Agent'})
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return {'status': e.code, 'reason': e.reason, 'body': e.read().decode()}

print("--- Repository Info ---")
repo = fetch_api('')
print("Default Branch:", repo.get('default_branch'))
print("Has Pages:", repo.get('has_pages'))

print("\n--- Pages Info ---")
pages = fetch_api('pages')
print(pages)

print("\n--- Recent Workflow Runs ---")
runs = fetch_api('actions/runs')
if 'workflow_runs' in runs:
    for r in runs['workflow_runs'][:5]:
        print(f"Run {r['id']}: {r['name']} - Status: {r['status']} - Conclusion: {r['conclusion']} - Commit: {r['head_sha'][:7]} - Event: {r['event']}")
else:
    print(runs)
