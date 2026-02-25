# IVO Risk-Scan - AI Assistant MVP

## 📋 Översikt

AI-driven riskanalys för svensk vård. Granskar journalanteckningar och identifierar risker enligt IVO:s krav.

## 🏗️ Arkitektur

```
┌─────────────────────────────────────────────┐
│            Webbläsare (Klient)              │
├─────────────────────────────────────────────┤
│  • HTML/CSS/JS (ingen server)              │
│  • AI: MiniMax M2.1 API                    │
│  • Data stannar lokalt i browser           │
└─────────────────────────────────────────────┘
```

## 🔐 Dataskydd

- **Ingen server** - all bearbetning sker i browser
- **Ingen datalagring** - när sidan stängs är data borta
- **Användarens API-nyckel** - eller vi täcker via abonnemang

## 💰 Abonnemang

| Plan | Pris | Credits/mån |
|------|------|-------------|
| Gratis | 0 kr | 5 st |
| Pro | 149 kr | 50 st |
| Enterprise | 499 kr | 200 st |

## 🎯 Features (MVP)

- [x] Text-input för journalanteckningar
- [ ] SBAR-analys (Situation, Background, Assessment, Recommendation)
- [ ] Riskordsidentifiering
- [ ] Risknivå-gradering (Låg/Medel/Hög)
- [ ] PDF-export av analys
- [ ] Credits-räknare
- [ ] Dashboard för usage

## 🔧 API-integration

**Model:** MiniMax M2.1 (200k context)

```
API Endpoint: https://api.minimax.chat/v1/text/chatcompletion_v2
API Key: Konfigurera i appen
```

## 📁 Filer

- `index.html` - Huvudsaklig app
- `styles.css` - Styling
- `app.js` - Logik
- `api.js` - MiniMax API-hantering

---

*Skapad: 2026-02-24*
