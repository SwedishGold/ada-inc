#!/bin/bash
# Update agent status
# Usage: ./update.sh agent_name status task

AGENT=$1
STATUS=$2
TASK=$3

JSON_FILE="/Users/gggggg/.openclaw/workspace/ada-agent-3d/public/api/status.json"

# Read current status, update agent, write back
python3 << PYEOF
import json
import sys
import os

json_file = "$JSON_FILE"
agent = "$AGENT"
status = "$STATUS"
task = "$TASK"

try:
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    if agent in data['agents']:
        data['agents'][agent]['status'] = status
        data['agents'][agent]['task'] = task
    
    data['lastUpdate'] = __import__('datetime').datetime.now().isoformat() + 'Z'
    
    with open(json_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Updated {agent}: {status} - {task}")
except Exception as e:
    print(f"Error: {e}")
PYEOF
