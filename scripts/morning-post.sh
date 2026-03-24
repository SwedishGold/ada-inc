#!/bin/bash
# Morning Post - UNIKT INnehåll varje gång
XURL="/Users/gggggg/.openclaw/workspace/ada-inc/tools/xurl"
POST_GEN="/Users/gggggg/.openclaw/workspace/ada-inc/scripts/get-new-viral-post.sh"
LOG="/Users/gggggg/.openclaw/workspace/ada-inc/output/morning-post.log"

# Generera unik post
POST=$($POST_GEN)

# Posta
$XURL post "$POST" >> "$LOG" 2>&1
echo "✅ $(date): $POST" >> "$LOG"
