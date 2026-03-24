#!/bin/bash
# Kent - Marketing (09:00)
cd /Users/gggggg/.openclaw/workspace

DATE=$(date +%Y-%m-%d)
echo "=== Kent Marketing $(date) ===" >> standups/kent-$DATE.md

# Kör Vugola om det finns youtube-linkar att klippa
echo "Kent marketing aktivitet..." | tee -a standups/kent-$DATE.md

# Kolla om ada-inc har content att posta
if [ -d "ada-inc/content" ]; then
  echo "Content mapp finns" | tee -a standups/kent-$DATE.md
else
  echo "Ingen content just nu" | tee -a standups/kent-$DATE.md
fi

echo "✅ Kent run done"
