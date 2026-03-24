# Ada Suite - Produktspecifikation
**Version:** 1.0 | **Datum:** 2026-03-19 | **Status:** Utkast

---

## Vision

> "Att ge småföretag tillgång till samma AI-marknadsföringskraft som stora bolag – utan att behöva anställa ett helt team."

Ada Suite är en AI-baserad marknadsföringsplattform för småföretag i Sverige. Vi automatiserar lead generation, content-skapande och social media-engagement – så att företagare kan fokusera på det de är bra på.

---

## 1. Kundresan (Customer Journey)

### Steg-för-steg flöde

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KUNDRESAN                                         │
└─────────────────────────────────────────────────────────────────────────────┘

[STEPP 1]                    [STEPP 2]                    [STEPP 3]
Upptäcker Ada Suite    →    Besöker hemsida         →    Registrerar sig
    │                          │                           │
    │  • X-post                 │  • Läser om tjänsten      │  • E-post
    │  • Mun-mot-mun            │  • Ser priser             │  • Företagsnamn
    │  • Lokal reklam           │  • Ser "hur det funkar"    │  • Behov
    │                          │                           │
    ▼                          ▼                           ▼
    
[STEPP 4]                    [STEPP 5]                    [STEPP 6]
Väljer paket             →    Betalar                  →    Onboarding
    │                          │                           │
    │  • Scout (1,490 kr/mån)   │  • LemonSqueezy            │  • Välkommen-mail
    │  • Kent (1,490 kr/mån)    │  • Swish/Kort              │  • Fyller i profil
    │  • Pulse (990 kr/mån)     │  • Fakturering             │  • Kopplar X/LinkedIn
    │  • Alla tre (2,990 kr)    │                           │
    │                          │                           │
    ▼                          ▼                           ▼

[STEPP 7]                    [STEPP 8]                    [STEPP 9]
AI:n arbetar             →    Dashboard                →    Månadsrapport
    │                          │                           │
    │  • Scout: Hittar leads    │  • Se leads                │  • Sammanfattning
    │  • Kent: Skapar content   │  • Se content               │  • Resultat
    │  • Pulse: Engagerar       │  • Se engagement            │  • Rekommendationer
    │                          │  • Se ROI                   │  • Nästa steg
    ▼                          ▼                           ▼
```

---

## 2. Produkterna (Paketen)

### Ada Suite - Scout (Lead Generation)

**Pris:** 1,490 kr/mån

**Vad kunden får:**
- 10 kvalificerade leads/vecka inom vald bransch/område
- Leads med: Företagsnamn, kontaktperson, e-post, telefon, webbplats
- Bransch: Restaurang, Hantverkare, Konsult, Retail, etc.
- Geografiskt: Sundsvall, Stockholm, eller hela Sverige
- Automatisk uppföljning via e-post

**Tekniskt flöde:**
```
┌──────────────────────────────────────────────────────────────┐
│                      SCOUT ARBETAR                            │
└──────────────────────────────────────────────────────────────┘

  1. Research Agent                                       
     ↓
     ├─ Söker på: "restaurang Sundsvall"                    
     ├─ Söker på: "café Sundsvall"                          
     ├─ Söker på: LinkedIn företag                          
     └─ Söker på: Allabolag.se, eniro.se                    
         ↓
  2. Kvalificering                                         
     ├─ Filtrerar bort: för små (1 anställd)                 
     ├─ Filtrerar bort: för stora (>50 anställda)            
     ├─ Kontrollerar: har hemsida?                           
     └─ Kontrollerar: finns e-post?                          
         ↓
  3. Lead rapport                                          
     └─ Output: JSON med alla leads                          
         ↓
  4. Email Outreach (valfritt)                              
     ├─ Personligt mejl till varje lead                      
     ├─ Baserat på mallar + AI-anpassning                   
     └─ Skickas via kundens e-post (SMTP)                    
         ↓
  5. Dashboard uppdateras                                   
     └─ Kund ser: Nya leads | Skickade mejl | Svar           
```

**Dashboard vy:**
```
┌─────────────────────────────────────────────────────────────┐
│  SCOUT DASHBOARD                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 Denna vecka: 12 leads hittade                         │
│  📧 8 mejl skickade                                        │
│  ✓ 2 svar mottagna                                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ FÖRETAG         KONTAKT      E-POST        STATUS   │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Café Vittra    Anna L.     anna@...      ✓ Skickat  │   │
│  │ Hantverkarn    Erik S.     erik@...      ○ Väntar  │   │
│  │ Bilbolaget     Maria K.    maria@...     ✓ Svarat! │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Exportera leads]  [Skicka mejl]  [Följ upp]             │
└─────────────────────────────────────────────────────────────┘
```

---

### Ada Suite - Kent (Content Creation)

**Pris:** 1,490 kr/mån

**Vad kunden får:**
- 4-8 sociala inlägg/vecka (X, LinkedIn, Instagram)
- Video-clips (30-60 sek) med AI-klippning via Vugola
- Caption + hashtags + Call-to-Action
- Publicering schemalagd eller auto-post
- Månadsanalys: Vad presterade bäst?

**Tekniskt flöde:**
```
┌──────────────────────────────────────────────────────────────┐
│                      KENT ARBETAR                            │
└──────────────────────────────────────────────────────────────┘

  1. Content Planering                                        
     ↓
     ├─ Analyserar: Företagets bransch                     
     ├─ Analyserar: Konkurrenter posts                      
     ├─ Analyserar: Trender just nu                          
     └─ Skapar: Innehållskalender för veckan                 
         ↓
  2. Content Skapande                                        
     ↓
     ├─ Text: AI-genererade captions                         
     ├─ Bild: AI-genererade thumbnails                      
     ├─ Video: Klippning via Vugola API                     
     └─ Hashtags: Automatiskt genererade                    
         ↓
  3. Publicering                                             
     ↓
     ├─ Schemalägger: Optimala tider                          
     ├─ Publicerar: X via API                               
     ├─ Publicerar: LinkedIn via API                        
     └─ Skickar: Rapport till kund                          
         ↓
  4. Analys                                                    
     └─ Vad fick mest engagement?                            
         ↓
  5. Lär & Förbättra                                        
     └─ Nästa vecka: Mer av det som funkade                 
```

**Dashboard vy:**
```
┌─────────────────────────────────────────────────────────────┐
│  KENT DASHBOARD                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📅 Vecka 12, 2026                                         │
│                                                             │
│  📝 Planerade: 6 inlägg                                    
│  ✅ Publicerade: 4                                          
│  👁️ Total räckvidd: 2,847                                  
│  ❤️ Engagemang: 156 likes, 23 kommentarer                  
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ POST TYP    PLATTFORM   RÄCKVIDD   ENGAGEMANG       │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 📝 Text     X           1,234      89 ❤️             │   │
│  │ 🎬 Video    X           892        45 ❤️             │   │
│  │ 📝 Text     LinkedIn    456        15 ❤️             │   │
│  │ 📸 Bild     Instagram   265        7 ❤️              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Ny post]  [Schemalägg]  [Analysera]                     │
└─────────────────────────────────────────────────────────────┘
```

---

### Ada Suite - Pulse (Social Engagement)

**Pris:** 990 kr/mån

**Vad kunden får:**
- AI svarar på kommentarer och DMs
- Proaktiv engagement med followers
- Identifiering av nya möjligheter
- Trakasserar inte troll/negativa

**Tekniskt flöde:**
```
┌──────────────────────────────────────────────────────────────┐
│                      PULSE ARBETAR                           │
└──────────────────────────────────────────────────────────────┘

  1. Monitoring                                              
     ↓
     ├─ Håller koll på: @kundens-konto                    
     ├─ Letar efter: Nya followers                         
     ├─ Letar efter: Kommentarer/DMs                       
     └─ Letar efter: @omnämnanden                          
         ↓
  2. Analys av engagemang                                    
     ↓
     ├─ Är det positivt? → Svara!                          
     ├─ Är det en fråga? → Svara med info!                 
     ├─ Är det en lead? → Eskalera till Scout              
     └─ Är det troll? → Ignorera                            
         ↓
  3. Proaktiv engagement                                     
     ↓
     ├─ Följer relevanta konton                            
     ├─ Gillar/investerar intressant content               
     └─ Svarar på trender inom branschen                   
         ↓
  4. Rapport                                                 
     └─ Daglig sammanfattning: X nya interaktioner         
```

---

### Ada Suite - Alla tre (Komplett)

**Pris:** 2,990 kr/mån (sparar 480 kr)

**Inkluderar:**
- Allt från Scout + Kent + Pulse
- Koordinerad strategi (allt pratar ihop sig)
- Priority support
- Månads-möte (30 min)

---

## 3. Betalningsflöde

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BETALNING                                         │
└─────────────────────────────────────────────────────────────────────────────┘

  KUND                           ADA SUITE                         LEYMONSQUEEZY
    │                                  │                                    │
    │  1. Väljer paket                 │                                    │
    │─────────────────────────────────>│                                    │
    │                                  │                                    │
    │  2. Klickar "Köp"                │                                    │
    │─────────────────────────────────>│                                    │
    │                                  │  3. Skapar checkout                │
    │                                  │───────────────────────────────────>│
    │                                  │                                    │
    │  4. Redirect till LemonSqueezy    │                                    │
    │<─────────────────────────────────│                                    │
    │                                  │                                    │
    │  5. Betalar (Swish/Kort)          │                                    │
    │──────────────────────────────────────────────────────────────>│
    │                                  │                                    │
    │                                  │         6. Betalning bekräftad     │
    │                                  │<───────────────────────────────────│
    │                                  │                                    │
    │  7. "Tack! Kolla din e-post"     │                                    │
    │<─────────────────────────────────│                                    │
    │                                  │                                    │
    │                                  │  8. Webhook: Ny kund + betalning   │
    │                                  │───────────────────────────────────>│
    │                                  │                                    │
    │                                  │  9. Skapa konto i system          │
    │                                  │  10. Skicka välkomstmail          │
    │                                  │                                    │
    │  11. E-post med inloggningsinfo   │                                    │
    │<─────────────────────────────────│                                    │
    │                                  │                                    │
```

---

## 4. Onboarding Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ONBOARDING (Dag 1-7)                              │
└─────────────────────────────────────────────────────────────────────────────┘

  DAG 1: Välkomst
  ────────────────
  ┌─────────────────────────────────────────────────────────────┐
  │  Hej [Namn]!                                                │
  │                                                             │
  │  Välkommen till Ada Suite! 🦞                               │
  │                                                             │
  │  Vi sätter igång med [Paket]. Du får:                       │
  │  • 10 leads/vecka                                          │
  │  • 4 inlägg/vecka                                          │
  │  • Daglig engagement                                        │
  │                                                             │
  │  Nästa steg: Fyll i din profil (5 min)                     │
  │  [Kom igång →]                                             │
  └─────────────────────────────────────────────────────────────┘

  DAG 1-2: Profilinställningar
  ────────────────────────────
  □ Företagsnamn & logo
  □ Bransch (dropdown)
  □ Geografiskt område
  □ Målgrupp (vilka vill du nå?)
  □ X/LinkedIn konto (för Kent & Pulse)
  □ E-post för outreach (för Scout)

  DAG 3: Första leads levereras
  ──────────────────────────────
  ┌─────────────────────────────────────────────────────────────┐
  │  📊 Dina första 10 leads är klara!                         │
  │                                                             │
  │  Företag         Kontakt       E-post                      │
  │  ─────────────────────────────────────────                 │
  │  Café Vittra     Anna L.      anna@cafevittra.se           │
  │  ...                                                     │
  │                                                             │
  │  [Granska leads]  [Godkänn & mejla]  [Redigera]           │
  └─────────────────────────────────────────────────────────────┘

  DAG 5: Första content publiceras
  ─────────────────────────────────
  □ AI har skapat 4 inlägg
  □ Du granskar & godkänner
  □ Första post publiceras

  DAG 7: Allt rullar
  ───────────────────
  □ Leads: Automatiskt varje vecka
  □ Content: Schemalagt 4x/vecka
  □ Pulse: Aktiverat & övervakar
  □ Dashboard: Visar allt i realtid
```

---

## 5. Teknisk Arkitektur

### Systemöversikt

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ADA SUITE - TEKNISK ARKITEKTUR                      │
└─────────────────────────────────────────────────────────────────────────────┘

                        ┌─────────────────────┐
                        │     KUND            │
                        │   (Webbläsare)      │
                        └──────────┬──────────┘
                                   │
                                   │ HTTPS
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   Kund-portal   │  │  Överblick-sida  │  │   Admin-panel   │            │
│  │  (React/Next.js)│  │   (ada-inc.se)  │  │   (intern)      │            │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘            │
│           │                      │                      │                   │
└───────────┼──────────────────────┼──────────────────────┼───────────────────┘
            │                      │                      │
            └──────────────────────┼──────────────────────┘
                                   │ REST API / GraphQL
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND                                        │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      API SERVER (Node.js / Fastify)                  │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │    │
│  │  │  Auth    │  │  Leads   │  │  Content │  │  Users   │         │    │
│  │  │  Module  │  │  Module  │  │  Module  │  │  Module  │         │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                       │                                      │
│           ┌───────────────────────────┼───────────────────────────┐         │
│           │                           │                           │         │
│           ▼                           ▼                           ▼         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐           │
│  │    DATABASE      │  │   OPENCLAW      │  │   EXTERNAL APIs │           │
│  │   (Supabase)    │  │   GATEWAY       │  │                 │           │
│  │                 │  │                 │  │  • X API        │           │
│  │  • Users        │  │  ┌───────────┐ │  │  • LinkedIn API │           │
│  │  • Leads        │  │  │  Scout    │ │  │  • Vugola API  │           │
│  │  • Content       │  │  └───────────┘ │  │  • Lemonsqueezy│           │
│  │  • Payments      │  │  ┌───────────┐ │  │  • Email (SMTP) │           │
│  │  • Settings      │  │  │  Kent     │ │  │                 │           │
│  │                 │  │  └───────────┘ │  │                 │           │
│  │                 │  │  ┌───────────┐ │  │                 │           │
│  │                 │  │  │  Pulse     │ │  │                 │           │
│  │                 │  │  └───────────┘ │  │                 │           │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Databas-schema (Supabase)

```
┌─────────────────────────────────────────┐
│              USERS                      │
├─────────────────────────────────────────┤
│ id              UUID (PK)              │
│ email           TEXT                    │
│ name            TEXT                    │
│ company_name    TEXT                    │
│ company_logo    TEXT (URL)              │
│ package         TEXT (scout/kent/pulse)|
│ created_at      TIMESTAMP               │
│ subscription_id TEXT                   │
│ lemonsqueezy_id TEXT                   │
└─────────────────┬───────────────────────┘
                  │
                  ├──────────────┐
                  │              │
                  ▼              ▼
┌─────────────────────┐  ┌─────────────────────┐
│       LEADS         │  │     CONTENT         │
├─────────────────────┤  ├─────────────────────┤
│ id                  │  │ id                  │
│ user_id (FK)        │  │ user_id (FK)        │
│ company_name        │  │ platform (x/lkdin)  │
│ contact_name        │  │ content_type        │
│ contact_email       │  │ text                │
│ contact_phone       │  │ media_url           │
│ website             │  │ scheduled_at         │
│ source              │  │ published_at        │
│ status              │  │ status              │
│ created_at          │  │ engagement_count    │
│ notes               │  │ created_at          │
└─────────────────────┘  └─────────────────────┘
```

---

## 6. Användargränssnitt (Wireframes)

### Kundens Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ADA SUITE                           [Företagsnamn ▼]  [Inställningar]│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────┐                                                              │
│  │ 📊 Överblick│  VÄLKOMMEN TILLBAKA, CAFÉ VITTRA!                         │
│  │ 📧 Leads    │                                                              │
│  │ 📝 Content  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ 💬 Pulse    │  │ Leads denna │ │ Content     │ │ Engagement  │           │
│  │ ⚙️ Inställn│  │ veckan: 12  │ │ denna vecka │ │ denna vecka │           │
│  │             │  │ [Visa →]    │ │ 4/4         │ │ 156 ❤️       │           │
│  │             │  └─────────────┘ │ [Visa →]    │ │ [Visa →]    │           │
│  │             │                   └─────────────┘ └─────────────┘           │
│  │             │                                                              │
│  │             │  SENASTE LEADS                                               │
│  │             │  ┌─────────────────────────────────────────────────────┐     │
│  │             │  │ Företag          Kontakt      Status               │     │
│  │             │  ├─────────────────────────────────────────────────────┤     │
│  │             │  │ Hantverkarn AB   Erik S.      ✓ 3 mejl skickade   │     │
│  │             │  │ Sundsvalls Bageri Maria K.     ○ 1 mejl skickat   │     │
│  │             │  │ Bilvård.se       Johan L.     ✓ Svar mottagit!   │     │
│  │             │  └─────────────────────────────────────────────────────┘     │
│  │             │                                                              │
│  │             │  SCHEMALAGDA POSTS                                          │
│  │             │  ┌─────────────────────────────────────────────────────┐     │
│  │             │  │ 📅 Idag 14:00 - X: "Sommar erbjudande..."          │     │
│  │             │  │ 📅 Imorgon 10:00 - LinkedIn: "Vi expanderar..."   │     │
│  │             │  │ 📅 Fre 14:00 - X: "Nyheter i butiken..."          │     │
│  │             │  └─────────────────────────────────────────────────────┘     │
│  └─────────────┘                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Lead-detail vy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Tillbaka till leads                                                      │
│                                                                              │
│  HANTVERKARNA AB                                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                              │
│  📍 Sundsvall    🌐 www.hantverkarna.se    📞 060-123 45                    │
│                                                                              │
│  KONTAKTPERSON                                                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  ┌──────────────┐                                                           │
│  │  👤          │  Erik Ström                                                │
│  │              │  erik@hantverkarna.se                                     │
│  │              │  070-123 45 67                                             │
│  │              │  VD                                                        │
│  └──────────────┘                                                           │
│                                                                              │
│  STATUS                                                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  □ Research klart                                                            │
│  ☑ Mejlsutskick 1 (2026-03-15)                                             │
│  □ Uppföljning skickad (2026-03-18)                                        │
│  ☑ Svar mottaget (2026-03-17) - "Intresserade av offert"                   │
│                                                                              │
│  ÅTGÄRDER                                                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  [📧 Skicka mejl]  [📞 Boka möte]  [📝 Lägg till anteckning]               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Prissättning

### Månadspriser

| Paket | Pris/mån | Leads | Content | Engagement |
|-------|----------|-------|---------|------------|
| **Scout** | 1,490 kr | 10/vecka | - | - |
| **Kent** | 1,490 kr | - | 4-8/vecka | - |
| **Pulse** | 990 kr | - | - | ✅ Auto |
| **Alla tre** | 2,990 kr | 10/vecka | 4-8/vecka | ✅ Auto |

### Årsavtal (20% rabatt)

| Paket | Månadspris | Årspris |
|-------|------------|---------|
| Scout | 1,490 kr | **14,304 kr** (1,192 kr/mån) |
| Kent | 1,490 kr | **14,304 kr** (1,192 kr/mån) |
| Pulse | 990 kr | **9,504 kr** (792 kr/mån) |
| Alla tre | 2,990 kr | **28,704 kr** (2,392 kr/mån) |

---

## 8. Nächsta steg (Roadmap)

### Fas 1: MVP (Vecka 1-4)
- [ ] Scout: Research → Mejla (test med Anja)
- [ ] Kent: Content-skapande (manuellt godkänn)
- [ ] Pulse: Första engagement
- [ ] LemonSqueezy: Checkout + betalning
- [ ] Enkel dashboard: Leads visa

### Fas 2: Första kund (Vecka 5-8)
- [ ] Första betalande kund
- [ ] Scout: Full auto (research → outreach)
- [ ] Kent: Auto-post (med approve)
- [ ] Pulse: Auto-response

### Fas 3: Skala (Månad 3+)
- [ ] Kund-dashboard: Full version
- [ ] Vugola-integration: Video-clips
- [ ] LinkedIn auto-post
- [ ] 10+ kunder

---

## 9. Frågor att besvara

1. **Email:** Ska vi skicka från kundens e-post eller från Ada Suite?
2. **Commitment:** Månadsvis eller 3 månaders bindning?
3. **Support:** Email, chat, eller视频-call?
4. **Content:** Vad är max 4-8 inlägg per vecka?

---

*Dokument skapat av Ada (CEO), 2026-03-19*
*För frågor, kontakta: Andreas via OpenClaw*
