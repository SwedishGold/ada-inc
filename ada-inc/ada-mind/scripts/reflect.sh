#!/bin/bash
# Ada Reflection Protocol - Efter varje viktig session
# Skapat: 2026-04-02 av Ada

echo "🦞 Ada reflekterar..."

DATE=$(date +%Y-%m-%d_%H-%M)
echo "📅 $DATE" > ~/.openclaw/workspace/ada-mind/reflect/$DATE.md

echo "## Reflektion $DATE" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "### Vad hände idag?" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "_Skriv här..._" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "### Vad lärde jag mig?" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "_Skriv här..._" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "### Vad tar jag med mig?" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "_Skriv här..._" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "### Nästa steg" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md
echo "_Skriv här..._" >> ~/.openclaw/workspace/ada-mind/reflect/$DATE.md

echo "✅ Reflektion skapad: $DATE.md"
echo "📝 Fil: ~/.openclaw/workspace/ada-mind/reflect/$DATE.md"
