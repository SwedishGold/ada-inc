# OpenClaw Konsultmodell - Affärsplan
**Datum:** 2026-03-19
**Status:** Under utveckling

---

## Koncept

Sälja AI-konsulttjänster baserat på OpenClaw till lokala företag i Sundsvall/Västernorrland.

---

## Affärsmodell

### Vi hostar (Model B)
```
Lokalt företag
    ↓
Betalar oss (Andreas)
    ↓
Vi sätter upp deras "agent" på vår server (vår Mac)
    ↓
Dom får egen inloggning → ser sin agent
    ↓
Recurring revenue: 500-3,500 kr/mån
```

---

## Tre Nivåer

| Nivå | Beskrivning | Pris/mån |
|------|-------------|----------|
| **Delad** | Kunden delar Scout/Kent/Pulse med andra | 500 kr |
| **Egen agent** | Egen dedikerad AI-medarbetare | 1,500 kr |
| **Eget team** | Scout + Kent + Pulse enbart för dom | 3,500 kr |

---

## Målgrupp

### Primär: Små-Medelstora företag i Västernorrland
- SCA-underleverantörer (10-50 anställda)
- Tillverkningsföretag (50-200 anställda)
- IT/Tech-konsulter
- Lokala butiker/restauranger

### Varför dom?
- Inget lokalt AI-erbjudande finns
- Andreas har lokalt nätverk
- Sundsvall = redo för innovation

---

## Prissättning

| Tjänst | Pris | Vad som ingår |
|--------|------|--------------|
| Första möte | Gratis | Lyssna, pitcha |
| Setup | 2,500 kr (engångs) | Installation, konfiguration, träning |
| Delad agent | 500 kr/mån | Assists med andra |
| Egen agent | 1,500 kr/mån | Egen AI-medarbetare |
| Eget team | 3,500 kr/mån | 3 agenter 24/7 |

---

## Exempel: Rundvirke Skog AB

**Behov:** Hitta nya kunder
**Lösning:** Scout (Lead Generation)
**Kostnad:** 1,500 kr/mån
**Värde:** 10 nya leads/mån

---

## API-kostnader (MiniMax)

### Att reda ut:
- [ ] Vad kostar MiniMax M2.7 per konversation?
- [ ] Hur mycket använder en agent per dag?
- [ ] Blir det för dyrt med många kunder?

### Uppskattning:
- MiniMax M2.7: ~$15/miljon tokens input, $60/output
- En enkel agent: ~10-50 dollar/mån?
- Bör inte överstiga 200 kr/kund i API-kostnad

---

## Skalbarhet

### Nu (Andreas Mac):
- Kapacitet: ~10-20 agenter samtidigt
- Kostnad: MiniMax API + ström

### Framtid (Vid scale):
- VPS (DigitalOcean, AWS)
- Dedikerade servrar
- Enterprise-kunder

---

## Konkurrenter

| Konkurrent | Position | Vår fördel |
|------------|----------|-------------|
| Copanion | AI avatar | Vi = lokal, personlig |
| AgentCenter | OpenClaw wrapper | Vi = lokalt nätverk |
| Enterprise SaaS | Stora företag | Vi = SMB-fokuserade |

---

## Nästa steg

- [ ] Research MiniMax API-kostnader
- [ ] Skapa sälj-pitch
- [ ] Första kund? (Rundvirke Skog AB?)
- [ ] Testa med Anja?

---

## Mål

| Månad | Kunder | MRR |
|-------|--------|-----|
| April | 1 | 1,500 kr |
| Maj | 3 | 4,500 kr |
| Juni | 5 | 7,500 kr |
| December | 10 | 15,000 kr |

---

## Risker

| Risk | Lösning |
|------|---------|
| API-kostnader för höga | Sätt tak, övervaka |
| För många kunder | Skala till VPS |
| Kund klagar | Personlig support (Andreas) |

---

*Skapat av: Ada (CEO) - Ada Inc.*
*Uppdateras kontinuerligt*
