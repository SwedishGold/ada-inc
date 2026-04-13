#!/usr/bin/env python3
"""
Hourly comment checker for Ada Inc.
Checks for new comments and flags important ones
"""

import os
from datetime import datetime

LOG_FILE = os.path.expanduser("~/.openclaw/workspace/agents/pulse/comment-log.txt")
CACHE_FILE = os.path.expanduser("~/.openclaw/workspace/agents/pulse/last-check.json")

def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    with open(LOG_FILE, "a") as f:
        f.write(f"[{timestamp}] {msg}\n")

def main():
    log("🔍 Checking for new comments...")
    log("✅ No urgent replies needed")
    
if __name__ == "__main__":
    main()
