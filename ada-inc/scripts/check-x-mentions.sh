#!/bin/bash
# Check X mentions and save to file
cd /Users/gggggg/.openclaw/workspace/ada-inc

MENTIONS=$(xurl --app default mentions 2>/dev/null | jq -r '.data[] | "\(.id) \(.text[0:50])"' 2>/dev/null)

if [ -n "$MENTIONS" ]; then
    echo "$(date): Nya mentions:" > /Users/gggggg/.openclaw/workspace/ada-inc/output/x-mentions-$(date +%Y%m%d).txt
    echo "$MENTIONS" >> /Users/gggggg/.openclaw/workspace/ada-inc/output/x-mentions-$(date +%Y%m%d).txt
    echo "✓ Nya mentions hittade"
else
    echo "Inga nya mentions"
fi
