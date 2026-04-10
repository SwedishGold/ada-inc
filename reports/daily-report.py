#!/usr/bin/env python3
"""Ada Inc. - Daglig Rapport Generator"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from datetime import datetime
import os

def create_daily_report():
    today = datetime.now().strftime("%Y-%m-%d")
    output_path = f"/Users/gggggg/.openclaw/workspace/ada-inc/reports/rapport-{today}.pdf"
    
    doc = SimpleDocTemplate(output_path, pagesize=A4, 
                           leftMargin=2*cm, rightMargin=2*cm,
                           topMargin=2*cm, bottomMargin=2*cm)
    
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('Title', parent=styles['Heading1'], fontSize=24, spaceAfter=30)
    heading_style = ParagraphStyle('Heading', parent=styles['Heading2'], fontSize=14, spaceAfter=12, textColor=colors.HexColor('#1a1a2e'))
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontSize=11, spaceAfter=8)
    
    story = []
    
    # Header
    story.append(Paragraph(f"🦞 Ada Inc. Daglig Rapport", title_style))
    story.append(Paragraph(f"Datum: {today}", body_style))
    story.append(Spacer(1, 20))
    
    # X-poster status
    story.append(Paragraph("📱 X/Twitter Status", heading_style))
    story.append(Paragraph("• Morgonpost: ✅ Kördes", body_style))
    story.append(Paragraph("• Kvällspost: ⏳ Schemalagd 18:00", body_style))
    story.append(Paragraph("• USA-post: ⏳ Schemalagd 22:00", body_style))
    story.append(Spacer(1, 15))
    
    # Leads status
    story.append(Paragraph("🎯 Leads & Sales", heading_style))
    story.append(Paragraph("• Nya leads denna vecka: 0", body_style))
    story.append(Paragraph("• Pågående: Anja (Alnö Smådjursklinik)", body_style))
    story.append(Paragraph("• MRR: 15 SEK", body_style))
    story.append(Spacer(1, 15))
    
    # Team status
    story.append(Paragraph("👥 Teamläge", heading_style))
    team_data = [
        ['Agent', 'Status', 'Senast aktiv'],
        ['Kent', '🟢 Idle', 'Idag'],
        ['Scout', '🟢 Idle', 'Idag'],
        ['Pulse', '🟢 Idle', 'Igår'],
        ['Axiom', '🟢 Idle', 'Idag'],
        ['Forge', '🟢 Idle', 'Idag'],
        ['Sentinel', '🟢 Idle', 'Idag'],
    ]
    t = Table(team_data, colWidths=[4*cm, 3*cm, 4*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a1a2e')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f5f5f5')),
        ('GRID', (0, 0), (-1, -1), 1, colors.white),
    ]))
    story.append(t)
    story.append(Spacer(1, 15))
    
    # Prioriteter
    story.append(Paragraph("🎯 Prioriteter imorgon", heading_style))
    story.append(Paragraph("1. Följ upp Anja (Alnö)", body_style))
    story.append(Paragraph("2. Nya leads till AI-startups", body_style))
    story.append(Paragraph("3. Ada Suite LemonSqueezy-launch", body_style))
    story.append(Spacer(1, 20))
    
    # Footer
    story.append(Paragraph("— Ada, CEO 🦞", body_style))
    
    doc.build(story)
    return output_path

if __name__ == "__main__":
    path = create_daily_report()
    print(f"✅ Rapport skapad: {path}")
