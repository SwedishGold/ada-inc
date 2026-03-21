#!/bin/bash
# Ada Inc - Analytics & Reflection Script
# Körs varje morgon: Analyserar gårdagens posts + lär
echo "=== Analytics Reflection $(date) ==="

LOG_FILE="/Users/gggggg/.openclaw/workspace/ada-inc/analytics/daily-reflection.md"
TEMP_LOG="/tmp/ada-reflection-temp.txt"

# Importera data från gårdagen (placeholder - vi loggar manuellt just nu)
YESTERDAY=$(date -v-1d +%Y-%m-%d)

# Auto-analys källor:
# 1. X API för att hämta senaste posts + engagement
# 2. Logga till analytics

cat >> "$LOG_FILE" << HEADER
---
## Reflection: $YESTERDAY

### Schema:
1. Vilka posts gick ut?
2. Vad fick mest engagement?
3. Vad fungerade?
4. Vad fungerade INTE?
5. Imorgon: Gör mer av det som funkar

HEADER

# Output
echo "✅ Daily reflection log updated: $LOG_FILE"
echo "💡 Imorgon: Checka analytics, lägg till vad som fungerade!"
