#!/bin/bash
# X-post med idempotency - Forge
# Forebygger dubbletter

POST_TEXT="$1"
IDEMPOTENCY_DIR="/Users/gggggg/.openclaw/workspace/ada-inc/data/idempotency"
mkdir -p "$IDEMPOTENCY_DIR"

# Skapa hash av texten som idempotency key
IDEMPOTENCY_KEY=$(echo -n "$POST_TEXT" | shasum | cut -d' ' -f1)
IDEMPOTENCY_FILE="${IDEMPOTENCY_DIR}/${IDEMPOTENCY_KEY}.json"

# Kolla om redan postat
if [ -f "$IDEMPOTENCY_FILE" ]; then
    echo "=== REDAN POSTAT: $(date) ==="
    echo "Idempotency key: $IDEMPOTENCY_KEY"
    cat "$IDEMPOTENCY_FILE"
    echo "Avbryter (forebygger dubblett)"
    exit 0
fi

# Posta
echo "Postar nytt inlagg..."
RESPONSE=$(xurl --app default post "$POST_TEXT" 2>&1)

# Spara resultatet
echo "{\"posted_at\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\", \"idempotency_key\": \"$IDEMPOTENCY_KEY\", \"response\": $RESPONSE}" > "$IDEMPOTENCY_FILE"

echo "✅ Postat och sparat med idempotency key: $IDEMPOTENCY_KEY"
cat "$IDEMPOTENCY_FILE"
