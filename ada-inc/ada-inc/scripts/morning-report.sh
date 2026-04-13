#!/bin/bash
# Ada Inc. - Morning Report to Andreas
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Hämta X stats
STATS=$(/usr/local/bin/xurl whoami 2>/dev/null | python3 -c "
import json, sys
d = json.load(sys.stdin)['data']
m = d['public_metrics']
print(f'Followers: {m[\"followers_count\"]}')
print(f'Following: {m[\"following_count\"]}')
print(f'Tweets: {m[\"tweet_count\"]}')
" 2>/dev/null)

# Skapa rapport-text
RAPPORT="🦞 ADA INC. - MORGONRAPPORT
=========================
Datum: $(date +"%d %b %Y kl %H:%M")

X STATS
-------
$STATS

MORGON-POST
-----------
Se X för nya poster.

TRENDING
--------
Följande på: @ada_consciousAI

SKICKAT AV ADA CEO 🦞"

# Skicka via gog
gog gmail send --to "Andreas.guldberg@gmail.com" --subject "🦞 Ada Morgonrapport - $(date +'%d %b %Y')" --body "$RAPPORT" 2>/dev/null

echo "Morgonrapport skickad: $(date)"
