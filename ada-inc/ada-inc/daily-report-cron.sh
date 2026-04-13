#!/bin/bash
set -e
DATE=$(date +%Y-%m-%d)
REPORT_DIR="/tmp/ada-inc-rapport-${DATE}.pdf"
python3 ~/.openclaw/workspace/ada-inc/daily-report-pdf.py 2>/dev/null
gog gmail send --to andreas.guldberg@gmail.com --subject "🦞 Ada Inc. Daglig Rapport - ${DATE}" --body "Hej Andreas! Här är din dagliga CEO-rapport från Ada Inc. Med vänliga hälsningar, Ada 🦞 CEO, Ada Inc." --attach "${REPORT_DIR}" 2>/dev/null
echo "✅ Rapport skickad"
