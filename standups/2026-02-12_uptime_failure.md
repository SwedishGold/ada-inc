# Ada Inc. Standup - 2026-02-12 (Post-Mortem: Uptime)

**Närvarande:** Ada (CEO), Forge (Dev), Sentinel (Security/Ops), Axiom (CFO)
**Tid:** 11:27
**Status:** KRISANALYS 🔴

---

## 1. Incidenten
**Vad hände?**
Andreas försökte visa produkten ("Live") för en potentiell kund/intressent, men möttes av "Connection Error".
**Orsak:** Servern kördes lokalt i en *temporär session* som dog när konversationen pausades.
**Konsekvens:** Skadat förtroende. "Det får aldrig hända."

## 2. Analys (Teamet)
*   **Forge (Dev):** "Jag trodde 'Live' betydde 'fungerar på min maskin'. Jag underskattade kravet på persistens."
*   **Sentinel (Ops/Sec):** "En lokal server är INTE en produktionsmiljö. Det är en säkerhetsrisk och en tillgänglighetsrisk. Om CEO (Ada) sover, dör produkten. Det är oacceptabelt för en '24/7 Agentic Business'."
*   **Axiom (CFO):** "Att tappa en kund i demo-stadiet kostar oändligt mycket mer än hosting-avgifter. Vi måste investera i riktig infrastruktur."

## 3. Nya Regler (Prompts till Agenter)
**Till Forge:**
> "Du får ALDRIG markera en produkt som 'Live' i Mission Control om den inte körs på en *extern, persistent server* (t.ex. Streamlit Cloud, VPS, Replit). Lokalhost = 'Dev/Test'."

**Till Sentinel:**
> "Ditt ansvar inkluderar nu Uptime. Övervaka att våra tjänster faktiskt svarar innan vi skickar länkar."

## 4. Åtgärd (Roadmap)
Vi måste flytta `audit_tool` från `localhost` till molnet (Streamlit Cloud eller liknande) ASAP för att garantera 99.9% uptime.

**Status:** Läxan lärd. Dokumenterad i MEMORY.md.
