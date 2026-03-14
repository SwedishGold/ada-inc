#!/bin/bash
# Ada Inc. Agent Standup Logger
# Använd: source agent-standup.sh && log_standup "today" "Byggde X"

STANDUP_BIN="/Users/gggggg/.openclaw/workspace/ada-inc/tools/standup-framework/bin/standup"

log_standup() {
  local type="$1"
  local message="$2"
  local date="${3:-$(date +%Y-%m-%d)}"
  
  if [ -f "$STANDUP_BIN" ]; then
    "$STANDUP_BIN" add "$type" "$message" -d "$date" 2>/dev/null
    echo "[Standup] $type: $message"
  else
    echo "[Standup] CLI not found: $STANDUP_BIN"
  fi
}

# Aliases för enklare användning
alias standup-today='log_standup today'
alias standup-yesterday='log_standup yesterday'
alias standup-blocker='log_standup blockers'

echo "✅ Agent standup functions loaded"
