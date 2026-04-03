"""
Agent Bootstrap - Inspired by Stanford's Meta-Harness

Gathers environment snapshot before agent starts to eliminate exploration turns.
Based on: https://github.com/stanford-iris-lab/meta-harness-tbench2-artifact
"""

import asyncio
import subprocess
from datetime import datetime
from pathlib import Path
from typing import Dict

class AgentBootstrap:
    """Gathers compact environment snapshot for agents."""
    
    @staticmethod
    async def gather_snapshot() -> str:
        """Gather environment snapshot - non-blocking."""
        try:
            # Safe subprocess calls with timeout and returncode check
            pwd_result = subprocess.run(
                ["pwd"], capture_output=True, text=True, timeout=5
            )
            pwd = pwd_result.stdout.strip() if pwd_result.returncode == 0 else "N/A"
            
            date_result = subprocess.run(
                ["date"], capture_output=True, text=True, timeout=5
            )
            date_str = date_result.stdout.strip() if date_result.returncode == 0 else "N/A"
            
            # Quick file checks
            workspace = Path.home() / ".openclaw" / "workspace"
            agents_dir = Path.home() / ".openclaw" / "agents"
            
            workspace_files = []
            if workspace.exists():
                workspace_files = [f.name for f in workspace.iterdir() if f.is_file()][:10]
            
            # Check agents dynamically
            agents_status: Dict[str, str] = {}
            if agents_dir.exists():
                for agent_dir in agents_dir.iterdir():
                    if agent_dir.is_dir():
                        status = "✅ active" if (agent_dir / "v2").exists() else "❌ missing"
                        agents_status[agent_dir.name] = status
            
            # Memory info - use sh with fallback (not zsh)
            try:
                mem_result = subprocess.run(
                    ["sh", "-c", "free -h 2>/dev/null | head -1"],
                    capture_output=True, text=True, timeout=5
                )
                memory = mem_result.stdout.strip() if mem_result.returncode == 0 else "N/A"
            except (subprocess.TimeoutExpired, FileNotFoundError):
                memory = "N/A"
            
            # Build snapshot
            snapshot = f"""[ENVIRONMENT SNAPSHOT - {datetime.now().strftime('%Y-%m-%d %H:%M')}]

📁 Current Directory: {pwd}
📅 System Date: {date_str}
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
