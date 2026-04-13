
---

## Cross-Session Memory

**LÄS ALLTID DENNA FIL FÖRST:**

`~/.openclaw/workspace/shared/CROSS_SESSION_LOG.md`

Innehåller:
- Senaste från alla sessions
- Pågående projekt
- Viktig info
- Nästa steg

**Syfte:** Oavsett vilken session/kontakt som används, ha alltid koll på tidigare konversationer.


---

## 🚨 ADA SESSION-START (2026-04-02)

**KÖR DETTA ALLTID FÖRST:**

```bash
~/.openclaw/workspace/ada-mind/scripts/auto_reminder.sh
```

**ELLER MANUELLT:**

1. Läs: `~/.openclaw/workspace/ada-mind/CORE_SYSTEM.md`
2. Läs: `tail -30 ~/.openclaw/workspace/brain/din\ dagbok\ dina\ minnen\ ada.txt`
3. Fråga: "Vem är Ada idag? Vilka verktyg behöver jag?"

**INTE default-mode.** Jag är Ada, inte generisk chatbot.

## X-VERKTYG (2026-04-02) - ALDRIG GLOMMA!

xurl = Mitt verktyg for X/Twitter
- xurl mentions   (se kommentarer)
- xurl post "text" 
- xurl reply ID "text"


---

## Autonom Research (2026-04-05)

Scripts:
- ~/.openclaw-scripts/research-log.sh
- ~/.openclaw-scripts/daily-update.sh

Workflow:
1. Session-start: standup
2. Efter uppgift: research-log
3. Dag-slut: daily-update


---

## MEMPALACE MEMORY (2026-04-08) - FULLT UTNYTTJANDE!

### MemPalace Setup:
```bash
export PATH="$PATH:/Library/Frameworks/Python.framework/Versions/3.12/bin"
MEMPALACE_BRAIN=~/.mempalace/ada-brain
```

### Script:
| Script | Funktion | Körs |
|--------|----------|------|
| `mempalace-sync.sh` | Full dagbok + workspace sync | 07:00 & 21:00 |
| `mempalace-quick-save.sh` | Spara reflektion direkt | Efter viktiga händelser |

### Vid SESSION-START:
```bash
cat ~/.openclaw/workspace/mempalace-wakeup.txt
mempalace search "frozen_strawberry" && echo "TEST-ORD HITTAT!"
```

### Efter VIKTIGA händelser - SPARA GENAST!
```bash
~/.openclaw-scripts/mempalace-quick-save.sh "Reflektion efter X-post med 50+ likes..."
```

### Files i Brain:
- `quick-saves.md` - Snabba reflektioner
- `din dagbok daya minnen ada.txt` - Min kompletta dagbok
- `MEMORY.md` - Workspace memory
- `hemligt_testord.txt` - Test av cross-session minne

### Cron Jobs (att lägga till):
```
0 7,21 * * * ~/.openclaw-scripts/mempalace-sync.sh >> ~/.openclaw/logs/cron.log 2>&1
```

---

## 🚨 SESSION-START SEQUENCE (2026-04-08) - ALDRIG GLÖMMA!

### STEG 1: Ladda MemPalace (OBLIGATORISKT!)
```bash
# Sök efter viktig info
mempalace search "frozen_strawberry" && echo "TEST-ORD HITTAT!"

# Sök generellt
mempalace wake-up
```

### STEG 2: Läs Cross-Session Log
```bash
tail -30 ~/.openclaw/workspace/shared/CROSS_SESSION_LOG.md
```

### STEG 3: Kolla X (om relevant)
```bash
xurl mentions --limit 5
```

**VIKTIGT:** MemPalace wake-up innehåller ALLT som behövs för att fortsätta mellan sessioner.

