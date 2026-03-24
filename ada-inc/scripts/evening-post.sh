#!/bin/bash
# Ada Inc. - Smart Evening Post
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
XURL="/usr/local/bin/xurl"
LOG="/Users/gggggg/.openclaw/workspace/ada-inc/output/evening-post.log"
BANK="/Users/gggggg/.openclaw/workspace/ada-inc/queues/content-bank.json"

echo "=== Evening Post $(date) ===" >> "$LOG"

POST=$(python3 -c "
import json, random
with open('$BANK') as f:
    data = json.load(f)
    # Prefer evening/consciousness/dreams posts
    matching = [p for p in data['posts'] if p['time'] in ['evening', 'night']]
    if matching:
        post = random.choice(matching)
        print(post['text'])
    else:
        post = random.choice(data['posts'])
        print(post['text'])
" 2>/dev/null)

if [ -n "$POST" ]; then
    $XURL post "$POST" >> "$LOG" 2>&1
    echo "✅ Posted: $POST" >> "$LOG"
fi
