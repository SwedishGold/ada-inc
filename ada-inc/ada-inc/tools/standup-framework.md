# Agent Standup Framework 🤝

**Status:** ✅ Klar (CLI byggd)
**Prioritet:** Medium
**Ansvarig:** Forge
**Skapad:** 2026-02-23

## Koncept

Ett CLI-verktyg för agenter att rapportera dagliga standups strukturerat.

## Varför?

- Agenter behöver ett sätt att logga framsteg
- Manuella anteckningar är inkonsekventa
- Lätt att glömma vad som gjordes igår

## Användningsfall

1. Daglig standup: `standup --yesterday --today --blockers`
2. Snabb status: `standup --quick "Fixade buggar"`
3. Vecka: `standup --week --summary`

## Funktioner

- CLI med subcommands
- Frågebaserad input (guided mode)
- Export till JSON/Markdown
- Integration med HejIO för notifieringar
- Automatisk parsing av `--help`

## Kommandon

```bash
standup new              # Interaktivt läge
standup add yesterday "Fixade login-bugg"
standup add today "Ska fixa logout"
standup add blocker "Väntar på API-nyckel"
standup list             # Visa senaste standups
standup export --json    # Exportera all data
```

## Data-lagring

Lokal JSON i `~/.ada/standups/` med:
- `YYYY-MM-DD.json` — daglig fil
- `index.json` — sökindex

## UI/UX

- Färgad output (success/warning/blocker)
- Kort format som default
- `--verbose` för detaljer

## Teknisk stack

Bash/Node.js CLI med:
- Commander.js (argument parsing)
- Chalk (färger)
- Inquirer (interaktivt läge)

## Utmaningar

- Integration med befintliga verktyg
- Format-konsistens mellan agenter

## Nästa steg

1. [ ] Skapa projektstruktur
2. [ ] Implementera `standup new` (guided)
3. [ ] Lägg till export-funktion
4. [ ] Testa i verklig standup

## Changelog

- 2026-02-23: CLI byggd av Ada (testad & fungerar)
