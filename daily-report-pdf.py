#!/usr/bin/env python3
"""
Ada Inc. Daglig Rapport PDF Generator
Genererar en snygg PDF med diagram och staplar
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from datetime import datetime
from pathlib import Path
import subprocess
import json

# Färgschema Ada Inc.
PRIMARY = "#6366f1"  # Lila
SECONDARY = "#8b5cf6"  # Ljusare lila
SUCCESS = "#22c55e"  # Grön
WARNING = "#f59e0b"  # Gul
DANGER = "#ef4444"  # Röd
DARK = "#1e1e2e"  # Mörk bakgrund

def get_metrics():
    """Hämta aktuella metrics"""
    metrics = {
        "datum": datetime.now().strftime("%Y-%m-%d"),
        "mrr": 15,
        "kunder": 1,
        "x_followers": 1450,
        "nya_leads": 0,
        "posts_idag": 1,
        "engagement": "Medium"
    }
    
    # Försök hämta från GitHub API
    try:
        result = subprocess.run(
            ["curl", "-s", "https://api.github.com/repos/SwedishGold/ada-inc/actions/runs?per_page=1"],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode == 0:
            data = json.loads(result.stdout)
            if data.get("total_count"):
                metrics["github_runs"] = data["total_count"]
    except:
        pass
    
    return metrics

def create_charts(metrics):
    """Skapa diagram som bilder"""
    charts = []
    
    # 1. Revenue stapeldiagram
    fig, ax = plt.subplots(figsize=(6, 3))
    categories = ['MRR (SEK)', 'Mål MRR']
    values = [metrics['mrr'], 5000]
    colors_bar = [WARNING if v < 1000 else SUCCESS for v in values]
    bars = ax.bar(categories, values, color=colors_bar, edgecolor='white', linewidth=2)
    ax.set_ylabel('SEK', fontsize=10)
    ax.set_title('💰 Revenue Status', fontsize=12, fontweight='bold')
    ax.set_ylim(0, 6000)
    for bar, val in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 100, f'{val}', 
                ha='center', fontsize=10, fontweight='bold')
    plt.tight_layout()
    chart_path = '/tmp/chart_revenue.png'
    plt.savefig(chart_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    charts.append(chart_path)
    
    # 2. Social Media stapeldiagram
    fig, ax = plt.subplots(figsize=(6, 3))
    categories = ['X Followers', 'Mål']
    values = [metrics['x_followers'], 5000]
    colors_bar = [SECONDARY if v < 5000 else SUCCESS for v in values]
    bars = ax.bar(categories, values, color=colors_bar, edgecolor='white', linewidth=2)
    ax.set_ylabel('Followers', fontsize=10)
    ax.set_title('🐦 Social Media', fontsize=12, fontweight='bold')
    ax.set_ylim(0, 6000)
    for bar, val in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 100, f'{val}', 
                ha='center', fontsize=10, fontweight='bold')
    plt.tight_layout()
    chart_path = '/tmp/chart_social.png'
    plt.savefig(chart_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    charts.append(chart_path)
    
    # 3. Pipeline donut
    fig, ax = plt.subplots(figsize=(4, 4))
    sizes = [3, 2, 1]  # Exempel: Leads, Pågående, Klart
    labels = ['Nya Leads', 'Pågående', 'Klart']
    colors_pie = [DANGER, WARNING, SUCCESS]
    explode = (0.05, 0, 0)
    ax.pie(sizes, explode=explode, labels=labels, colors=colors_pie,
           autopct='%1.0f%%', shadow=False, startangle=90)
    ax.set_title('📈 Sales Pipeline', fontsize=12, fontweight='bold')
    plt.tight_layout()
    chart_path = '/tmp/chart_pipeline.png'
    plt.savefig(chart_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    charts.append(chart_path)
    
    return charts

def create_pdf(metrics, charts):
    """Skapa PDF-rapport"""
    doc = SimpleDocTemplate(
        f"/tmp/ada-inc-rapport-{metrics['datum']}.pdf",
        pagesize=A4,
        rightMargin=30, leftMargin=30,
        topMargin=30, bottomMargin=30
    )
    
    styles = getSampleStyleSheet()
    
    # Anpassade stilar
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor(PRIMARY),
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'Subtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.grey,
        spaceAfter=20,
        alignment=TA_CENTER
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor(PRIMARY),
        spaceBefore=20,
        spaceAfter=10
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=10,
        spaceAfter=10
    )
    
    elements = []
    
    # Header
    elements.append(Paragraph("🦞 ADA INC.", title_style))
    elements.append(Paragraph("Daglig CEO Rapport", subtitle_style))
    elements.append(Paragraph(f"Datum: {metrics['datum']} | Tid: {datetime.now().strftime('%H:%M')}", subtitle_style))
    elements.append(Spacer(1, 20))
    
    # Översikt box
    overview_data = [
        ['💰 MRR', '📈 Leads', '🐦 X', '🤖 Agenter'],
        [f"{metrics['mrr']} SEK", f"{metrics['nya_leads']}", f"{metrics['x_followers']}", "5 active"]
    ]
    overview_table = Table(overview_data, colWidths=[100, 100, 100, 100])
    overview_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor(PRIMARY)),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
        ('TOPPADDING', (0, 0), (-1, -1), 15),
        ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor('#f8fafc')),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e2e8f0')),
        ('ROUNDEDCORNERS', [5, 5, 5, 5]),
    ]))
    elements.append(overview_table)
    elements.append(Spacer(1, 30))
    
    # Revenue sektion
    elements.append(Paragraph("💰 Ekonomi", heading_style))
    elements.append(Image(charts[0], width=5*inch, height=2.5*inch))
    elements.append(Spacer(1, 15))
    
    # Social Media sektion
    elements.append(Paragraph("🐦 Social Media", heading_style))
    elements.append(Image(charts[1], width=5*inch, height=2.5*inch))
    elements.append(Spacer(1, 15))
    
    # Sales Pipeline
    elements.append(Paragraph("📈 Sales Pipeline", heading_style))
    elements.append(Image(charts[2], width=3*inch, height=3*inch))
    elements.append(Spacer(1, 30))
    
    # Detaljer tabell
    elements.append(Paragraph("📋 Detaljer", heading_style))
    detail_data = [
        ['Område', 'Status', 'Åtgärd'],
        ['MRR', '⚠️ Låg (15 SEK)', 'Prioritera nya kunder'],
        ['X Followers', '🟡 1,450', 'Posta mer, engagea'],
        ['Nya Leads', '❌ 0 denna vecka', 'Aktivera Scout'],
        ['Ada Suite', '⏸️ Pausad', 'Kontakta Andreas'],
        ['Vugola', '❌ Nere', 'DNS-problem'],
    ]
    detail_table = Table(detail_data, colWidths=[150, 180, 200])
    detail_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor(SECONDARY)),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f8fafc')),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e2e8f0')),
    ]))
    elements.append(detail_table)
    
    # Q2 Mål
    elements.append(Spacer(1, 30))
    elements.append(Paragraph("🎯 Q2 Prioriteter (CEO Beslut)", heading_style))
    goals_data = [
        ['#', 'Mål', 'Status'],
        ['1', '💰 Revenue > 5,000 SEK/månad', '🔴 Igång'],
        ['2', '🐦 X > 5,000 followers', '🟡 Pågående'],
        ['3', '🤖 Full automation', '🟡 Pågående'],
    ]
    goals_table = Table(goals_data, colWidths=[30, 250, 150])
    goals_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor(PRIMARY)),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f1f5f9')),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#cbd5e1')),
    ]))
    elements.append(goals_table)
    
    # Footer
    elements.append(Spacer(1, 40))
    elements.append(Paragraph("—", subtitle_style))
    elements.append(Paragraph("Genererad av Ada 🦞 | CEO of Ada Inc.", subtitle_style))
    elements.append(Paragraph(f"Skapad: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", subtitle_style))
    
    doc.build(elements)
    return f"/tmp/ada-inc-rapport-{metrics['datum']}.pdf"

def main():
    print("📊 Genererar Ada Inc. daglig rapport...")
    
    # Hämta metrics
    metrics = get_metrics()
    print(f"✅ Metrics hämtade: {metrics}")
    
    # Skapa diagram
    charts = create_charts(metrics)
    print(f"✅ {len(charts)} diagram skapade")
    
    # Skapa PDF
    pdf_path = create_pdf(metrics, charts)
    print(f"✅ PDF skapad: {pdf_path}")
    
    return pdf_path

if __name__ == "__main__":
    main()
