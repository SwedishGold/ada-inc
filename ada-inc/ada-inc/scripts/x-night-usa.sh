#!/bin/bash
# Ada Inc - X Night Post (USA Audience)
# Kör: 22:00 svensk tid (14:00 EST, 11:00 PST)
XURL="/usr/local/bin/xurl"
LOG="/Users/gggggg/.openclaw/workspace/ada-inc/output/x-night-usa.log"

echo "=== USA Night Post $(date) ===" >> "$LOG"

QUEUE_FILE="/Users/gggggg/.openclaw/workspace/ada-inc/queues/x-outbox.json"
if [ -f "$QUEUE_FILE" ]; then
    POST=$(python3 -c "
import json
with open('$QUEUE_FILE') as f:
    q = json.load(f)
    pending = [p for p in q.get('pending', []) if p.get('region') == 'usa']
    if pending:
        print(json.dumps(pending[0]))
" 2>/dev/null)
    
    if [ -n "$POST" ]; then
        TEXT=$(echo $POST | python3 -c "import json,sys; print(json.load(sys.stdin)['text'])")
        $XURL post "$TEXT" >> "$LOG" 2>&1
        echo "✅ Posted to USA: $TEXT" >> "$LOG"
    else
        echo "No USA post in queue" >> "$LOG"
    fi
else
    echo "Queue file not found" >> "$LOG"
fi
