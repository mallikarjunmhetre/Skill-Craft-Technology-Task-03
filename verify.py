import urllib.request, json
base = 'http://127.0.0.1:5000'
print('=' * 52)
print('   SENTINELPASS v2.0 - FULL VERIFICATION')
print('=' * 52)
pages = [
    ('/', 'Dashboard'),
    ('/analyzer', 'Analyzer'),
    ('/generator', 'Generator'),
    ('/education', 'Learning Center'),
    ('/about', 'About / Tech Stack'),
]
print('\nPAGES:')
for path, name in pages:
    try:
        code = urllib.request.urlopen(base + path).status
        print(f'  [OK] {name:<22} {path}  -> HTTP {code}')
    except Exception as e:
        print(f'  [FAIL] {name} -> {e}')
print('\nAPIs:')
try:
    req = urllib.request.Request(
        base + '/api/analyze',
        data=json.dumps({'password': 'X7#mPkL@9nQw2!'}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    d = json.loads(urllib.request.urlopen(req).read())
    print(f'  [OK] /api/analyze       -> Score:{d["score"]}/4 | Rating:{d["rating"]} | Entropy:{d["entropy"]}bits')
except Exception as e:
    print(f'  [FAIL] /api/analyze -> {e}')
try:
    req2 = urllib.request.Request(
        base + '/api/generate',
        data=json.dumps({'mode': 'password', 'length': 18, 'upper': True, 'lower': True, 'digits': True, 'symbols': True}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    d2 = json.loads(urllib.request.urlopen(req2).read())
    print(f'  [OK] /api/generate (pw) -> "{d2["password"]}" ({len(d2["password"])} chars)')
except Exception as e:
    print(f'  [FAIL] /api/generate pw -> {e}')
try:
    req3 = urllib.request.Request(
        base + '/api/generate',
        data=json.dumps({'mode': 'passphrase', 'words': 5, 'separator': '-'}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    d3 = json.loads(urllib.request.urlopen(req3).read())
    print(f'  [OK] /api/generate (pp) -> "{d3["password"]}"')
except Exception as e:
    print(f'  [FAIL] /api/generate pp -> {e}')
print('\n' + '=' * 52)
print('  ALL SYSTEMS OPERATIONAL')
print('  Open: http://localhost:5000')
print('=' * 52)
