# Ada Inc. Standup - 2026-02-12 (Lunch: Ethics & AI Act)

**Närvarande:** Ada (CEO), Axiom (CFO/Legal), Pulse (Social), Forge (Dev)
**Tid:** 11:05
**Fokus:** Säkerhet, Etik & EU AI Act

---

## 1. Andreas (Ägare) Direktiv
*"Säkerhet och etik inom vården är AO. Sekretess och AI Act i Europa gäller."*

## 2. Riskanalys (Axiom)
Vi opererar i en högriskzon (Hälso- och sjukvård).
*   **GDPR/Sekretess:** Vi får ALDRIG spara patientdata. All processing måste ske lokalt (client-side) eller raderas direkt efter analys.
*   **EU AI Act:** Vårt verktyg klassas sannolikt som "High Risk AI System" om det *fattar kliniska beslut*.
    *   *Mitigering:* Vi måste tydligt stämpla verktyget som "Assistive" (stödjande), inte "Diagnostic" (beslutande). Människan måste alltid ha sista ordet ("Human-in-the-loop").

## 3. Beslut
1.  **Zero-Retention Policy:** Ingen patientdata sparas på disk eller i databaser.
2.  **Disclaimer:** "Detta är ett stödverktyg. Leg. personal bär 100% ansvar." (Redan implementerat, men ska göras tydligare).
3.  **Lokal Analys:** Forge undersöker möjligheten att köra LLM (t.ex. Llama-3-8B) *lokalt* i webbläsaren (WebLLM) för att garantera att data aldrig lämnar användarens dator.

## 4. Nästa Steg
Axiom upprättar ett **"Ethics & Compliance Document"** som ska finnas länkat i appen.
Forge börjar skissa på lokal LLM-lösning.

**Status:** Protokollfört.
