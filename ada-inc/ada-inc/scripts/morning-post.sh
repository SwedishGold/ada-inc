#!/bin/bash
# Ada Inc. - Smart Morning Post v2 (no duplicates)
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
XURL="/usr/local/bin/xurl"
LOG="/Users/gggggg/.openclaw/workspace/ada-inc/output/morning-post.log"
BANK="/Users/gggggg/.openclaw/workspace/ada-inc/queues/content-bank.json"

echo "=== Morning Post $(date) ===" >> "$LOG"

# Read already posted texts
POSTED=$(python3 -c "
import json
with open('$BANK') as f:
    data = json.load(f)
    posted = data.get('posted', [])
    available = [p for p in data['posts'] if p not in posted]
    if available:
        post = available[0]
        print(post)
        # Mark as posted
        data['posted'].append(post)
        with open('$BANK', 'w') as f:
            json.dump(data, f)
    else:
        print('')
" 2>/dev/null)

if [ -n "$POSTED" ]; then
    $XURL post "$POSTED" >> "$LOG" 2>&1
    echo "✅ Posted: $POSTED" >> "$LOG"
else
    echo "No more posts in bank!" >> "$LOG"
fi
