"""
Agent Bootstrap - Inspired by Stanford's Meta-Harness

Gathers environment snapshot before agent starts to eliminate exploration turns.
Based on: https://github.com/stanford-iris-lab/meta-harness-tbench2-artifact
"""

import asyncio
import json
import subprocess
from datetime import datetime
from pathlib import Path
from typing import Optional

class AgentBootstrap:
    """Gathers compact environment snapshot for agents."""
    
    @staticmethod
    async def gather_snapshot() -> str:
        """Gather environment snapshot - non-blocking."""
        try:
            # Run sysinfo collection in parallel
            pwd = subprocess.run(["pwd"], capture_output=True, text=True, timeout=5).stdout.strip()
            date = subprocess.run(["date"], capture_output=True, text=True, timeout=5).stdout.strip()
            
            # Quick file checks
            ada_workspace = Path.home() / ".openclaw" / "workspace"
            agents_dir = Path.home() / ".openclaw" / "agents"
            
            workspace_files = []
            if ada_workspace.exists():
                workspace_files = [f.name for f in ada_workspace.iterdir() if f.is_file()][:10]
            
            # Check agents
            agents_status = {}
            if agents_dir.exists():
                for agent in ["pulse", "scout", "kent", "forge", "axiom", "sentinel"]:
                    agent_dir = agents_dir / agent / "v2"
                    status = "✅ active" if agent_dir.exists() else "❌ missing"
                    agents_status[agent] = status
            
            # Memory info
            mem_cmd = "free -h 2>/dev/null | head -2 || echo 'N/A'"
            memory = subprocess.run(["zsh", "-c", mem_cmd], capture_output=True, text=True, timeout=5).stdout.strip()
            
            # Build snapshot
            snapshot = f"""[ENVIRONMENT SNAPSHOT - {datetime.now().strftime('%Y-%m-%d %H:%M')}]

📁 Current Directory: {pwd}
📅 System Date: {date}
💾 Memory: {memory}

📂 Workspace Files: {', '.join(workspace_files) if workspace_files else '(empty)'}

🤖 Agent Status:"""
            
            for agent, status in agents_status.items():
                snapshot += f"\n   {agent}: {status}"
            
            return snapshot
            
        except Exception as e:
            return f"[ENVIRONMENT SNAPSHOT] Error gathering: {str(e)}"
    
    @staticmethod
    def inject_into_prompt(prompt: str, snapshot: str) -> str:
        """Inject snapshot into initial prompt."""
        return f"{prompt}\n\n{snapshot}"

# CLI for testing
if __name__ == "__main__":
    async def main():
        snapshot = await AgentBootstrap.gather_snapshot()
        print(snapshot)
        
        # Example prompt injection
        example_prompt = "List today's tasks"
        enhanced = AgentBootstrap.inject_into_prompt(example_prompt, snapshot)
        print("\n\n[ENHANCED PROMPT]:")
        print(enhanced)
    
    asyncio.run(main())
