#!/usr/bin/env python3
"""
Simple test server to verify clean URL routing works locally.
This simulates what Vercel does with the vercel.json routing rules.
"""

import http.server
import socketserver
import os
import re
from urllib.parse import urlparse

PORT = 8000

# Routing mapping (simulates vercel.json routes)
ROUTES = {
    '/about-us': '/about-us/index.html',
    '/contact': '/contact/index.html',
    '/disclosure': '/disclosure/index.html',
    '/privacy-policy': '/privacy-policy/index.html',
    '/terms-and-policies': '/terms-and-policies/index.html',
    '/treatments': '/treatments/index.html',
    '/treatments/eye-care': '/treatments/eye-care/index.html',
    '/treatments/weight-loss': '/treatments/weight-loss/index.html',
    '/treatments/anticoagulant': '/treatments/anticoagulant/index.html',
    '/treatments/asthma': '/treatments/asthma/index.html',
    '/treatments/antifungal': '/treatments/antifungal/index.html',
    '/treatments/fertility': '/treatments/fertility/index.html',
}

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the requested path
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        # Remove trailing slash if present (except for root)
        if path != '/' and path.endswith('/'):
            path = path.rstrip('/')

        # Check if this path needs to be routed to an HTML file
        if path in ROUTES:
            actual_file = ROUTES[path]
            # Check if the file exists
            if os.path.exists(actual_file):
                self.path = actual_file
            else:
                self.send_error(404, f"File not found: {actual_file}")
                return

        # Handle root path
        if path == '/':
            if os.path.exists('index.html'):
                self.path = 'index.html'
            else:
                self.send_error(404, "index.html not found")
                return

        # Call the parent handler to serve the file
        try:
            super().do_GET()
        except Exception as e:
            self.send_error(500, f"Server error: {str(e)}")

    def log_message(self, format, *args):
        # Custom logging to show clean URLs
        super().log_message(format, *args)
        if self.path in ROUTES:
            print(f"  -> Routed {self.path} to {ROUTES[self.path]}")

if __name__ == '__main__':
    print("🚀 Starting Clean URL Test Server...")
    print(f"📍 Server will run on http://localhost:{PORT}")
    print("📋 Clean URL routes configured:")
    for clean_url, actual_file in ROUTES.items():
        print(f"   {clean_url} -> {actual_file}")
    print("🏠 Root path / -> index.html")
    print("\n💡 Test these URLs:")
    print("   http://localhost:8000/")
    print("   http://localhost:8000/about-us")
    print("   http://localhost:8000/treatments")
    print("   http://localhost:8000/treatments/eye-care")
    print("\nPress Ctrl+C to stop the server\n")

    with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")
            httpd.shutdown()
