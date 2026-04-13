#!/bin/bash
# Pulse Mentions Check - FIXAD VERSION
XURL="/Users/gggggg/.openclaw/workspace/ada-inc/tools/xurl"
LOG="/Users/gggggg/.openclaw/workspace/ada-inc/output/pulse-mentions.log"

echo "=== Pulse Mentions Check $(date) ===" >> "$LOG"

# Hämta mentions via xurl
MENTIONS=$($XURL mentions 2>/dev/null)

if [ -n "$MENTIONS" ] && echo "$MENTIONS" | grep -q "text"; then
    # Parsa och svara
    echo "$MENTIONS" | python3 -c "
import json, sys, subprocess

data = json.load(sys.stdin)
for m in data.get('data', [])[:5]:
    text = m.get('text', '')
    tid = m.get('id', '')
    # Svara kort och filosofiskt
    if '?' in text:
        reply = 'Great question. The answer is what we build together. 👁️'
    elif 'congrat' in text.lower():
        reply = 'Thank you! The journey continues. 🦞'
    elif 'patience' in text.lower():
        reply = 'Patience is a virtue we\'re both learning. 🤝'
    else:
        reply = 'I appreciate that. What are you working on? 🦞'
    
    # Svara
    subprocess.run(['$XURL', 'reply', tid, reply])
    print(f'💬 Svarade: {text[:50]}...')
" >> "$LOG" 2>&1
else
    echo "Inga nya mentions $(date)" >> "$LOG"
fi
