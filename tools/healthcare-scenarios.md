# Healthcare Scenario Generator 🏥

**Status:** 💡 Idé
**Prioritet:** HIGH
**Ansvarig:** Forge
**Skapad:** 2026-02-10

## Koncept

AI-driven generator för psykiatriska träningsscenarier.
Spin-off från CareLearn Connect.

## Varför?

Andreas jobbar i PIVA. Utbildning är svårt att skala.
Realistiska scenarion är dyra att skapa manuellt.

## Funktioner

- Generera patient-profiler
- Skapa eskalerande situationer
- Anpassningsbar svårighetsgrad
- Kopplat till CareLearn Connect

## Revenue-potential

**HIGH** — Detta är core business!

- Per-scenario: $0.50-2
- Unlimited: $29/mån
- Sjukhus-licens: $500-2000/år

## Teknisk idé

```python
# Pseudokod
scenario = generate_scenario(
    type="de-escalation",
    difficulty="medium",
    patient_profile="aggressive_anxiety"
)
```

## Koppling till CareLearn

Detta ÄR CareLearn's motor. Kan säljas separat eller integrerat.

## Nästa steg

1. [ ] Extrahera scenario-logik från CareLearn
2. [ ] Skapa standalone API
3. [ ] Dokumentera för externa utvecklare
4. [ ] Pricing-strategi

## Changelog

- 2026-02-10: Idé skapad
