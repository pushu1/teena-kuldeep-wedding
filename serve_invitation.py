import os
import sys
from http.server import SimpleHTTPRequestHandler, HTTPServer

PROJECT_DIR = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'

class WeddingInvitationHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Set proper PDF headers so browsers open PDF directly inline in the browser
        if self.path.lower().endswith('.pdf'):
            self.send_header('Content-Type', 'application/pdf')
            self.send_header('Content-Disposition', 'inline')
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

def run_server(port=8080):
    os.chdir(PROJECT_DIR)
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, WeddingInvitationHandler)
    print(f"Luxury Wedding Invitation Server running at http://127.0.0.1:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    run_server(port)
