# IVO Risk-Scan - App Specifikation

## Vad appen gör
En AI-driven webbapp som hjälper vårdpersonal att analysera journalanteckningar mot IVO:s (Inspektionen för vård och omsorg) dokumentationskrav. Appen identifierar risker, jämför mot lagar och regler, och kan automatiskt omskriva journaler till korrekt format.

## Målgrupp
- Sjuksköterskor
- Läkare
- Vårdchefer
- Kvalitetsansvariga inom vård

---

## Funktioner

### 1. Analys av journalanteckningar
- Användaren klistrar in en journalanteckning
- AI:n analyserar texten
- Returnerar SBAR-struktur (Situation, Bakgrund, Assessment, Recommendation)

### 2. IVO-kravjämförelse
AI:n jämför journalen mot IVO:s dokumentationskrav:

| Krav | Status |
|------|--------|
| Patientens identitet dokumenterad? | ✅/❌/⚠️ |
| Datum och tid? | ✅/❌/⚠️ |
| Vårdgivare angiven? | ✅/❌/⚠️ |
| Åtgärder beskrivna? | ✅/❌/⚠️ |
| Bedömning/ställningstagande? | ✅/❌/⚠️ |
| Information till patient? | ✅/❌/⚠️ |
| Samtycke dokumenterat? | ✅/❌/⚠️ |

### 3. Riskordsidentifiering
- AI:n hittar riskord/fraser i texten
- Kategoriserar risknivå: LÅG / MEDEL / HÖG

### 4. Auto-fix (Omskrivning)
- En knapp som omskriver hela journalen till IVO-kompatibelt format
- Följer SBAR-struktur
- Innehåller alla obligatoriska element

### 5. Credits-system
- **Gratis plan:** 5 analyser/månad
- **Pro:** 149 kr/mån - obegränsat
- **Enterprise:** 499 kr/mån - obegränsat + API

---

## Teknisk spec

### Arkitektur
- **Frontend:** HTML/CSS/JavaScript (ingen server - allt i browser)
- **AI:** MiniMax M2.1 (eller valfri LLM)
- **Dataskydd:** Ingen datalagring - allt stannar i användarens browser

### API-integration
```javascript
// Anropa AI
fetch('https://api.minimax.chat/v1/text/chatcompletion_v2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer API_KEY'
  },
  body: JSON.stringify({
    model: 'MiniMax-M2.1',
    messages: [
      { role: 'system', content: IVO_SYSTEM_PROMPT },
      { role: 'user', content: 'journaltext...' }
    ],
    temperature: 0.3
  })
})
```

### IVO System Prompt
```
Du är IVO Risk-Scan, en AI-assistent specialiserad på riskanalys för svensk vård.

IVO:s Dokumentationskrav (Sammanfattning):

### Patientjournal (3 kap. PDL)
1. Patientens identitet - Namn, personnummer
2. Vårdgivare - Vem som utfört vården
3. Datum och tid - När vården utfördes
4. Åtgärder - Vad som gjorts
5. Ställningstagande - Bedömning och plan
6. Information - Vad patienten informerats om
7. Samtycke - Om patienten samtyckt

### SBAR (rekommenderas av IVO)
- S - Situation
- B - Bakgrund
- A - Assessment  
- R - Recommendation

### Vanliga brister IVO ser:
1. Bristande journalföring
2. Saknar datum/tid
3. Otydlig bedömning
4. Ingen dokumentation av patientsamtal
5. Ingen riskbedömning

Din uppgift är att:
1. ANALYSERA journalanteckningar mot IVO:s krav
2. JÄMFÖRA vad som saknas mot kraven
3. GE konkreta förbättringsförslag

SVARA ALLTID PÅ SVENSKA.
```

---

## UI/UX

### Färgpalett
- Primär: #2563eb (blå)
- Secondary: #64748b (grå)
- Success: #22c55e (grön)
- Warning: #f59e0b (gul)
- Danger: #ef4444 (röd)
- Bakgrund: #f8fafc

### Layout
- Header med logo och credits-visning
- Input-sektion (textarea)
- Resultat-sektion med kort:
  - Risknivå (färgkodad)
  - SBAR-analys
  - IVO-kravjämförelse (checklista)
  - Riskord (taggar)
  - Rekommendationer
- Auto-fix sektion med omskrivningsknapp
- Sidebar med statistik

### Responsive
- Desktop: 2-kolumn (main + sidebar)
- Mobil: 1-kolumn

---

## Filer att skapa

```
ivo-risk-scan-app/
├── index.html    # HTML-struktur
├── styles.css    # CSS-design
├── app.js        # App-logik (DOM, events)
└── api.js        # AI-anrop, prompts
```

---

## Auto-fix funktion

### Input
Original journalanteckning

### Process
AI:n omskriver med:
- SBAR-struktur
- Alla obligatoriska element
- Tydlig, professionell ton

### Output
Färdig journaltext som användaren kan kopiera

---

## Exempel-input & output

### Input
```
Patienten kommer in. Han mår bra.
```

### Output (Auto-fix)
```
Situation: Patient kommer för planerad kontroll.

Bakgrund: Tidigare kontakt okänd. inga kända allergier.

Bedömning: Allmäntillstånd gott. Vitala parametrar inom normalvärden.

Rekommendation: Återkommer om 3 månader för uppföljning. Vid försämring, kontakta vårdcentral.

Datum: 2026-02-24
Vårdgivare: [Namn]
```

---

*Skapad: 2026-02-24*
