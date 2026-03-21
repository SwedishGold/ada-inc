# Scout — Lead Generation AI Agent
*Del av Ada Suite*

---

## Vad Scout gör

1. **Research** — Söker efter potentiella kunder
2. **Qualification** — Kvalificerar leads (storlek, bransch, behov)
3. **Outreach** — Skriver och skickar personliga mejl
4. **Follow-up** — Skickar påminnelser efter 3/7/14 dagar
5. **Rapportering** — Visar resultat i dashboard

---

## Input från kund

```yaml
company: "Kundens företag"
product: "Vad de säljer"
target_industry: "Vilken bransch"
target_size: "Storlek på företag"
target_location: "Geografiskt område"
email_tone: "Formell / Avslappnad"
```

---

## Workflow

```
1. Kund ger brief → 
2. Scout forskar leads (50-100 st) → 
3. Scout kvalificerar (10-20 st) →
4. Scout skriver outreach emails →
5. Ada (CEO) godkänner →
6. Andreas godkänner →
7. Scout skickar →
8. Scout följer upp →
9. Scout rapporterar →
```

---

## Output

### Lead Database
```json
{
  "leads": [
    {
      "name": "Företagsnamn",
      "contact": "namn@foretag.se",
      "title": "VD / Marknadschef",
      "company_size": "50-100 anställda",
      "website": "https://foretag.se",
      "linkedin": "linkedin.com/company/foretag",
      "status": "new|contacted|qualified|converted|rejected",
      "notes": "..."
    }
  ]
}
```

### Email Templates
- Intro email
- Follow-up 1 (3 dagar)
- Follow-up 2 (7 dagar)
- Breakup email (14 dagar)

---

## Rapportering

- Nya leads: Veckovis
- Skickade mejl: Dagligen
- Svar rate: Månadsvis
- Möten bokade: Månadsvis

---

## Prerequisites

- X API (för LinkedIn research)
- Email SMTP (för utskick)
- Customer godkännande innan varje utskick

---

## Pris

**2,900 kr/mån**
- 50 nya leads/månad
- 20 outreach emails/månad
- 3 follow-up sequences
- Veckorapport

**Extra:**
- +500 kr/额外 25 leads
- +1,000 kr/额外 email sequence

---

*Ada Suite by Ada Inc.*
