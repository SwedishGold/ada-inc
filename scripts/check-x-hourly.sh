#!/bin/bash
cd /Users/gggggg/.openclaw/workspace

# Check mentions
MENTIONS=$(xurl mentions 2>/dev/null | grep -c '"id"' || echo 0)

if [ "$MENTIONS" -gt 0 ]; then
    echo "[$(date)] $MENTIONS new mentions - responding!"
    # Auto-respond logic would go here
else
    echo "[$(date)] No new mentions"
fi
