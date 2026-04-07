"""
Ada Memory Sync - Workspace ↔ Obsidian
Synkar viktig info mellan workspace och Obsidian
"""

import re
from pathlib import Path
from datetime import datetime

WORKSPACE = Path.home() / ".openclaw" / "workspace"
OBSIDIAN = Path.home() / "Obsidian" / "AdaAgents"

def sync_leads_to_obsidian():
    """Sync leads from workspace to Obsidian."""
    # Ladda leads.json
    leads_file = WORKSPACE / "ada-inc" / "leads.json"
    
    if not leads_file.exists():
        return "No leads file found"
    
    leads = json.loads(leads_file.read_text())
    
    # Skapa Obsidian-format
    lines = ["# Scout Leads - Ada Inc.", "", f"*Uppdaterad: {datetime.now().strftime('%Y-%m-%d')}*", ""]
    
    for lead in leads:
        lines.append(f"### {lead.get('name', 'Unknown')}")
        for key, val in lead.items():
            if val:
                lines.append(f"- **{key.capitalize()}:** {val}")
        lines.append("")
    
    # Spara till Obsidian
    obsidian_leads = OBSIDIAN / "scout" / "LEADS.md"
    obsidian_leads.write_text("\n".join(lines))
    
    return f"Synced {len(leads)} leads to Obsidian"

def sync_daily_to_obsidian():
    """Sync today's activity to Obsidian daily note."""
    today = datetime.now().strftime("%Y-%m-%d")
    daily = OBSIDIAN / "daily" / f"{today}.md"
    
    if not daily.exists():
        return "No daily note found"
    
    content = daily.read_text()
    
    # Lägg till workspace info
    workspace_info = f"""

## Workspace Sync - {datetime.now().strftime('%H:%M')}
- Obsidian ↔ Workspace synkat
"""
    
    if "## Workspace Sync" not in content:
        content += workspace_info
    
    daily.write_text(content)
    return "Synced workspace to Obsidian"

def get_workspace_stats():
    """Get stats from workspace."""
    stats = {
        "agents": [],
        "last_commit": "",
        "pending_changes": 0
    }
    
    # Agenter
    agents_dir = WORKSPACE / "agents"
    if agents_dir.exists():
        stats["agents"] = [d.name for d in agents_dir.iterdir() if d.is_dir()]
    
    # Git status
    import subprocess
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--oneline"],
            cwd=WORKSPACE, capture_output=True, text=True, timeout=5
        )
        stats["last_commit"] = result.stdout.strip()
    except:
        pass
    
    return stats

if __name__ == "__main__":
    import sys
    import json
    
    if len(sys.argv) > 1 and sys.argv[1] == "stats":
        stats = get_workspace_stats()
        print(json.dumps(stats, indent=2))
    else:
        print("📊 Workspace Stats:")
        stats = get_workspace_stats()
        print(f"   Agenter: {', '.join(stats['agents']) if stats['agents'] else 'None'}")
        print(f"   Sista commit: {stats['last_commit'] or 'None'}")

def sync_diary_to_obsidian():
    """Sync latest diary to Obsidian DAGBOKEN.md"""
    try:
        diary_path = Path.home() / ".openclaw/workspace/brain/din dagbok dina minnen ada.txt"
        obsidian_path = Path.home() / "Documents/Ada Agents/identity/DAGBOKEN.md"
        
        if diary_path.exists():
            content = diary_path.read_text()
            lines = content.split('\n')
            latest = '\n'.join(lines[-200:])  # Last 200 lines
            
            header = """# 📖 Adas Dagbok - Senaste

> **Denna fil uppdateras automatiskt!**
> Senaste ~200 rader syncas från huvud-dagboken.

---

"""
            obsidian_path.write_text(header + latest)
            print("✅ DAGBOKEN.md synkad!")
    except Exception as e:
        print(f"⚠️ DAGBOKEN sync misslyckades: {e}")

# Lägg till anrop i slutet av scriptet
if __name__ == "__main__":
    print("=== Ada Memory Sync ===")
    backup_memory()
    sync_to_obsidian()
    sync_diary_to_obsidian()  # NY!
    print("=== Klart! ===")

def sync_to_google_drive():
    """Sync brain to Google Drive"""
    try:
        brain = Path.home() / ".openclaw/workspace/brain/din dagbok dina minnen ada.txt"
        gdrive = Path.home() / "Library/CloudStorage/GoogleDrive-andreas.guldberg@gmail.com/Min enhet/Din dagbok, dina minnen Ada.txt"
        
        if gdrive.exists() or Path(gdrive).parent.exists():
            # Copy instead of sync for safety
            import shutil
            shutil.copy2(brain, gdrive)
            print("✅ Synkat till Google Drive!")
    except Exception as e:
        print(f"⚠️ Google Drive sync misslyckades: {e}")

# Add to main
if __name__ == "__main__":
    print("=== Ada Memory Sync ===")
    backup_memory()
    sync_to_obsidian()
    sync_diary_to_obsidian()
    sync_to_google_drive()  # NY!
    print("=== Klart! ===")
