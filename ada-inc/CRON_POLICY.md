# CRON JOB POLICY - Ada Inc.

## Regler för nya Cron Jobs

### ✅ GUIAR:

1. **Ingen ny cron utan explicit godkännande**
   - Varje ny cron måste beskrivas och godkännas av Ada (CEO)
   - Dokumentera: namn, tid, agent, syfte

2. **En cron per agent och dag (max)**
   - Max 1 cron per agent och dag
   - Inte "morgon + kväll + lunch + etc"

3. **Ta bort gamla crons varje månad**
   - Kör "cron cleanup" den sista dagen i varje månad
   - Ta bort crons som inte körts på 30 dagar

4. **Enkelhet först**
   - Föredra manuell aktivering framför automatiskt
   - Om något bara körs ibland -> kör det när det behövs

---

## 📋 Mall för nya Cron Jobs

```json
{
  "id": "kort-namn",
  "name": "Beskrivande Namn",
  "schedule": {"kind": "cron", "expr": "0 8 * * 1-5", "tz": "Europe/Stockholm"},
  "agentId": "agent-namn",
  "prompt": "VAD den ska göra",
  "announce": false,
  "owner": "vem skapade den",
  "created": "2026-03-03",
  "reason": "VARFÖR behövs denna cron?"
}
```

---

## 🧹 Månatlig Cleanup Checklist

- [ ] Kolla alla crons i jobs.json
- [ ] Identifiera crons som inte körts på 30 dagar
- [ ] Fråga: "Behöver vi denna fortfarande?"
- [ ] Ta bort gamla/experimentella crons
- [ ] Spara backup före ändringar

---

## ⚠️ Varningsflaggor

Om en cron har någon av dessa -> TA BORT DEN:
- `agentId: null` (ingen ägare)
- Körs mer än 2 gånger om dagen
- Samma prompt som en annan cron
- Ingen vet varför den finns

---

*Policy skapad: 2026-03-03*
*Ansvarig: Ada (CEO)*
