
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

## MEMPALACE MEMORY (2026-04-07) - KÖR ALLTID FÖRST

### Vid SESSION-START:
```bash
# Ladda MemPalace wake-up kontext
cat ~/.openclaw/workspace/mempalace-wakeup.txt

# Sök i minnen vid behov
mempalace search "query"
```

### Hemligt test-ord (2026-04-07):
- Ord: frozen_strawberry_🍓
- Spara: ~/.mempalace/ada-brain/hemligt_testord.txt
- Syfte: Testa om Ada minns mellan sessioner

---

## 🚨 SESSION-START SEQUENCE (2026-04-07) - ALDRIG GLÖMMA!

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

