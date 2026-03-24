#!/bin/bash
# Kent - Video Marketing (Mån, Ons, Fre 16:00)
# Postar video clips via X browser automation

DATE=$(date +%Y-%m-%d)
echo "=== Kent Video $(date) ===" >> /Users/gggggg/.openclaw/workspace/standups/kent-$DATE.md

# Kolla om det finns clips att posta
if [ -d "$HOME/Downloads/Vugola-Clips" ]; then
  LATEST=$(ls -t $HOME/Downloads/Vugola-Clips/*/*.mp4 2>/dev/null | head -1)
  if [ -n "$LATEST" ]; then
    echo "Found clip: $LATEST" >> /Users/gggggg/.openclaw/workspace/standups/kent-$DATE.md
    echo "NOTICE: Manual post required - browser automation needed" >> /Users/gggggg/.openclaw/workspace/standups/kent-$DATE.md
  fi
fi
echo "✅ Kent done"
