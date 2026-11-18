import os
import sys
import shutil
import qrcode
from PIL import Image, ImageDraw, ImageFilter
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register system fonts for Latin and Devanagari
try:
    pdfmetrics.registerFont(TTFont('Georgia', r'C:\Windows\Fonts\georgia.ttf'))
    pdfmetrics.registerFont(TTFont('Georgia-Bold', r'C:\Windows\Fonts\georgiab.ttf'))
    pdfmetrics.registerFont(TTFont('Georgia-Italic', r'C:\Windows\Fonts\georgiai.ttf'))
except Exception as e:
    print('Georgia font fallback:', e)

try:
    pdfmetrics.registerFont(TTFont('Nirmala', r'C:\Windows\Fonts\Nirmala.ttf'))
    pdfmetrics.registerFont(TTFont('Nirmala-Bold', r'C:\Windows\Fonts\NirmalaB.ttf'))
except Exception as e:
    print('Nirmala font fallback:', e)

PROJECT_ROOT = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
ASSETS_DIR = os.path.join(PROJECT_ROOT, 'assets')
OUTPUT_DIR = os.path.join(PROJECT_ROOT, 'public', 'downloads')
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(os.path.join(PROJECT_ROOT, 'downloads'), exist_ok=True)

PDF_OUTPUT_PATH = os.path.join(OUTPUT_DIR, 'kuldeep-teena-wedding-invitation.pdf')

def generate_pdf():
    width, height = A4 # 595.27 x 841.89 points
    c = canvas.Canvas(PDF_OUTPUT_PATH, pagesize=A4)
    c.setTitle('Kuldeep & Teena — Official Royal Wedding Invitation')
    c.setAuthor('Upadhyay Family')
    c.setSubject('Official Royal Wedding Invitation of Chiranjeev Kuldeep & Sou. Ka. Teena')

    website_url = 'https://pushu1.github.io/param-pummy-wedding/'
    maps_url = 'https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9'
    bg_texture = os.path.join(ASSETS_DIR, 'pdf_golden_paper_a4.jpg')
    groom_arch = os.path.join(ASSETS_DIR, 'groom_arch.png')
    bride_arch = os.path.join(ASSETS_DIR, 'bride_arch.png')
    seal_path = os.path.join(ASSETS_DIR, 'kt_wax_seal.png')
    qr_path = os.path.join(ASSETS_DIR, 'venue_maps_qr.png')

    # Ensure QR code exists
    if not os.path.exists(qr_path):
        qr = qrcode.QRCode(version=1, box_size=10, border=2)
        qr.add_data(maps_url)
        qr.make(fit=True)
        img = qr.make_image(fill_color='#4A0E17', back_color='#FFFFFF')
        img.save(qr_path)

    # Color definitions
    c_gold = colors.HexColor('#C49A45')
    c_gold_light = colors.HexColor('#F3E5AB')
    c_gold_deep = colors.HexColor('#A07828')
    c_maroon = colors.HexColor('#6B1724')
    c_deep_maroon = colors.HexColor('#4A0E17')
    c_cream = colors.HexColor('#FFF5DE')
    c_parchment = colors.HexColor('#FDF7ED')
    c_brown = colors.HexColor('#55402B')
    c_brown_muted = colors.HexColor('#7E654E')

    # Vector Ornaments Drawers
    def draw_corner_filigree(cx, cy, fx, fy, color=c_gold):
        c.saveState()
        c.setStrokeColor(color)
        c.setFillColor(color)
        c.setLineWidth(1.4)
        s = 20
        c.line(cx, cy, cx + fx * s, cy)
        c.line(cx, cy, cx, cy + fy * s)
        c.circle(cx + fx * 6, cy + fy * 6, 2.2, fill=1, stroke=0)
        c.circle(cx + fx * 13, cy + fy * 4, 1.4, fill=1, stroke=0)
        c.circle(cx + fx * 4, cy + fy * 13, 1.4, fill=1, stroke=0)
        c.restoreState()

    def draw_gold_star(cx, cy, r=3.5, color=c_gold):
        c.saveState()
        c.setFillColor(color)
        p = c.beginPath()
        p.moveTo(cx, cy + r)
        p.lineTo(cx + r * 0.32, cy + r * 0.32)
        p.lineTo(cx + r, cy)
        p.lineTo(cx + r * 0.32, cy - r * 0.32)
        p.lineTo(cx, cy - r)
        p.lineTo(cx - r * 0.32, cy - r * 0.32)
        p.lineTo(cx - r, cy)
        p.lineTo(cx - r * 0.32, cy + r * 0.32)
        p.close()
        c.drawPath(p, fill=1, stroke=0)
        c.restoreState()

    def draw_center_medallion(cx, cy, color=c_gold):
        c.saveState()
        c.setStrokeColor(color)
        c.setFillColor(color)
        c.setLineWidth(1.0)
        c.circle(cx, cy, 9, fill=0, stroke=1)
        c.circle(cx, cy, 6, fill=0, stroke=1)
        draw_gold_star(cx, cy, r=3.8, color=color)
        for offset in [-16, 16]:
            c.circle(cx + offset, cy, 1.8, fill=1, stroke=0)
            c.circle(cx, cy + offset, 1.8, fill=1, stroke=0)
        c.restoreState()

    # =========================================================================
    # PAGE 1: LUXURY ROYAL WEDDING COVER
    # =========================================================================
    # 1. Golden handmade paper background
    if os.path.exists(bg_texture):
        c.drawImage(bg_texture, 0, 0, width=width, height=height)
    else:
        c.setFillColor(c_cream)
        c.rect(0, 0, width, height, fill=1, stroke=0)

    # 2. Outer and inner double gold ornamental borders
    c.setStrokeColor(c_gold)
    c.setLineWidth(2.2)
    c.roundRect(18, 18, width - 36, height - 36, 12, stroke=1, fill=0)

    c.setStrokeColor(c_gold_deep)
    c.setLineWidth(0.8)
    c.roundRect(24, 24, width - 48, height - 48, 8, stroke=1, fill=0)

    draw_corner_filigree(28, height - 28, 1, -1)
    draw_corner_filigree(width - 28, height - 28, -1, -1)
    draw_corner_filigree(28, 28, 1, 1)
    draw_corner_filigree(width - 28, 28, -1, 1)

    # 3. Auspicious Invocations at Top
    y1 = height - 56
    c.setFont('Nirmala-Bold', 15)
    c.setFillColor(c_maroon)
    c.drawCentredString(width / 2, y1, '॥ श्री गणेशाय नमः ॥')

    y1 -= 16
    c.setFont('Georgia-Italic', 10.5)
    c.setFillColor(c_gold_deep)
    title_sub = 'A U S P I C I O U S   W E D D I N G   I N V I T A T I O N'
    c.drawCentredString(width / 2, y1, title_sub)
    draw_gold_star((width / 2) - 138, y1 + 3.5, r=3.5, color=c_gold_deep)
    draw_gold_star((width / 2) + 138, y1 + 3.5, r=3.5, color=c_gold_deep)

    y1 -= 18
    c.setFont('Georgia-Bold', 12)
    c.setFillColor(c_deep_maroon)
    c.drawCentredString(width / 2, y1, 'UPADHYAY FAMILY INVITATION')

    # 4. Arched Portraits Showcase (Side-by-side)
    pw, ph = 180, 230
    spacing = 28
    start_x = (width - (pw * 2 + spacing)) / 2
    portraits_y = y1 - 22 - ph

    if os.path.exists(groom_arch):
        c.drawImage(groom_arch, start_x, portraits_y, width=pw, height=ph, mask='auto')
    if os.path.exists(bride_arch):
        c.drawImage(bride_arch, start_x + pw + spacing, portraits_y, width=pw, height=ph, mask='auto')

    # Ornamental center flourish between portraits
    draw_center_medallion(width / 2, portraits_y + (ph / 2), color=c_gold)

    # Names under portraits
    c.setFont('Georgia-Bold', 12)
    c.setFillColor(c_maroon)
    c.drawCentredString(start_x + (pw / 2), portraits_y - 15, 'Chiranjeev Kuldeep')
    c.drawCentredString(start_x + pw + spacing + (pw / 2), portraits_y - 15, 'Sou. Ka. Teena')

    # 5. Main Couple's Title: KULDEEP WEDS TEENA
    names_y = portraits_y - 56
    c.setFont('Georgia-Bold', 34)
    c.setFillColor(c_deep_maroon)
    c.drawCentredString(width / 2, names_y, 'K U L D E E P')

    c.setFont('Georgia-Italic', 18)
    c.setFillColor(c_gold_deep)
    c.drawCentredString(width / 2, names_y - 25, '—   w e d s   —')

    c.setFont('Georgia-Bold', 34)
    c.setFillColor(c_deep_maroon)
    c.drawCentredString(width / 2, names_y - 58, 'T E E N A')

    # 6. Date & Location Headline
    date_y = names_y - 105
    c.setStrokeColor(c_gold)
    c.setLineWidth(1)
    line_w = 75
    c.line((width / 2) - line_w - 110, date_y + 5, (width / 2) - 110, date_y + 5)
    c.line((width / 2) + 110, date_y + 5, (width / 2) + line_w + 110, date_y + 5)

    c.setFont('Georgia-Bold', 17)
    c.setFillColor(c_maroon)
    c.drawCentredString(width / 2, date_y, 'FRIDAY, 11 DECEMBER 2026')

    c.setFont('Georgia', 10.5)
    c.setFillColor(c_brown)
    c.drawCentredString(width / 2, date_y - 18, 'P A L I ,   R A J A S T H A N')

    # 7. Subtle Hint to Page 2
    c.setFont('Georgia-Italic', 9.5)
    c.setFillColor(c_brown_muted)
    c.drawCentredString(width / 2, 42, 'Turn page for Sacred Ceremonies Schedule & GPS Navigation >>')

    c.showPage()

    # =========================================================================
    # PAGE 2: CEREMONIAL SCHEDULE, WAX SEAL, CLICKABLE BANNER & GPS MAP
    # =========================================================================
    # Background
    if os.path.exists(bg_texture):
        c.drawImage(bg_texture, 0, 0, width=width, height=height)
    else:
        c.setFillColor(c_cream)
        c.rect(0, 0, width, height, fill=1, stroke=0)

    # Double gold borders
    c.setStrokeColor(c_gold)
    c.setLineWidth(2.2)
    c.roundRect(18, 18, width - 36, height - 36, 12, stroke=1, fill=0)

    c.setStrokeColor(c_gold_deep)
    c.setLineWidth(0.8)
    c.roundRect(24, 24, width - 48, height - 48, 8, stroke=1, fill=0)

    draw_corner_filigree(28, height - 28, 1, -1)
    draw_corner_filigree(width - 28, height - 28, -1, -1)
    draw_corner_filigree(28, 28, 1, 1)
    draw_corner_filigree(width - 28, 28, -1, 1)

    # Top Sacred Invocation
    y2 = height - 50
    c.setFont('Nirmala-Bold', 13)
    c.setFillColor(c_maroon)
    c.drawCentredString(width / 2, y2, '॥ श्री विनायकजी महाराज की असीम अनुकम्पा से ॥')

    # Ancestral Lineage Blessings
    y2 -= 16
    c.setFont('Nirmala', 8)
    c.setFillColor(c_brown_muted)
    c.drawCentredString(width / 2, y2, 'स्व. श्रीमती जमना देवी - स्व. श्री हरचंदजी उपाध्याय (सुपड़पौत्र) एवं स्व. श्रीमती पेपी देवी - स्व. श्री चम्पालालजी उपाध्याय (सुपौत्र)')

    # Formal Invitation Announcement
    y2 -= 18
    c.setFont('Georgia-Bold', 10.5)
    c.setFillColor(c_deep_maroon)
    c.drawCentredString(width / 2, y2, 'Smt. Chandra Devi & Shri Jasrajji Upadhyay')
    y2 -= 12
    c.setFont('Georgia', 8.5)
    c.setFillColor(c_brown)
    c.drawCentredString(width / 2, y2, 'cordially invite you to celebrate the auspicious wedding ceremony of their beloved son')

    # Couple names with family lineage
    y2 -= 20
    c.setFont('Georgia-Bold', 14)
    c.setFillColor(c_maroon)
    c.drawCentredString(width / 2, y2, 'Chiranjeev Kuldeep')

    y2 -= 12
    c.setFont('Nirmala-Bold', 10)
    c.setFillColor(c_gold_deep)
    c.drawCentredString(width / 2, y2, '— संग —')

    y2 -= 14
    c.setFont('Georgia-Bold', 14)
    c.setFillColor(c_maroon)
    c.drawCentredString(width / 2, y2, 'Sou. Ka. Teena')

    y2 -= 11
    c.setFont('Georgia-Italic', 8)
    c.setFillColor(c_brown_muted)
    c.drawCentredString(width / 2, y2, 'Daughter of Smt. Manju Devi & Shri Ramgopalji Vajpayee • Granddaughter of Late Smt. Janki Devi & Late Shri Chhogalalji Vajpayee')

    # Ceremonies Schedule Box
    y2 -= 14
    box_w = width - 64
    box_h = 160
    box_x = (width - box_w) / 2
    box_y = y2 - box_h

    # Parchment fill for box
    c.setFillColor(c_parchment)
    c.setStrokeColor(c_gold)
    c.setLineWidth(1.4)
    c.roundRect(box_x, box_y, box_w, box_h, 8, stroke=1, fill=1)

    c.setFont('Nirmala-Bold', 10.5)
    c.setFillColor(c_maroon)
    c.drawCentredString(width / 2, box_y + box_h - 15, 'मांगलिक पलों का सफर • WEDDING CEREMONIES SCHEDULE')

    c.setStrokeColor(c_gold_light)
    c.setLineWidth(0.7)
    c.line(box_x + 16, box_y + box_h - 20, box_x + box_w - 16, box_y + box_h - 20)

    ceremonies = [
        ('घृतपान (धूपवान):', '05 दिसम्बर 2026, शनिवार — प्रातः 07.30 बजे (निज निवास)'),
        ('विनायक स्थापना:', '07 दिसम्बर 2026, सोमवार — प्रातः 09.15 बजे (निज निवास)'),
        ('मायरा (भात):', '10 दिसम्बर 2026, गुरूवार — प्रातः 10.00 बजे (निज निवास)'),
        ('जनेऊ संस्कार:', '10 दिसम्बर 2026, गुरूवार — शाम 04.00 बजे (निज निवास)'),
        ('बंदोली:', '10 दिसम्बर 2026, गुरूवार — शाम 07.00 बजे (निज निवास)'),
        ('बारात प्रस्थान:', '11 दिसम्बर 2026, शुक्रवार — प्रातः 07.30 बजे (निज निवास)'),
        ('पाणिग्रहण संस्कार:', '11 दिसम्बर 2026, शुक्रवार — मध्यरात्रि 02.00 बजे (शुभ विवाह मंडप)'),
        ('आशीर्वाद एवं प्रीतिभोज:', '13 दिसम्बर 2026, रविवार — सायं 06.00 बजे से (जैन बागबेरा दादावाडी, पाली)'),
    ]

    cur_ey = box_y + box_h - 34
    for c_title, c_desc in ceremonies:
        c.setFont('Nirmala-Bold', 7.8)
        c.setFillColor(c_maroon)
        c.drawString(box_x + 14, cur_ey, c_title)

        c.setFont('Nirmala', 7.8)
        c.setFillColor(c_brown)
        c.drawString(box_x + 135, cur_ey, c_desc)
        cur_ey -= 16

    # Wax Seal in Center
    seal_y = box_y - 20
    if os.path.exists(seal_path):
        seal_size = 44
        c.drawImage(seal_path, (width - seal_size) / 2, seal_y - seal_size / 2, width=seal_size, height=seal_size, mask='auto')

    # Interactive Clickable Digital Invitation Banner
    banner_w = width - 74
    banner_h = 54
    banner_x = (width - banner_w) / 2
    banner_y = seal_y - 30 - banner_h

    c.setFillColor(c_maroon)
    c.setStrokeColor(c_gold)
    c.setLineWidth(1.8)
    c.roundRect(banner_x, banner_y, banner_w, banner_h, 9, stroke=1, fill=1)

    c.setStrokeColor(c_gold_light)
    c.setLineWidth(0.8)
    c.roundRect(banner_x + 3, banner_y + 3, banner_w - 6, banner_h - 6, 7, stroke=1, fill=0)

    c.setFont('Georgia-Bold', 12)
    c.setFillColor(c_gold_light)
    c.drawCentredString(width / 2, banner_y + 30, 'OPEN INTERACTIVE DIGITAL INVITATION')
    draw_gold_star((width / 2) - 150, banner_y + 34, r=4.0, color=c_gold_light)
    draw_gold_star((width / 2) + 150, banner_y + 34, r=4.0, color=c_gold_light)

    c.setFont('Georgia-Italic', 8.5)
    c.setFillColor(colors.HexColor('#FFF2D1'))
    c.drawCentredString(width / 2, banner_y + 14, 'Tap anywhere on this banner to experience the animated wedding invitation website >>')

    # Embedded clickable hyperlink on banner
    c.linkURL(website_url, (banner_x, banner_y, banner_x + banner_w, banner_y + banner_h), relative=0)

    # Reception Venue & Google Maps QR Code Section
    qr_size = 68
    bottom_y = banner_y - qr_size - 20
    qr_x = (width / 2) - qr_size - 75

    if os.path.exists(qr_path):
        c.setFillColor(colors.white)
        c.setStrokeColor(c_gold)
        c.roundRect(qr_x - 3, bottom_y - 3, qr_size + 6, qr_size + 6, 4, stroke=1, fill=1)
        c.drawImage(qr_path, qr_x, bottom_y, width=qr_size, height=qr_size)
        c.linkURL(maps_url, (qr_x - 3, bottom_y - 3, qr_x + qr_size + 3, bottom_y + qr_size + 3), relative=0)

    note_x = qr_x + qr_size + 14
    c.setFont('Nirmala-Bold', 9)
    c.setFillColor(c_maroon)
    c.drawString(note_x, bottom_y + 54, 'आशीर्वाद समारोह स्थल (Reception Venue):')

    c.setFont('Nirmala-Bold', 8.5)
    c.setFillColor(c_deep_maroon)
    c.drawString(note_x, bottom_y + 40, 'जैन बागबेरा दादावाडी, वेंकटेश मार्ग, पाली (राज.)')

    c.setFont('Georgia', 7.5)
    c.setFillColor(c_brown_muted)
    c.drawString(note_x, bottom_y + 27, '• Scan or tap QR code for direct GPS Google Maps navigation')

    c.setFont('Georgia-Bold', 7.5)
    c.setFillColor(c_gold_deep)
    c.drawString(note_x, bottom_y + 15, '• Tap here: Open Reception Location in Google Maps >>')
    c.linkURL(maps_url, (note_x, bottom_y + 13, note_x + 230, bottom_y + 25), relative=0)

    c.setFont('Nirmala', 7.5)
    c.setFillColor(c_brown_muted)
    c.drawString(note_x, bottom_y + 3, '• संपर्क: जसराजजी उपाध्याय (9461061236, 9887997822)')

    # Footer Acknowledgement (Uttarakanxi / Hosts)
    footer_text = 'उत्तराकांक्षी: जसराज मांगीलाल उपाध्याय (सुपुत्र स्व. श्री चम्पालालजी उपाध्याय) • 255, 256, राम नगर, तीसरी गली, पाली (राज.)'
    c.setFont('Nirmala', 7)
    c.setFillColor(c_brown_muted)
    c.drawCentredString(width / 2, 34, footer_text)

    c.save()
    print(f'Successfully generated PDF at: {PDF_OUTPUT_PATH}')

    # Copy to alternate locations for universal access
    alt_paths = [
        os.path.join(PROJECT_ROOT, 'downloads', 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(ASSETS_DIR, 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(ASSETS_DIR, 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf')
    ]
    for p in alt_paths:
        shutil.copyfile(PDF_OUTPUT_PATH, p)
        print(f'Copied PDF to: {p}')

    return PDF_OUTPUT_PATH

if __name__ == '__main__':
    generate_pdf()
