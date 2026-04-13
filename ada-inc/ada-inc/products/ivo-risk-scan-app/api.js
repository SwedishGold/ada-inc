// IVO Risk-Scan - API Handler
// Använder MiniMax M2.1 för AI-analys

const API_CONFIG = {
    // MiniMax API-nyckel
    apiKey: 'sk-api-UeYxfoClR-U56uTTYL6JB0fdOJGupnd2DfiWudUWr1Tiw5NQoqPL5JkvejuHa6Oy6Mg-PbU2UODTDOovR_92gQGQlz9OirN-p4ukMoZmydIZB4sn_h631RI',
    baseUrl: 'https://api.minimax.chat/v1',
    model: 'MiniMax-M2.1'
};

// IVO Knowledge Base - Kraven som AI:n ska jämföra mot
const IVO_KRAV = `
## IVO:s Dokumentationskrav (Sammanfattning)

### Patientjournal (3 kap. PDL)
1. **Patientens identitet** - Namn, personnummer
2. **Vårdgivare** - Vem som utfört vården
3. **Datum och tid** - När vården utfördes
4. **Åtgärder** - Vad som gjorts
5. **Ställningstagande** - Bedömning och plan
6. **Information** - Vad patienten informerats om
7. **Samtycke** - Om patienten samtyckt

### SBAR (rekommenderas av IVO)
- **S**ituation - Vad händer nu?
- **B**akgrund - Vad är bakgrunden?
- **A**ssessment - Vad är din bedömning?
- **R**ecommendation - Vad behöver göras?

### Vanliga brister IVO ser:
1. Bristande journalföring
2. Saknar datum/tid
3. Otydlig bedömning
4. Ingen dokumentation av patientsamtal
5. Ingen风险bedömning
`;

// System prompt för IVO-analys
const SYSTEM_PROMPT = `Du är IVO Risk-Scan, en AI-assistent specialiserad på riskanalys för svensk vård.

${IVO_KRAV}

Din uppgift är att:
1. ANALYSERA journalanteckningar mot IVO:s krav
2. JÄMFÖRA vad som saknas mot kraven
3. GE konkreta förbättringsförslag

SVARA ALLTID PÅ SVENSKA.

Ge svar i följande format:

## SBAR-analys
- **Situation:** (Vad är problemet?)
- **Bakgrund:** (Vad har hänt tidigare?)
- **Bedömning:** (Vad tror du händer?)
- **Rekommendation:** (Vad bör göras?)

## IVO-kravjämförelse
För varje krav i checklistan, ange:
- ✅ UPPFYLLT
- ❌ SAKNAS
- ⚠️ DELVIS

Kraven att kontrollera:
- [ ] Patientens identitet dokumenterad
- [ ] Datum och tid
- [ ] Vårdgivare angiven
- [ ] Åtgärder beskrivna
- [ ] Bedömning/ställningstagande
- [ ] Information till patient
- [ ] Samtycke dokumenterat (om relevant)

## Identifierade riskord
Lista alla riskord/fraser du hittar i texten.

## Risknivå
Ge en bedömning: LÅG, MEDEL eller HÖG
Förklara kort varför.

## Rekommendationer
Ge 3-5 konkreta förbättringsförslag.

## Kritiska varningsflaggor
Om det finns allvarliga risker, markera dessa tydligt.`;

// Auto-fix: Omskriv journal enligt IVO-krav
async function autoFixJournal(text) {
    const prompt = `Du är en vård-dokumentationsexpert. Omskriv följande journalanteckning så att den uppfyller IVO:s krav.

${IVO_KRAV}

Uppgift: Omskriv journalanteckningen så att den innehåller:
1. SBAR-struktur
2. Alla obligatoriska element (patient, datum, åtgärd, bedömning)
3. Tydlig och professionell språk

ORIGINAL:
${text}

SVARA ENBART MED DEN FÄRDIGA JOURNALANTECKNINGEN, inga förklaringar.`;

    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/text/chatcompletion_v2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: API_CONFIG.model,
                messages: [
                    { role: 'system', content: prompt },
                    { role: 'user', content: text }
                ],
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error('API-anrop misslyckades');
        }

        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('Auto-fix error:', error);
        throw new Error('Kunde inte omskriva journalen');
    }
}

// Analyzera text med AI
async function analyzeJournal(text) {
    if (!text || text.trim().length < 10) {
        throw new Error('Vänligen ange en längre journalanteckning');
    }

    // Anropa AI (för nuvarande via OpenClaw's LLM)
    // I produktion: använd MiniMax API direkt
    try {
        const result = await callAI(text);
        return parseAIResponse(result);
    } catch (error) {
        console.error('AI analysis failed:', error);
        throw new Error('Kunde inte analysera texten. Försök igen.');
    }
}

// Anropa AI med MiniMax API
async function callAI(text) {
    const prompt = `${SYSTEM_PROMPT}

Analysera följande journalanteckning:

${text}`;

    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/text/chatcompletion_v2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: API_CONFIG.model,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: `Analysera följande journalanteckning:\n\n${text}` }
                ],
                temperature: 0.3
            })
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('API Error:', error);
            throw new Error('API-anrop misslyckades');
        }

        const data = await response.json();
        
        // Extrahera svaret
        const aiResponse = data.choices[0].message.content;
        
        // Parsa svaret till vårt format
        return parseAIResponse(aiResponse);
        
    } catch (error) {
        console.error('AI Error:', error);
        // Fallback till mock om API inte funkar
        return mockAIResponse(text);
    }
}

// Mock-respons för prototyp
function mockAIResponse(text) {
    // Analysera texten enkelt för demo
    const lowerText = text.toLowerCase();
    
    const riskWords = [];
    const riskPatterns = [
        { word: 'bröstsmärta', risk: 'HÖG', category: 'Kardiovaskulärt' },
        { word: 'acs', risk: 'HÖG', category: 'Kardiovaskulärt' },
        { word: 'st-sänkning', risk: 'HÖG', category: 'EKG-fynd' },
        { word: 'troponin', risk: 'MEDEL', category: 'Labb' },
        { word: 'övervakning', risk: 'MEDEL', category: 'Åtgärd' },
        { word: 'blek', risk: 'LÅG', category: 'Status' },
        { word: 'bt', risk: 'LÅG', category: 'Vitala parametrar' },
        { word: 'blodtryck', risk: 'LÅG', category: 'Vitala parametrar' }
    ];

    riskPatterns.forEach(pattern => {
        if (lowerText.includes(pattern.word)) {
            riskWords.push({ word: pattern.word, risk: pattern.risk, category: pattern.category });
        }
    });

    // Bestäm övergripande risknivå
    let riskLevel = 'LÅG';
    if (riskWords.some(r => r.risk === 'HÖG')) {
        riskLevel = 'HÖG';
    } else if (riskWords.some(r => r.risk === 'MEDEL')) {
        riskLevel = 'MEDEL';
    }

    return {
        sbar: {
            situation: 'Patient med bröstsmärta och misstänkt hjärtinfarkt',
            bakgrund: 'Tidigare hjärt-kar sjukdom oklart',
            bedömning: 'Misstänkt akut koronart syndrom (ACS)',
            rekommendation: 'Troponinprover, EKG-övervakning, kardiologkontakt'
        },
        riskWords: riskWords,
        riskLevel: riskLevel,
        recommendations: [
            'Upprepa EKG inom 3 timmar',
            'Kontrollera troponin-serie',
            'Säkerställ övervakningsplats',
            'Kontakta kardiolog akut',
            'Dokumentera tid för första EKG'
        ]
    };
}

// Parsa AI-svar till vårt format
function parseAIResponse(response) {
    // AI:n svarar på svenska, vi parsar strukturen
    try {
        // Hitta SBAR-sektionen
        const sbarMatch = response.match(/## SBAR-analys[\s\S]*?(?=##|$)/i);
        const sbarText = sbarMatch ? sbarMatch[0] : '';
        
        const situation = extractValue(sbarText, 'Situation') || 'Se analys';
        const bakgrund = extractValue(sbarText, 'Bakgrund') || 'Se analys';
        const bedomning = extractValue(sbarText, 'Bedömning') || extractValue(sbarText, 'Bedömning') || 'Se analys';
        const rekommendation = extractValue(sbarText, 'Rekommendation') || 'Se analys';
        
        // Hitta riskord
        const riskMatch = response.match(/## Identifierade riskord[\s\S]*?(?=##|$)/i);
        const riskText = riskMatch ? riskMatch[0] : '';
        const riskWords = parseRiskWords(riskText);
        
        // Hitta risknivå
        const levelMatch = response.match(/## Risknivå[\s\S]*?(LÅG|MEDEL|HÖG)[\s\S]*?(?=##|$)/i);
        let riskLevel = 'MEDEL';
        if (levelMatch) {
            const level = levelMatch[1].toUpperCase();
            if (level.includes('HÖG')) riskLevel = 'HÖG';
            else if (level.includes('LÅG')) riskLevel = 'LÅG';
            else riskLevel = 'MEDEL';
        }
        
        // Hitta rekommendationer
        const recMatch = response.match(/## Rekommendationer[\s\S]*?(?=##|$)/i);
        const recommendations = parseList(recMatch ? recMatch[0] : '');
        
        // Hitta IVO-kravjämförelse
        const compMatch = response.match(/## IVO-kravjämförelse[\s\S]*?(?=##|$)/i);
        const comparison = parseIVOComparison(compMatch ? compMatch[0] : '');
        
        return {
            sbar: {
                situation: situation,
                bakgrund: bakgrund,
                bedömning: bedomning,
                rekommendation: rekommendation
            },
            riskWords: riskWords,
            riskLevel: riskLevel,
            recommendations: recommendations.length > 0 ? recommendations : ['Se full analys'],
            ivocComparison: comparison,
            rawResponse: response
        };
        
    } catch (error) {
        console.error('Parse error:', error);
        // Returnera rått svar om parsing misslyckas
        return {
            sbar: {
                situation: 'Kunde inte parse',
                bakgrund: '-',
                bedömning: '-',
                rekommendation: '-'
            },
            riskWords: [],
            riskLevel: 'MEDEL',
            recommendations: ['Se rådata'],
            rawResponse: response
        };
    }
}

// Hjälpfunktioner för att extrahera värden
function extractValue(text, key) {
    const match = text.match(new RegExp(`${key}[:\\s]+([^\\n]+)`, 'i'));
    return match ? match[1].trim() : null;
}

function parseRiskWords(text) {
    // Extrahera riskord från text
    const words = [];
    const lines = text.split('\n');
    lines.forEach(line => {
        const clean = line.replace(/^[•\-\*]\s*/, '').trim();
        if (clean && clean.length < 50 && !clean.startsWith('#')) {
            words.push({ word: clean, risk: 'MEDEL', category: 'Identifierad' });
        }
    });
    return words.slice(0, 10);
}

function parseList(text) {
    const items = [];
    const lines = text.split('\n');
    lines.forEach(line => {
        const clean = line.replace(/^[•\-\*]\s*/, '').replace(/^\d+\.\s*/, '').trim();
        if (clean && clean.length > 5 && !clean.startsWith('#')) {
            items.push(clean);
        }
    });
    return items.slice(0, 5);
}

// Parse IVO comparison
function parseIVOComparison(text) {
    const items = [];
    const lines = text.split('\n');
    lines.forEach(line => {
        const clean = line.trim();
        if (clean.includes('[') || clean.includes('✓') || clean.includes('❌') || clean.includes('⚠️')) {
            items.push(clean);
        }
    });
    return items;
}

// Beräkna uppskattad token-användning
function estimateTokens(text) {
    // Roughly: 1 token ≈ 4 tecken för svenska
    return Math.ceil(text.length / 4) + 200; // +200 för prompt
}

// Kontrollera om användaren har credits
function hasCredits() {
    // DEBUG: Alltid true för testning
    return true;
    // const credits = getCredits();
    // return credits > 0;
}

// Hämta antal credits
function getCredits() {
    // DEBUG: Obegränsat för testning
    return 999;
    // const stored = localStorage.getItem('ivo_credits');
    // return stored ? parseInt(stored) : 5;
}

// Spara credits
function setCredits(amount) {
    localStorage.setItem('ivo_credits', amount.toString());
}

// Använd 1 credit
function useCredit() {
    // DEBUG: Använd inte credits för testning
    return 999;
    // const credits = getCredits();
    // if (credits <= 0) {
    //     throw new Error('Inga credits kvar! Uppgradera din plan.');
    // }
    // setCredits(credits - 1);
    // return credits - 1;
}

// Exportera funktioner
window.ivoAPI = {
    analyze: analyzeJournal,
    autoFix: autoFixJournal,
    getCredits,
    setCredits,
    useCredit,
    hasCredits,
    estimateTokens
};
