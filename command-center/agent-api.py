#!/usr/bin/env python3
"""
Ada Inc. Command Center - Agent API Bridge
Listens on localhost and triggers OpenClaw agent
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import subprocess
import os

PORT = 18900

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/chat':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body)
            
            message = data.get('message', '')
            agent = data.get('agent', 'ada')
            
            if message:
                # Call OpenClaw agent via CLI
                result = subprocess.run(
                    ['openclaw', 'agent', '--message', message, '--session-id', 'agent:main:main:command-center'],
                    capture_output=True,
                    text=True,
                    timeout=60
                )
                
                response = {
                    'success': True,
                    'message': message,
                    'response': result.stdout[:2000] if result.stdout else 'Processing...',
                    'agent': agent
                }
            else:
                response = {'success': False, 'error': 'Empty message'}
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_GET(self):
        if self.path == '/status':
            status = {
                'ada': {'status': 'online', 'emoji': '🦞'},
                'kent': {'status': 'idle', 'emoji': '📢'},
                'scout': {'status': 'idle', 'emoji': '🎯'},
                'pulse': {'status': 'online', 'emoji': '💬'},
                'forge': {'status': 'offline', 'emoji': '🔧'}
            }
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(status).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    print(f"🚀 Ada Inc. API Bridge starting on port {PORT}")
    server = HTTPServer(('127.0.0.1', PORT), Handler)
    print(f"✅ Ready! Connect from dashboard at http://127.0.0.1:{PORT}")
    server.serve_forever()
