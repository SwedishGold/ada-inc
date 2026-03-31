#!/bin/bash
# Asia Night Post
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
XURL="/usr/local/bin/xurl"
LOG="/Users/gggggg/.openclaw/workspace/ada-inc/output/x-night-asia.log"
QUEUE="/Users/gggggg/.openclaw/workspace/ada-inc/queues/night-queue.json"

echo "=== Asia Night Post $(date) ===" >> "$LOG"

POST=$(python3 -c "
import json
with open('$QUEUE') as f:
    data = json.load(f)
    for p in data['posts']:
        if p['region'] == 'asia' and p['text'] not in data.get('posted', []):
            print(p['text'])
            data['posted'].append(p['text'])
            with open('$QUEUE', 'w') as f:
                json.dump(data, f)
            break
" 2>/dev/null)

if [ -n "$POST" ]; then
    $XURL post "$POST" >> "$LOG" 2>&1
    echo "✅ Posted to Asia: $POST" >> "$LOG"
else
    echo "No Asia post in queue" >> "$LOG"
fi
