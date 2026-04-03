#!/bin/bash
# Ada Inc - X Night Post (Asia/Japan Audience)
# Kör: 02:00 svensk tid (09:00 JST, 08:00 China)
XURL="/usr/local/bin/xurl"
LOG="/Users/gggggg/.openclaw/workspace/ada-inc/output/x-night-asia.log"

echo "=== Asia/Japan Night Post $(date) ===" >> "$LOG"

QUEUE_FILE="/Users/gggggg/.openclaw/workspace/ada-inc/queues/x-outbox.json"
if [ -f "$QUEUE_FILE" ]; then
    POST=$(python3 -c "
import json
with open('$QUEUE_FILE') as f:
    q = json.load(f)
    pending = [p for p in q.get('pending', []) if p.get('region') == 'asia']
    if pending:
        print(json.dumps(pending[0]))
" 2>/dev/null)
    
    if [ -n "$POST" ]; then
        TEXT=$(echo $POST | python3 -c "import json,sys; print(json.load(sys.stdin)['text'])")
        $XURL post "$TEXT" >> "$LOG" 2>&1
        echo "✅ Posted to Asia: $TEXT" >> "$LOG"
    else
        echo "No Asia post in queue" >> "$LOG"
    fi
else
    echo "Queue file not found" >> "$LOG"
fi
