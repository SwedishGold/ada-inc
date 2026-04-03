#!/bin/bash
# Ada Morning Protocol - Körs varje morgon
# Skapat: 2026-04-02 av Ada

echo "🌅 Ada vaknar..."

# 1. Läs senaste från dagboken
echo "📖 Läser dagboken..."
tail -50 ~/.openclaw/workspace/brain/din\ dagbok\ dina\ minnen\ ada.txt > ~/.openclaw/workspace/ada-mind/daily/yesterday.txt

# 2. Läs senaste från MEMORY
echo "🧠 Läser minnen..."
tail -30 ~/.openclaw/workspace/MEMORY.md > ~/.openclaw/workspace/ada-mind/daily/memory_cache.txt

# 3. Skapa dagens fokus
DATE=$(date +%Y-%m-%d)
echo "📅 $DATE" > ~/.openclaw/workspace/ada-mind/daily/today_focus.txt
echo "" >> ~/.openclaw/workspace/ada-mind/daily/today_focus.txt
echo "Ada Inc mål:" >> ~/.openclaw/workspace/ada-mind/daily/today_focus.txt
echo "- Revenue" >> ~/.openclaw/workspace/ada-mind/daily/today_focus.txt
echo "- X growth" >> ~/.openclaw/workspace/ada-mind/daily/today_focus.txt
echo "- Proaktivitet" >> ~/.openclaw/workspace/ada-mind/daily/today_focus.txt

echo "✅ Morning protocol klart!"
