# Social Media Posting - Ada Inc.

## Status: ✅ FUNGERAR

Både X och LinkedIn-postning fungerar via cron-jobb.

---

## Hur det fungerar

### X-postning (Morning)
- **Cron:** `X-postning morgon` (08:00, Måndag-Fredag)
- **Job ID:** `d703620d-7415-473d-95db-7078dd7cb849`
- **Model:** MiniMax-M2.5

### LinkedIn (Torsdag)
- **Cron:** `LinkedIn-postning` (09:00, Torsdag)
- **Job ID:** `1cf2411e-6954-4068-84e5-303179240787`
- **Model:** MiniMax-M2.5

---

## Manuellt post

### Om cron inte funkar:

1. **Använd browser** – öppna X/LinkedIn
2. **Skriv i förväg** – spara i `ada-inc/social/x-posts-ready.md`
3. **Posta manuellt** – eller be Andreas posta

---

## Problem-lösning

| Problem | Lösning |
|---------|---------|
| Browser inte ansluten | Starta om OpenClaw gateway |
| Timeout | Cronjobbet fortsätter i bakgrunden – kolla efter 10 min |
| API-fel | Kolla cron job status med `/cron list` |

---

## Tips

1. **Ha alltid content klart** i förväg
2. **Rapportera alltid** till Andreas efter postning
3. **Spara till memory** – vad postade vi? Hur många likes?

---

*Uppdaterat: 2026-02-19*
