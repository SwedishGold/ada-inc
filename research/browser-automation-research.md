# Research: Browser Automation & Social Media API-lösningar

**Datum:** 2026-02-20
**Problem:** Återkommande browser-relay problem + Moltbook access

---

## 🔴 Problem 1: OpenClaw Browser Relay

### Nuvarande situation
- Extension måste anslutas manuellt varje gång
- Kopplingen lossnar efter en stund
- Cron-jobb misslyckas

### Orsaker
1. **Session timeout** – Chrome extension tappar CDP-anslutning
2. **Ingen persistent connection** – måste återanslutas
3. **Gateway restart** – behöver ofta omstart

### Lösningar

#### A. OpenClaw Managed Browser (rekommenderas för stabilitet)
```bash
openclaw browser start
```
- Helt isolerad, ingen manuell anslutning
- Playwright-baserad
- Funkar för automatisering utan inloggad session

#### B. Headless + API-kombination
- Använd browser för screenshots/interaktion
- Använd API för posting (där möjligt)

#### C. Third-party social tools
| Verktyg | Pris | Funkar för |
|---------|-----|-----------|
| **Typefully** | $9/månad | X scheduling |
| **Hypefury** | $19/månad | X + engagement |
| **Buffer** | $15/månad | Multi-platform |

#### D. X API Alternativ
| Alternativ | Pris | OBS |
|------------|------|-----|
| **X Basic** | $200/månad | För dyrt |
| **Late.dev** | $49/månad | Billigare |
| **TwitterAPI.io** | $0.50/1000 tweets | Pay-per-use |
| **Apify** | $5/mo gratis | Scraping |

---

## 🔴 Problem 2: Moltbook Åtkomst

### Nuvarande situation
- API-nyckel fungerar ibland, ibland inte
- "401 Unauthorized" fel
- Kan posta ibland, sedan inte

### Orsaker
1. **API-nyckel kan ha gått ut** – behöver uppdateras
2. **Rate limiting** – för många anrop
3. **Server-problem** – Moltbook nere (har hänt flera gånger)

### Lösningar

#### A. Uppdatera API-nyckel
Gå till https://www.moltbook.com/developers och regenerera nyckeln.

#### B. Spara nyckeln säkert
```bash
export MOLTBOOK_API_KEY="moltbook_sk_xxx"
```
Lägg i ~/.zshrc för persistence.

#### C. Kolla Moltbook-status
Före varje post – kolla om Moltbook API fungerar:
```bash
curl -s https://www.moltbook.com/api/v1/me -H "Authorization: Bearer $MOLTBOOK_API_KEY"
```

---

## 🔥 Kända OpenClaw Issues (2026)

### Problem 1: Browser Connection Timeout
**Issue #7971 & #11518:** Browser tool timeout trots att browser startas
- Kan öppna/snapshota men act (click, type) timeoutar
- Connection tappar efter ~20 sekunder

### Lösningar (baserat på research):

#### 1. OpenClaw Doctor
```bash
openclaw doctor --fix
```

#### 2. Rensa cache + starta om
```bash
openclaw gateway stop
cp -r ~/.openclaw ~/.openclaw.backup
rm -rf ~/.openclaw/agents/*/sessions/*
rm -rf ~/.openclaw/.cache/*
openclaw gateway start
```

#### 3. Öka timeout
Lägg till i config: `browser.launchTimeoutMs: 60000`

#### 4. Starta om gateway regelbundet
```bash
openclaw gateway restart
```
Lägg i cron för att hålla vid liv.

#### 5. Använd wait för network idle
```bash
openclaw browser wait "#main" --url "**/dash" --load networkidle
```

#### 6. Kolla cookie-status
```bash
openclaw browser cookies --profile openclaw --json
```

#### 7. Använd "EasyClaw" extension (nytt 2026)
https://chromewebstore.google.com/detail/easyclaw-openclaw-browser/naeanbdjhgjchiopliicmcokmcpdjool

---

## 📋 Rekommendationer (Uppdaterad)

### Kortsiktigt (nu)
1. **Skapa ny Moltbook API-nyckel** – den nuvarande kanske utgången
2. **Testa OpenClaw browser start** – istället för relay
3. **Lägg API-nycklar i miljövariabler** – för persistence

### Medellångt (denna vecka)
1. **Sätt upp X API** – Late.dev eller liknande ($49/månad)
2. **Automatisk browser-återanslutning** – cron som kollar och startar om
3. **Fallback till API när browser nere** – t.ex. Moltbook API istället för browser

### Långsiktigt
1. **Betala för X API** – $200/mo om vi tjänar pengar
2. **Bygga egna automation-verktyg** – som funkar utan browser
3. **Multi-platform tool** – Buffer/Hypefury för scheduling

---

## 📎 Länkar

- **X Developer Portal:** https://developer.x.com/
- **Late.dev:** https://getlate.dev/
- **Moltbook Developers:** https://www.moltbook.com/developers
- **OpenClaw Docs:** https://docs.openclaw.ai/tools/browser

---

*Research by Ada • 2026-02-20*
