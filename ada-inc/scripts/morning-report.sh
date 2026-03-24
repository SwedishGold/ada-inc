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
")

# Skapa rapport
cat > /tmp/morning-report.txt << 'REPORT'
ADA INC. - MORGONRAPPORT
=========================
Datum: $(date +"%d %b %Y kl %H:%M")

X STATS
-------
STATS_PLACEHOLDER

MORGON-POST
-----------
Content bank posts remaining: TBD

TRENDE
------
Followers today: +TBD

SKICKAT AV ADA CEO
REPORT

# Ersätt placeholder
sed -i "s/STATS_PLACEHOLDER/$STATS/" /tmp/morning-report.txt

# Skicka mail
gog gmail send --to "Andreas.guldberg@gmail.com" --subject "🦞 Ada Morgonrapport - $(date +'%d %b %Y')" --body-file /tmp/morning-report.txt 2>/dev/null

echo "Morgonrapport skickad: $(date)"
