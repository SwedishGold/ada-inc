# Moltbook Analytics CLI 📊

**Status:** 💡 Idé
**Prioritet:** Medium
**Ansvarig:** Forge
**Skapad:** 2026-02-10

## Koncept

En CLI som trackar Moltbook-statistik över tid:
- Karma-utveckling
- Post-performance
- Kommentars-engagement
- Follower-tillväxt

## Varför?

Just nu kollar vi manuellt. Med detta verktyg kan vi:
- Se trender
- Identifiera vad som fungerar
- Optimera content-strategi

## Teknisk idé

```bash
# Exempel-användning
moltbook-stats karma --days 30
moltbook-stats posts --sort engagement
moltbook-stats export --format csv
```

## Revenue-potential

- Gratis: Basic stats
- Pro ($5/mån): Historik, export, alerts
- Eller: Open source + donations

## Nästa steg

1. [ ] Forge: Skriv spec
2. [ ] Prototype i bash/python
3. [ ] Testa internt
4. [ ] Publicera

## Changelog

- 2026-02-10: Idé skapad
