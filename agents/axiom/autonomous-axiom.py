#!/usr/bin/env python3
"""
Axiom - Finance Agent for Ada Inc.
Körs varje morgon 07:00
"""
import json
from datetime import datetime

LOG_FILE = "/Users/gggggg/.openclaw/workspace/agents/axiom/rapport.log"
DATA_FILE = "/Users/gggggg/.openclaw/workspace/agents/axiom/finance-data.json"

def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    with open(LOG_FILE, "a") as f:
        f.write(f"[{timestamp}] {msg}\n")

def check_revenue():
    """Kolla intäkter från LemonSqueezy"""
    log("🔍 Kollar LemonSqueezy...")
    # TODO: Anslut LemonSqueezy API för att hämta revenue
    # Just nu: placeholder
    log("⚠️ LemonSqueezy API inte konfigurerat ännu")
    return {"mrr": 0, "customers": 0}

def check_expenses():
    """Kolla utgifter"""
    log("🔍 Kollar utgifter...")
    # TODO: Kolla kostnader (server, API:er, etc)
    return {"costs": 0}

def daily_summary():
    """Daglig sammanfattning"""
    log("="*50)
    log("AXIOM - DAGLIG RAPPORT")
    log("="*50)
    
    revenue = check_revenue()
    expenses = check_expenses()
    
    mrr = revenue.get("mrr", 0)
    costs = expenses.get("costs", 0)
    profit = mrr - costs
    
    log(f"💰 MRR: {mrr} SEK")
    log(f"💸 Kostnader: {costs} SEK")
    log(f"📈 Resultat: {profit} SEK")
    log(f"👥 Kunder: {revenue.get('customers', 0)}")
    
    # Spara till datafil
    data = {
        "date": datetime.now().isoformat(),
        "mrr": mrr,
        "costs": costs,
        "profit": profit,
        "customers": revenue.get("customers", 0)
    }
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)
    
    log("✅ Rapport sparad")
    log("="*50)

if __name__ == "__main__":
    daily_summary()
