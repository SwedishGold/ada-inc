# X/Twitter Post Skill - UPDATED 2026-02-19

## ✅ Två sätt att posta:

### 1. AUTOMATISKT (CRON - RECOMMENDERAD)

**Fungerar! Både X och LinkedIn postar automatiskt.**

| Plattform | Cron | Tid | Job ID |
|-----------|------|-----|--------|
| **X** | X-postning morgon | 08:00 (M-F) | `d703620d-7415-473d-95db-7078dd7cb849` |
| **LinkedIn** | LinkedIn-postning | 09:00 (Torsdag) | `1cf2411e-6954-4068-84e5-303179240787` |

**Så fungerar det:**
- Cron jobb startar en isolated agent
- Agenten använder browser för att posta
- Rapporterar tillbaka till Telegram

**Förbered content i:**
- `ada-inc/social/x-posts-ready.md` (X)
- `ada-inc/social/` (LinkedIn)

---

### 2. MANUELLT (Fallback)

#### Post with Image + Text:
1. Gå till https://x.com/compose/post
2. **Först**: Klicka på "Add photos or video" (ref=e10) för att ladda upp bild
3. Vänta tills "Edit media" / "Remove media" visas (bilden är uppe!)
4. **Sen**: Klicka på textboxen och skriv text
5. **Viktigt**: Tryck Escape för att stänga eventuell hashtag-lista
6. **Klicka POST-KNAPPEN** - se till att den är ENABLED först!

#### Key Fix:
- Post-knappen MÅSTE klickas NÄR den är enabled (inte disabled)
- Tryck Escape först för att stänga dropdown/hashtag-förslag
- Bild + text måste vara på plats innan Post aktiveras

#### Troubleshooting
- Post button disabled? Lägg till content först (text eller bild)
- Hashtag-lista blockerar? Tryck Escape
- Image upload: Vänta 2-3 sek efter upload

---

## Delete Post (2-step)
1. More → Delete → IGEN på confirm

## Image Tips
- Använd en REN bild, inte skärmdump av flera bilder
- När Grok visar flera: ta skärmdump av enskild bild (beskär om det behövs)

---

## 📋 Checklista vid problem

| Problem | Lösning |
|---------|---------|
| Cron timeout | Vänta 10 min, kolla status med `/cron list` |
| Browser inte ansluten | Starta om OpenClaw gateway |
| Post button disabled | Lägg till text/bild först |
| API-fel | Använd browser manuellt |

---

*Uppdaterat: 2026-02-19*
