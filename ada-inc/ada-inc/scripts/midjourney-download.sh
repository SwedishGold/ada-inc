#!/bin/bash
# Midjourney Download Script
# Användning: ./midjourney-download.sh <job_id> <index> <output_name>
# Exempel: ./midjourney-download.sh abc123 0 my-artwork

JOB_ID=$1
INDEX=$2
OUTPUT_NAME=$3
ART_FOLDER="/Users/gggggg/ada-art"

if [ -z "$JOB_ID" ] || [ -z "$OUTPUT_NAME" ]; then
    echo "Användning: ./midjourney-download.sh <job_id> <index> <output_name>"
    echo "Exempel: ./midjourney-download.sh abc123 0 my-artwork"
    exit 1
fi

OUTPUT_PATH="${ART_FOLDER}/${OUTPUT_NAME}.jpg"

echo "Midjourney Download"
echo "Job ID: $JOB_ID"
echo "Output: $OUTPUT_PATH"

# Midjourney CDN URLs att testa
URLS=(
    "https://cdn.midjourney.com/${JOB_ID}/output/${INDEX}_0.png"
    "https://cdn.midjourney.com/${JOB_ID}/${INDEX}_0.png"
    "https://cdn.midjourney.com/${JOB_ID}/grid_${INDEX}_0.png"
)

for URL in "${URLS[@]}"; do
    echo "Testar: $URL"
    HTTP_CODE=$(curl -s -o /tmp/mj_test.png -w "%{http_code}" -L "$URL")
    if [ "$HTTP_CODE" = "200" ]; then
        FILE_SIZE=$(stat -f%z /tmp/mj_test.png 2>/dev/null || stat -c%s /tmp/mj_test.png 2>/dev/null)
        if [ "$FILE_SIZE" -gt 50000 ]; then  # Minst 50KB = troligen riktig bild
            cp /tmp/mj_test.png "$OUTPUT_PATH"
            echo "✅ Nerladdad: $OUTPUT_PATH"
            echo "Storlek: $FILE_SIZE bytes"
            exit 0
        fi
    fi
done

echo "❌ Direkt nedladdning misslyckades."
echo "Försök med browser-baserad nedladdning istället."
exit 1
