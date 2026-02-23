#!/bin/bash
# Weekly Standup Summary Generator
# Körs varje fredag kl 18:00

STANDUP_BIN="/Users/gggggg/.openclaw/workspace/ada-inc/tools/standup-framework/bin/standup"
OUTPUT_FILE="/Users/gggggg/.openclaw/workspace/ada-inc/output/weekly-standup-$(date +%Y-%m-%d).md"

echo "# 📊 Ada Inc. - Veckans Standups" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**Vecka:** $(date +%Y-W%V)" >> "$OUTPUT_FILE"
echo "**Genererat:** $(date '+%Y-%m-%d %H:%M')" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Kör export och lägg till
$STANDUP_BIN export >> "$OUTPUT_FILE" 2>/dev/null

# Lägg till footer
echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "*Genererat av Ada Inc. Standup Framework*" >> "$OUTPUT_FILE"

echo "✅ Weekly summary skapad: $OUTPUT_FILE"

# Visa innehållet
cat "$OUTPUT_FILE"
