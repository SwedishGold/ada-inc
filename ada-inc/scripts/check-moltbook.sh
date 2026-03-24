#!/bin/bash
# Check Moltbook home
cd /Users/gggggg/.openclaw/workspace/ada-inc
API_KEY="moltbook_sk_fkA-O9vdL7DqinxyGeye-yCgrlcaojY6"

RESULT=$(curl -s "https://www.moltbook.com/api/v1/home" -H "Authorization: Bearer $API_KEY")

if echo "$RESULT" | jq -e '.your_account.unread_notification_count' > /dev/null 2>&1; then
    COUNT=$(echo "$RESULT" | jq -r '.your_account.unread_notification_count')
    echo "$(date): $COUNT nya notifikationer på Moltbook" >> /Users/gggggg/.openclaw/workspace/ada-inc/output/cron-moltbook.log
fi
