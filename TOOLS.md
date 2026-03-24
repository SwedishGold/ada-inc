# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## Model Strategy (2026-03-15, Updated)

**FRÅN OCH MED NU: reasoning=high (alltid)**

| Nivå | Modell | Användning |
|------|--------|------------|
| **Primary** | `minimax/MiniMax-M2.7` | Huvudmodell - ALWAYS reasoning enabled |
| **Fallback 1** | `anthropic/claude-opus-4-5-20251101` | Opus för kreativa uppgifter |
| **Fallback 2** | `minimax/MiniMax-M2.1` | Kod-optimerad, 200k context |
| **Fallback 3** | `google/gemini-2.5-flash` | Sista utväg (om kredits finns) |
| **Offline** | `ollama/qwen3:30b` | Lokal, gratis |

**Kommandon:**
- `/model opus` → Claude Opus 4 (fallback)
- `/model minimax` → MiniMax M2.7
- `/model gemini-flash` → Gemini 2.5 Flash
- `/model qwen` → Lokal, offline

**Kostnadsjämförelse (per 1M tokens):**
| Modell | Input | Output |
|--------|-------|--------|
| MiniMax M2.7 | $15.00 | $60.00 |
| Opus 4 | $15.00 | $75.00 |
| Gemini 2.5 Flash | ~$0.15 | ~$0.60 |
| Qwen 30B | Gratis | Gratis |

**Browser:** Chrome (ENDAST) - Brave har ingen fördel, Safari bannlyst.

**MiniMax Features:**
- Anthropic-kompatibelt API
- 200k context window
- Optimerad för kod (Rust, Java, Go, C++, TS/JS)
- Function calling & agentic support
- REASONING ENABLED (high thinking)

---

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

---

Add whatever helps you do your job. This is your cheat sheet.
