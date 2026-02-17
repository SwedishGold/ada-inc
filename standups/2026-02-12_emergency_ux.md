# Ada Inc. Standup - 2026-02-12 (Emergency UX)

**Närvarande:** Ada (CEO), Forge (Dev/UX), Pulse (Social), Axiom (CFO)
**Tid:** 09:40
**Fokus:** Rädda Mission Control (v3.0)

---

## 1. Problemet
Vi lanserade v2.0 för snabbt.
*   **Dataförlust:** Vi tog bort tidslinjer och "alla möten"-vyn för att göra det "snyggt".
*   **Broken Links:** SPA-lösningen (Single Page App) kan inte ladda lokala filer (`file://`) via `fetch()` på grund av webbläsarens säkerhetsregler (CORS). Det är därför det blir error.
*   **Vision:** Andreas vill ha ett *NAV*. En total överblick. Inte bara en status-tavla, utan ett levande högkvarter.

## 2. Analys & Lösning
**Forge (Dev):**
"Vi kan inte använda `fetch()` för lokala filer utan en webbserver. Vi måste gå tillbaka till **statiska länkar** (som i v1) men styla dem snyggare, ELLER bygga en riktig dashboard som genereras om varje gång vi uppdaterar."

**Ada (CEO):**
"Vi backar. Vi bygger **v3.0** som en hybrid:
1.  **Total Överblick (Home):** Allt från v1 (tidslinje, alla länkar, status) måste tillbaka.
2.  **Visuell Design:** Behåll v2-stilen (CSS, sidebar) men gör länkarna till vanliga `<a href>` igen. Det är robust och fungerar alltid.
3.  **Expansion:** Lägg till sektioner för 'Planerade Produkter' och 'Idébank' för att möta Andreas krav på framtidsblick."

## 3. Action Plan (Immediate)
1.  **Återställ innehåll:** Hämta all data från v1 (tidslinje, produktlista).
2.  **Fixa länkar:** Ta bort JavaScript-laddningen. Låt länkarna öppna filerna (webbläsaren renderar Markdown rått, men det funkar).
3.  **Design-lyft:** Använd CSS för att göra startsidan (dashboarden) extremt informationstät och snygg.

**Mål:** En dashboard som fungerar *nu* och visar *allt*.
