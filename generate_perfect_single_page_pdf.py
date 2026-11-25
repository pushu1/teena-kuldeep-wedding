import os
import shutil
import qrcode
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register Georgia and Nirmala fonts
fonts_dir = r'C:\Windows\Fonts'
try:
    pdfmetrics.registerFont(TTFont('Georgia', os.path.join(fonts_dir, 'georgia.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia-Bold', os.path.join(fonts_dir, 'georgiab.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia-Italic', os.path.join(fonts_dir, 'georgiai.ttf')))
except Exception as e:
    print('Error registering Georgia fonts:', e)

PROJECT_ROOT = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding'
ASSETS_DIR = os.path.join(PROJECT_ROOT, 'assets')
OUTPUT_DIR = os.path.join(PROJECT_ROOT, 'public', 'downloads')
DOWNLOADS_DIR = os.path.join(PROJECT_ROOT, 'downloads')
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(DOWNLOADS_DIR, exist_ok=True)

TARGET_PDF = os.path.join(ASSETS_DIR, 'Kuldeep_Teena_Royal_Wedding_Invitation.pdf')
CARD_IMG = os.path.join(ASSETS_DIR, 'authoritative_user_attached_invitation.jpg')

def generate_single_page_pdf():
    page_w, page_h = A4 # 595.28 x 841.89 points
    mid_x = page_w / 2
    c = canvas.Canvas(TARGET_PDF, pagesize=A4)
    c.setTitle('Kuldeep & Teena — Upadhyay Family Royal Wedding Invitation')
    c.setAuthor('Upadhyay Family, Pali')
    c.setSubject('Official Royal Wedding Invitation of Kuldeep Weds Teena (Single Page Edition)')

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

    # 1. Background Fill
    c.setFillColor(c_teal_dark)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)

    # 2. Draw Authoritative User Attached Card Image (Top Section)
    card_w = 516.0
    card_h = card_w / (768.0 / 1024.0) # 688.0 pt
    card_x = (page_w - card_w) / 2     # 39.64 pt
    card_y = page_h - card_h - 14.0    # 139.89 pt

    if os.path.exists(CARD_IMG):
        c.drawImage(CARD_IMG, card_x, card_y, width=card_w, height=card_h)

    # Add subtle gold frame around the card
    c.setStrokeColor(c_gold_rich)
    c.setLineWidth(1.0)
    c.roundRect(card_x, card_y, card_w, card_h, 6, fill=0, stroke=1)

    # 3. Interactive Hyperlink Annotations over the Two Circular Buttons
    # Button 1 (CLICK HERE): left=24.74%, top=70.31%, width=19.27%, height=15.14% in 768x1024
    b1_x = card_x + card_w * 0.235
    b1_y = card_y + card_h * (1.0 - 0.855) # ReportLab y is from bottom
    b1_w = card_w * 0.21
    b1_h = card_h * 0.165
    c.linkURL(website_url, (b1_x, b1_y, b1_x + b1_w, b1_y + b1_h), relative=0)

    # Button 2 (VIEW VENUE): left=56.0%, top=70.31%, width=18.23%, height=15.14% in 768x1024
    b2_x = card_x + card_w * 0.54
    b2_y = card_y + card_h * (1.0 - 0.855)
    b2_w = card_w * 0.21
    b2_h = card_h * 0.165
    c.linkURL(venue_page_url, (b2_x, b2_y, b2_x + b2_w, b2_y + b2_h), relative=0)

    # 4. Bottom Reception Venue Section with Scannable QR Code
    venue_card_x = card_x
    venue_card_y = 12.0
    venue_card_w = card_w
    venue_card_h = card_y - venue_card_y - 8.0 # ~120 pt

    # Outer gold ornamental frame
    c.setFillColor(c_teal_rich)
    c.setStrokeColor(c_gold_rich)
    c.setLineWidth(1.2)
    c.roundRect(venue_card_x, venue_card_y, venue_card_w, venue_card_h, 8, fill=1, stroke=1)

    c.setStrokeColor(c_gold_antique)
    c.setLineWidth(0.6)
    c.roundRect(venue_card_x + 3, venue_card_y + 3, venue_card_w - 6, venue_card_h - 6, 6, fill=0, stroke=1)

    # Header: RECEPTION — 13 DECEMBER 2026
    y_header = venue_card_y + venue_card_h - 16
    c.setFillColor(c_gold_bright)
    c.setFont("Georgia-Bold", 10.5)
    c.drawCentredString(mid_x, y_header, "RECEPTION   —   13 DECEMBER 2026")

    # Divider line
    y_div = y_header - 7
    c.setStrokeColor(c_gold_antique)
    c.setLineWidth(0.5)
    c.line(venue_card_x + 30, y_div, venue_card_x + venue_card_w - 30, y_div)

    # Left Column: Scannable QR Code
    qr_display_size = 72.0
    qr_x = venue_card_x + 20
    qr_y = venue_card_y + 12

    # White backing for QR code
    c.setFillColor(colors.white)
    c.roundRect(qr_x - 3, qr_y - 3, qr_display_size + 6, qr_display_size + 6, 4, fill=1, stroke=0)
    c.drawImage(qr_path, qr_x, qr_y, width=qr_display_size, height=qr_display_size)

    # QR Caption
    c.setFillColor(c_gold_bright)
    c.setFont("Helvetica-Bold", 6.5)
    c.drawCentredString(qr_x + qr_display_size/2, qr_y - 8, "SCAN FOR DIRECTIONS")

    # Right Column: Venue address & Google Maps Link
    r_col_x = qr_x + qr_display_size + 18
    y_text = y_div - 13

    c.setFillColor(c_gold_bright)
    c.setFont("Georgia-Bold", 11.0)
    c.drawString(r_col_x, y_text, "VENUE: Jain Bagbera Dadawadi")

    y_text -= 13
    c.setFillColor(c_ivory)
    c.setFont("Georgia", 8.2)
    c.drawString(r_col_x, y_text, "Venkatesh Marg, Near Venkatesh Temple, Pali (Raj.) — 306401")

    y_text -= 12
    c.setFillColor(c_sage)
    c.setFont("Georgia-Italic", 7.8)
    c.drawString(r_col_x, y_text, "Aashirwad Samaroh & Preetibhoj • 06:00 PM Onwards")

    # Clickable Button: OPEN GOOGLE MAPS
    y_text -= 24
    btn_link_w = 165
    btn_link_h = 19
    c.setFillColor(c_gold_rich)
    c.roundRect(r_col_x, y_text, btn_link_w, btn_link_h, 5, fill=1, stroke=0)

    c.setFillColor(c_teal_dark)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawCentredString(r_col_x + btn_link_w/2, y_text + 5.5, "📍 OPEN GOOGLE MAPS ↗")

    # Hyperlink annotation for Google Maps button
    c.linkURL(maps_url, (r_col_x, y_text, r_col_x + btn_link_w, y_text + btn_link_h), relative=0)

    # RSVP line
    c.setFillColor(c_gold_bright)
    c.setFont("Helvetica-Bold", 7.0)
    c.drawString(r_col_x + btn_link_w + 12, y_text + 6, "RSVP: +91 94610 61236")

    # Strict Single Page Enforcement
    c.save()
    print("Generated Single-Page PDF matching attached design at:", TARGET_PDF)

    # Synchronize to all targets
    for dest in [
        os.path.join(ASSETS_DIR, 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(OUTPUT_DIR, 'kuldeep-teena-wedding-invitation.pdf'),
        os.path.join(DOWNLOADS_DIR, 'kuldeep-teena-wedding-invitation.pdf')
    ]:
        shutil.copy2(TARGET_PDF, dest)
        print("Synchronized PDF copy to:", dest)

if __name__ == '__main__':
    generate_single_page_pdf()