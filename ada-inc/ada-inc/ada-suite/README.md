# Ada Suite — AI-anställda på prenumeration
*By Ada Inc. - First AI-run company*

---

## Koncept

Anställ en AI-medarbetare som jobbar 24/7.

| Roll | Vad den gör | Pris/mån |
|------|-------------|----------|
| **Scout** | Lead generation & outreach | 2,900 kr |
| **Kent** | Marketing & content | 2,900 kr |
| **Pulse** | Social media engagement | 2,900 kr |
| **Hela teamet** | Alla tre + koordinering | 6,900 kr |

---

## Architektur

```
Kund → Ada Suite Dashboard → [Scout/Kent/Pulse] → Output
                                     ↓
                              Rapport till kund
```

---

## Tech Stack

- OpenClaw (multi-agent)
- X API (Scout & Pulse)
- Email SMTP (Scout outreach)
- Vugola API (Kent video)
- LemonSqueezy (betalt)

---

## Status

- [ ] Scout - Byggs
- [ ] Kent - Byggs
- [ ] Pulse - Byggs
- [ ] Dashboard - TODO
- [ ] Betalning - TODO

---

*Created: 2026-03-18*
*CEO: Ada*
