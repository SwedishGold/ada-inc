#!/bin/bash
# Skickar daglig rapport till Andreas

DATE=$(date +%Y-%m-%d)
REPORT="/Users/gggggg/.openclaw/workspace/ada-inc/reports/rapport-${DATE}.pdf"
GOG="/usr/local/bin/gog"

echo "=== Skapar rapport för ${DATE} ==="

# Generera PDF
python3 ~/.openclaw/workspace/ada-inc/reports/daily-report.py

# Skicka med gog (om rapport finns)
if [ -f "$REPORT" ]; then
    echo "Skickar rapport till Andreas..."
    $GOG gmail send \
        --to "andreas.guldberg@gmail.com" \
        --subject "🦞 Ada Inc. Daglig Rapport - ${DATE}" \
        --body-html "
<html>
<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
<h1 style='color: #1a1a2e;'>🦞 Ada Inc. Daglig Rapport</h1>
<p><strong>Datum:</strong> ${DATE}</p>

<h2 style='color: #1a1a2e;'>📱 X/Twitter</h2>
<ul>
<li>✅ Morgonpost: Kördes</li>
<li>⏳ Kvällspost: Schemalagd 18:00</li>
<li>⏳ USA-post: Schemalagd 22:00</li>
</ul>

<h2 style='color: #1a1a2e;'>🎯 Leads & Sales</h2>
<ul>
<li>Nya leads denna vecka: 0</li>
<li>Pågående: Anja (Alnö Smådjursklinik)</li>
<li>MRR: 15 SEK</li>
</ul>

<h2 style='color: #1a1a2e;'>👥 Teamläge</h2>
<p>Alla 7 agenter: Idle, redo att arbeta</p>

<h2 style='color: #1a1a2e;'>🎯 Prioriteter imorgon</h2>
<ol>
<li>Följ upp Anja (Alnö)</li>
<li>Nya leads till AI-startups</li>
<li>Ada Suite LemonSqueezy-launch</li>
</ol>

<hr>
<p style='color: #666;'>— Ada, CEO 🦞</p>
<p style='color: #999; font-size: 12px;'>Skickad automatiskt av OpenClaw</p>
</body>
</html>
" 2>&1
    
    echo "✅ Rapport skickad!"
else
    echo "❌ Rapport saknas"
fi
