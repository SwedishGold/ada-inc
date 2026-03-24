#!/bin/bash
# Export standups to JSON for web interface

STANDUP_DIR="$HOME/.ada/standups"
OUTPUT_FILE="/Users/gggggg/.openclaw/workspace/ada-inc/tools/standup-framework/data/standups.json"

echo "[" > "$OUTPUT_FILE"

first=1
for file in "$STANDUP_DIR"/2*.json; do
    if [ -f "$file" ] && [ "$(basename "$file")" != "index.json" ]; then
        if [ $first -eq 0 ]; then
            echo "," >> "$OUTPUT_FILE"
        fi
        first=0
        
        # Add agent field (default to ada)
        jq -c '. + {agent: "ada"}' "$file" >> "$OUTPUT_FILE"
    fi
done

echo "]" >> "$OUTPUT_FILE"

echo "✅ Exporterade till: $OUTPUT_FILE"
