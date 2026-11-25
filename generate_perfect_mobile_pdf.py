import os
import shutil
import qrcode
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import pypdfium2 as pdfium

# Register Georgia fonts
fonts_dir = r'C:\Windows\Fonts'
try:
    pdfmetrics.registerFont(TTFont('Georgia', os.path.join(fonts_dir, 'georgia.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia-Bold', os.path.join(fonts_dir, 'georgiab.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia-Italic', os.path.join(fonts_dir, 'georgiai.ttf')))
except Exception as e:
    print('Fonts info:', e)

PROJECT_ROOT = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
ASSETS_DIR = os.path.join(PROJECT_ROOT, 'assets')
OUTPUT_DIR = os.path.join(PROJECT_ROOT, 'public', 'downloads')
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, 'downloads')
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(DOWNLOADS_DIR, exist_ok=True)

TARGET_PDF = os.path.join(ASSETS_DIR, 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf')
CARD_IMG = os.path.join(ASSETS_DIR, 'authoritative_user_attached_invitation.jpg')

def generate_mobile_optimized_pdf():
    # Native card dimensions: 768 x 1024
    # Page width matches card exactly: 768 points -> Zero side gutters!
    page_w = 768.0
    card_w = 768.0
    card_h = 1024.0

    # Venue section height
    venue_h = 210.0
    gap = 14.0
    bot_margin = 16.0
    page_h = card_h + gap + venue_h + bot_margin # Exactly 1264.0 pt -> Zero blank space at bottom!

    mid_x = page_w / 2.0
    c = canvas.Canvas(TARGET_PDF, pagesize=(page_w, page_h))
    c.setTitle('Kuldeep & Teena — Upadhyay Family Royal Wedding Invitation')
    c.setAuthor('Upadhyay Family, Pali')
    c.setSubject('Official Royal Wedding Invitation of Kuldeep Weds Teena (Mobile Optimized Edition)')

    c_teal_dark = colors.HexColor('#061C20')     # Deep Midnight Peacock Teal
    c_teal_rich = colors.HexColor('#0B2E34')     # Rich Peacock Teal
    c_gold_rich = colors.HexColor('#DFBF77')     # Champagne Gold
    c_gold_bright = colors.HexColor('#F8E4BA')   # Shimmering Light Gold
    c_gold_antique = colors.HexColor('#A8843B')  # Antique Bevel Gold
    c_ivory = colors.HexColor('#FAF6EF')         # Warm Silk Ivory
    c_sage = colors.HexColor('#8FA89B')          # Soft Sage

    website_url = 'https://pushu1.github.io/param-pummy-wedding/#invitation'
    venue_page_url = 'https://pushu1.github.io/param-pummy-wedding/#venue'
    maps_url = 'https://maps.app.goo.gl/hPi6DXWJZEpUG5Vm9'

    # Ensure scannable QR code exists
    qr_path = os.path.join(ASSETS_DIR, 'venue_maps_qr.png')
    qr = qrcode.QRCode(version=1, box_size=10, border=4)
    qr.add_data(maps_url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color='black', back_color='white')
    qr_img.save(qr_path)

    # 1. Background Fill (Full Page Teal)
    c.setFillColor(c_teal_dark)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)

    # 2. Draw Authoritative User Attached Card Image (Top Section, Edge-to-Edge)
    card_x = 0.0
    card_y = page_h - card_h # Sits exactly flush with top of page (y = 240.0)

    if os.path.exists(CARD_IMG):
        c.drawImage(CARD_IMG, card_x, card_y, width=card_w, height=card_h)

    # 3. Interactive Hyperlink Annotations over the Two Circular Buttons on Card
    # Button 1 (CLICK HERE): left=23.0%, top=69.5%, width=23.5%, height=16.0% in 768x1024
    b1_x = card_x + card_w * 0.23
    b1_y = card_y + card_h * (1.0 - 0.855)
    b1_w = card_w * 0.235
    b1_h = card_h * 0.16
    c.linkURL(website_url, (b1_x, b1_y, b1_x + b1_w, b1_y + b1_h), relative=0)

    # Button 2 (VIEW VENUE): left=53.5%, top=69.5%, width=23.5%, height=16.0% in 768x1024
    b2_x = card_x + card_w * 0.535
    b2_y = card_y + card_h * (1.0 - 0.855)
    b2_w = card_w * 0.235
    b2_h = card_h * 0.16
    c.linkURL(maps_url, (b2_x, b2_y, b2_x + b2_w, b2_y + b2_h), relative=0)

    # 4. Bottom Reception Venue Frame (Starts immediately below card, ends at bottom margin)
    venue_card_x = 16.0
    venue_card_y = bot_margin # 16.0 pt from bottom
    venue_card_w = page_w - 32.0 # 736.0 pt
    venue_card_h = venue_h # 210.0 pt

    # Outer gold ornamental frame
    c.setFillColor(c_teal_rich)
    c.setStrokeColor(c_gold_rich)
    c.setLineWidth(1.8)
    c.roundRect(venue_card_x, venue_card_y, venue_card_w, venue_card_h, 10, fill=1, stroke=1)

    # Inner subtle inset border
    c.setStrokeColor(c_gold_antique)
    c.setLineWidth(0.8)
    c.roundRect(venue_card_x + 4, venue_card_y + 4, venue_card_w - 8, venue_card_h - 8, 8, fill=0, stroke=1)

    # Decorative Corner Diamonds
    c.setFillColor(c_gold_bright)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(venue_card_x + 8, venue_card_y + venue_card_h - 16, "❖")
    c.drawString(venue_card_x + venue_card_w - 18, venue_card_y + venue_card_h - 16, "❖")
    c.drawString(venue_card_x + 8, venue_card_y + 8, "❖")
    c.drawString(venue_card_x + venue_card_w - 18, venue_card_y + 8, "❖")

    # Header: RECEPTION — 13 DECEMBER 2026
    y_header = venue_card_y + venue_card_h - 26
    c.setFillColor(c_gold_bright)
    c.setFont("Georgia-Bold", 15.0)
    c.drawCentredString(mid_x, y_header, "RECEPTION   —   13 DECEMBER 2026")

    # Divider line with center ornament
    y_div = y_header - 10
    c.setStrokeColor(c_gold_antique)
    c.setLineWidth(0.8)
    c.line(venue_card_x + 40, y_div, mid_x - 18, y_div)
    c.line(mid_x + 18, y_div, venue_card_x + venue_card_w - 40, y_div)
    c.setFillColor(c_gold_bright)
    c.setFont("Georgia", 10)
    c.drawCentredString(mid_x, y_div - 3, "✦")

    # Left Column: Scannable QR Code
    qr_display_size = 120.0
    qr_x = venue_card_x + 24
    qr_y = venue_card_y + 24

    # White backing for QR code
    c.setFillColor(colors.white)
    c.roundRect(qr_x - 5, qr_y - 5, qr_display_size + 10, qr_display_size + 10, 6, fill=1, stroke=0)
    c.drawImage(qr_path, qr_x, qr_y, width=qr_display_size, height=qr_display_size)

    # QR Caption
    c.setFillColor(c_gold_bright)
    c.setFont("Helvetica-Bold", 9.0)
    c.drawCentredString(qr_x + qr_display_size/2, qr_y - 14, "SCAN FOR DIRECTIONS")

    # Link over QR code
    c.linkURL(maps_url, (qr_x, qr_y, qr_x + qr_display_size, qr_y + qr_display_size), relative=0)

    # Right Column: Venue address & Google Maps Link
    r_col_x = qr_x + qr_display_size + 28
    y_text = y_div - 22

    c.setFillColor(c_gold_bright)
    c.setFont("Georgia-Bold", 15.0)
    c.drawString(r_col_x, y_text, "VENUE: Jain Bagbera Dadawadi")

    y_text -= 20
    c.setFillColor(c_ivory)
    c.setFont("Georgia", 11.5)
    c.drawString(r_col_x, y_text, "Venkatesh Marg, Near Venkatesh Temple, Pali (Raj.) — 306401")

    y_text -= 18
    c.setFillColor(c_sage)
    c.setFont("Georgia-Italic", 11.0)
    c.drawString(r_col_x, y_text, "Aashirwad Samaroh & Preetibhoj • 06:00 PM Onwards")

    # Google Maps CTA Button
    y_btn = y_text - 42
    btn_w = 230.0
    btn_h = 32.0
    btn_x = r_col_x

    c.setFillColor(c_gold_rich)
    c.setStrokeColor(c_gold_bright)
    c.setLineWidth(1.0)
    c.roundRect(btn_x, y_btn, btn_w, btn_h, 16, fill=1, stroke=1)

    c.setFillColor(colors.HexColor('#061C20'))
    c.setFont("Georgia-Bold", 11.0)
    c.drawCentredString(btn_x + btn_w / 2.0, y_btn + 10.0, "📍 OPEN GOOGLE MAPS ↗")
    c.linkURL(maps_url, (btn_x, y_btn, btn_x + btn_w, y_btn + btn_h), relative=0)

    # Family RSVP text next to button
    c.setFillColor(c_gold_bright)
    c.setFont("Georgia", 9.5)
    c.drawString(btn_x + btn_w + 18, y_btn + 16, "UPADHYAY FAMILY, PALI")
    c.setFillColor(c_ivory)
    c.drawString(btn_x + btn_w + 18, y_btn + 4, "RSVP: +91 94610 61236 • +91 98879 97822")

    # Save PDF
    c.showPage()
    c.save()
    print(f"Generated Mobile-Optimized PDF: {TARGET_PDF} (Page Size: {page_w} x {page_h} pt)")

    # Sync to all public and downloads paths
    sync_paths = [
        os.path.join(ASSETS_DIR, 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(OUTPUT_DIR, 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(DOWNLOADS_DIR, 'kuldeep-teena-wedding-invitation.pdf')
    ]
    for sp in sync_paths:
        shutil.copy2(TARGET_PDF, sp)
        print(f"Synced PDF to: {sp}")

if __name__ == '__main__':
    generate_mobile_optimized_pdf()
