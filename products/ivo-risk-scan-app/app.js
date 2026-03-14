// IVO Risk-Scan - Main Application

document.addEventListener('DOMContentLoaded', () => {
    // Init
    initApp();
    
    // Event Listeners
    document.getElementById('analyze-btn').addEventListener('click', runAnalysis);
    document.getElementById('clear-btn').addEventListener('click', clearInput);
    document.getElementById('export-pdf').addEventListener('click', exportPDF);
    document.getElementById('copy-clipboard').addEventListener('click', copyToClipboard);
    document.getElementById('upgrade-btn').addEventListener('click', showUpgradeModal);
    document.getElementById('close-modal').addEventListener('click', hideUpgradeModal);
    document.getElementById('auto-fix-btn').addEventListener('click', runAutoFix);
    document.getElementById('use-fixed-btn').addEventListener('click', useFixedJournal);
    
    // Close modal on outside click
    document.getElementById('upgrade-modal').addEventListener('click', (e) => {
        if (e.target.id === 'upgrade-modal') {
            hideUpgradeModal();
        }
    });
});

// Initialisera appen
function initApp() {
    updateCreditsDisplay();
    loadTodayStats();
    
    // Visa credits i header
    const credits = window.ivoAPI.getCredits();
    document.getElementById('credits-display').textContent = `${credits} credits`;
    document.getElementById('sidebar-credits').textContent = credits;
}

// Uppdatera credits-visning
function updateCreditsDisplay() {
    const credits = window.ivoAPI.getCredits();
    document.getElementById('credits-display').textContent = `${credits} credits`;
    document.getElementById('sidebar-credits').textContent = credits;
}

// Ladda dagens statistik
function loadTodayStats() {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('ivo_today_count');
    const storedDate = localStorage.getItem('ivo_today_date');
    
    if (stored && storedDate === today) {
        document.getElementById('today-count').textContent = stored;
    } else {
        document.getElementById('today-count').textContent = '0';
    }
}

// Spara dagens analyser
function saveTodayCount(count) {
    const today = new Date().toDateString();
    localStorage.setItem('ivo_today_count', count.toString());
    localStorage.setItem('ivo_today_date', today);
}

// Kör analys
async function runAnalysis() {
    const input = document.getElementById('journal-input').value;
    
    // Validera input
    if (!input || input.trim().length < 20) {
        showError('Vänligen ange en längre journalanteckning (minst 20 tecken)');
        return;
    }
    
    // Kolla credits
    if (!window.ivoAPI.hasCredits()) {
        showError('Inga credits kvar! Uppgradera din plan.');
        showUpgradeModal();
        return;
    }
    
    // Visa loading
    hideError();
    showLoading(true);
    document.getElementById('analyze-btn').disabled = true;
    
    try {
        // Kör AI-analys
        const result = await window.ivoAPI.analyze(input);
        
        // Använd 1 credit
        const remainingCredits = window.ivoAPI.useCredit();
        
        // Uppdatera statistik
        const todayCount = parseInt(document.getElementById('today-count').textContent) + 1;
        saveTodayCount(todayCount);
        
        // Visa resultat
        displayResults(result);
        
        // Uppdatera UI
        updateCreditsDisplay();
        document.getElementById('today-count').textContent = todayCount;
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
        document.getElementById('analyze-btn').disabled = false;
    }
}

// Visa resultat
function displayResults(result) {
    const resultsSection = document.getElementById('results');
    resultsSection.style.display = 'block';
    
    // Risk Level
    const riskBadge = document.getElementById('risk-level').querySelector('.risk-badge');
    riskBadge.textContent = result.riskLevel;
    riskBadge.className = `risk-badge ${result.riskLevel.toLowerCase()}`;
    
    // SBAR
    const sbarHtml = `
        <div class="sbar-item">
            <strong>Situation:</strong> ${result.sbar.situation}
        </div>
        <div class="sbar-item">
            <strong>Bakgrund:</strong> ${result.sbar.bakgrund}
        </div>
        <div class="sbar-item">
            <strong>Bedömning:</strong> ${result.sbar.bedömning}
        </div>
        <div class="sbar-item">
            <strong>Rekommendation:</strong> ${result.sbar.rekommendation}
        </div>
    `;
    document.getElementById('sbar-output').innerHTML = sbarHtml;
    
    // Risk Words
    const tagsHtml = result.riskWords.map(r => 
        `<span class="tag">${r.word} (${r.risk})</span>`
    ).join('');
    document.getElementById('risk-words').innerHTML = tagsHtml || '<span>Inga riskord identifierade</span>';
    
    // IVO Comparison
    if (result.ivocComparison && result.ivocComparison.length > 0) {
        const compHtml = result.ivocComparison.map(item => {
            let icon = '⚪';
            if (item.includes('✅') || item.includes('✓')) icon = '✅';
            if (item.includes('❌')) icon = '❌';
            if (item.includes('⚠️')) icon = '⚠️';
            return `<div class="ivo-item">${item}</div>`;
        }).join('');
        document.getElementById('ivo-comparison').innerHTML = compHtml;
    } else {
        document.getElementById('ivo-comparison').innerHTML = '<span>Se analys för detaljer</span>';
    }
    
    // Recommendations
    const recHtml = result.recommendations.map(r => `<li>${r}</li>`).join('');
    document.getElementById('recommendations').innerHTML = `<ul>${recHtml}</ul>`;
    
    // Scrolla till resultat
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Rensa input
function clearInput() {
    document.getElementById('journal-input').value = '';
    document.getElementById('results').style.display = 'none';
    hideError();
}

// Exportera PDF (placeholder)
function exportPDF() {
    // I produktion: använd jsPDF eller liknande
    alert('PDF-export kommer snart! 📄');
}

// Kopiera till clipboard
function copyToClipboard() {
    const results = document.getElementById('results');
    const text = results.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Kopierat till urklipp! 📋');
    }).catch(() => {
        alert('Kunde inte kopiera');
    });
}

// Visa uppgraderingsmodal
function showUpgradeModal() {
    document.getElementById('upgrade-modal').style.display = 'flex';
}
}

// Dölj uppgraderingsmodal
function hideUpgradeModal() {
    document.getElementById('upgrade-modal').style.display = 'none';
}

// Visa loading
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

// Visa fel
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Dölj fel
function hideError() {
    document.getElementById('error').style.display = 'none';
}

// Auto-fix: Omskriv journal
async function runAutoFix() {
    const originalText = document.getElementById('journal-input').value;
    
    if (!originalText || originalText.trim().length < 10) {
        showError('Ange en journalanteckning först');
        return;
    }
    
    const btn = document.getElementById('auto-fix-btn');
    btn.disabled = true;
    btn.textContent = '⏳ Omskriver...';
    
    try {
        const fixedText = await window.ivoAPI.autoFix(originalText);
        
        document.getElementById('auto-fix-result').style.display = 'block';
        document.getElementById('fixed-journal').value = fixedText;
        
    } catch (error) {
        showError(error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = '✨ Omskriv journal';
    }
}

// Använd den omskrivna journalen
function useFixedJournal() {
    const fixedText = document.getElementById('fixed-journal').value;
    if (fixedText) {
        document.getElementById('journal-input').value = fixedText;
        document.getElementById('auto-fix-result').style.display = 'none';
    }
}
