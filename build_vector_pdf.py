import os
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register Georgia fonts
fonts_dir = r'C:\Windows\Fonts'
try:
    pdfmetrics.registerFont(TTFont('Georgia', os.path.join(fonts_dir, 'georgia.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia-Bold', os.path.join(fonts_dir, 'georgiab.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia-Italic', os.path.join(fonts_dir, 'georgiai.ttf')))
    pdfmetrics.registerFont(TTFont('Georgia-BoldItalic', os.path.join(fonts_dir, 'georgiaz.ttf')))
except Exception as e:
    print('Error registering Georgia:', e)

def draw_diamond(c, cx, cy, rx, ry, color):
    c.saveState()
    c.setFillColor(color)
    p = c.beginPath()
    p.moveTo(cx, cy + ry)
    p.lineTo(cx + rx, cy)
    p.lineTo(cx, cy - ry)
    p.lineTo(cx - rx, cy)
    p.close()
    c.drawPath(p, fill=1, stroke=0)
    c.restoreState()

def generate_minimal_vector_pdf():
    pdf_path = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\Kuldeep_Teena_Royal_Wedding_Invitation.pdf'
    assets_dir = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets'

    page_w, page_h = A4
    c = canvas.Canvas(pdf_path, pagesize=A4)
    c.setTitle('Kuldeep & Teena — Upadhyay Family Wedding Invitation')
    c.setAuthor('Upadhyay Family, Pali')
    c.setSubject('Official Animated Vector Wedding Invitation of Kuldeep Weds Teena')

    # Color Palette: Deep Peacock Teal & Champagne Gold
    c_teal_dark = colors.HexColor('#061C20')     # Midnight Peacock Teal
    c_teal_mid = colors.HexColor('#0B2E34')      # Rich Peacock Teal
    c_teal_light = colors.HexColor('#13464F')    # Luminous Teal
    c_gold_rich = colors.HexColor('#DFBF77')     # Champagne Gold
    c_gold_bright = colors.HexColor('#F8E4BA')   # Shimmering Gold
    c_gold_dim = colors.HexColor('#A8843B')      # Antique Gold
    c_ivory = colors.HexColor('#FAF6EF')         # Warm Silk Ivory
    c_rosegold = colors.HexColor('#D8A499')      # Subtle Rose-Gold
    c_sage = colors.HexColor('#7E988A')          # Muted Sage Green

    # 1. Base Deep Peacock Teal Background
    c.setFillColor(c_teal_dark)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)

    # 2. Subtle Radiant Radial Glow behind center medallion
    mid_x = page_w / 2
    medallion_cy = page_h * 0.53

    for r in range(260, 100, -25):
        alpha = 0.03 + (260 - r) * 0.0006
        c.setFillColor(c_teal_light, alpha=alpha)
        c.circle(mid_x, medallion_cy, r, fill=1, stroke=0)

    # 3. Opulent Champagne Gold Double Ornamental Borders
    c.setFillColor(c_gold_rich, alpha=1.0)
    c.setStrokeColor(c_gold_rich)
    c.setLineWidth(1.8)
    c.roundRect(22, 22, page_w - 44, page_h - 44, 14, fill=0, stroke=1)

    c.setStrokeColor(c_gold_dim)
    c.setLineWidth(0.8)
    c.roundRect(28, 28, page_w - 56, page_h - 56, 11, fill=0, stroke=1)

    # Corner Filigree Accents
    def draw_corner(cx, cy, fx, fy):
        c.saveState()
        c.setStrokeColor(c_gold_rich)
        c.setLineWidth(1.2)
        c.setFillColor(c_gold_bright)
        s = 22
        c.line(cx, cy, cx + fx * s, cy)
        c.line(cx, cy, cx, cy + fy * s)
        c.circle(cx + fx * 7, cy + fy * 7, 2.2, fill=1, stroke=0)
        c.circle(cx + fx * 14, cy + fy * 3, 1.4, fill=1, stroke=0)
        c.circle(cx + fx * 3, cy + fy * 14, 1.4, fill=1, stroke=0)
        c.restoreState()

    draw_corner(34, page_h - 34, 1, -1)
    draw_corner(page_w - 34, page_h - 34, -1, -1)
    draw_corner(34, 34, 1, 1)
    draw_corner(page_w - 34, 34, -1, 1)

    # =========================================================================
    # TOP HEADER: INVOCATION & UPADHYAY FAMILY INVITATION
    # =========================================================================
    y = page_h - 60
    c.setFillColor(c_gold_rich)
    c.setFont("Georgia-Bold", 10.5)
    c.drawCentredString(mid_x, y, "SHRI GANESHAYA NAMAH")
    draw_diamond(c, mid_x - 110, y + 3.5, 4, 4, c_gold_bright)
    draw_diamond(c, mid_x + 110, y + 3.5, 4, 4, c_gold_bright)

    y -= 14
    c.setFillColor(c_sage)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(mid_x, y, "WITH THE DIVINE BLESSINGS OF BELOVED ELDERS")

    y -= 26
    c.setFillColor(c_gold_bright)
    c.setFont("Georgia-Bold", 21)
    c.drawCentredString(mid_x, y, "UPADHYAY FAMILY INVITATION")

    y -= 14
    c.setFillColor(c_ivory)
    c.setFont("Georgia-Italic", 10.2)
    c.drawCentredString(mid_x, y, "cordially invites you to celebrate the joyous union of")

    # Flourish divider
    y -= 8
    c.setStrokeColor(c_gold_dim)
    c.setLineWidth(0.6)
    c.line(mid_x - 80, y, mid_x - 16, y)
    c.line(mid_x + 16, y, mid_x + 80, y)
    draw_diamond(c, mid_x, y, 4, 4, c_gold_bright)

    # =========================================================================
    # CENTERPIECE: TRANSPARENT CIRCULAR VECTOR ROYAL COUPLE MEDALLION
    # =========================================================================
    couple_circle_img = os.path.join(assets_dir, 'couple_looking_circle.png')
    medallion_size = 320
    medallion_x = mid_x - (medallion_size / 2)
    medallion_y = y - 18 - medallion_size

    if os.path.exists(couple_circle_img):
        # Outer shimmering gold aura ring
        c.setStrokeColor(c_gold_bright)
        c.setLineWidth(2.2)
        c.circle(mid_x, medallion_y + medallion_size/2, medallion_size/2 + 5, fill=0, stroke=1)
        
        c.setStrokeColor(c_gold_dim)
        c.setLineWidth(0.8)
        c.circle(mid_x, medallion_y + medallion_size/2, medallion_size/2 + 9, fill=0, stroke=1)

        # Draw the transparent circular couple medallion
        c.drawImage(couple_circle_img, medallion_x, medallion_y, width=medallion_size, height=medallion_size, mask='auto')

    # =========================================================================
    # COUPLE NAMES: KULDEEP WEDS TEENA
    # =========================================================================
    y_names = medallion_y - 28
    c.setFillColor(c_gold_bright)
    c.setFont("Georgia-Bold", 26)
    c.drawCentredString(mid_x, y_names, "K U L D E E P   W E D S   T E E N A")

    # =========================================================================
    # WEDDING & RECEPTION DATES (MINIMAL & PROMINENT)
    # =========================================================================
    y_dates = y_names - 26
    date_badge_w = 340
    date_badge_h = 28
    date_badge_x = mid_x - (date_badge_w / 2)

    c.setFillColor(c_teal_mid)
    c.setStrokeColor(c_gold_rich)
    c.setLineWidth(1.2)
    c.roundRect(date_badge_x, y_dates, date_badge_w, date_badge_h, 14, fill=1, stroke=1)

    c.setFillColor(c_gold_bright)
    c.setFont("Georgia-Bold", 10.5)
    c.drawCentredString(mid_x, y_dates + 8.5, "11 DECEMBER 2026   •   RECEPTION — 13 DECEMBER 2026")

    # Venue subtitle
    y_venue = y_dates - 17
    c.setFillColor(c_ivory)
    c.setFont("Georgia-Italic", 9.5)
    c.drawCentredString(mid_x, y_venue, "Jain Bagbera Dadawadi • Venkatesh Marg, Pali (Rajasthan)")

    # =========================================================================
    # CIRCULAR ROYAL GOLD SEAL ACTION BUTTON: "CLICK HERE"
    # =========================================================================
    btn_r = 34
    btn_cy = y_venue - 48
    btn_cx = mid_x

    # Shimmering golden outer ring with pulse rays
    c.setStrokeColor(c_gold_bright)
    c.setLineWidth(1.8)
    c.circle(btn_cx, btn_cy, btn_r + 5, fill=0, stroke=1)

    c.setStrokeColor(c_gold_dim)
    c.setLineWidth(0.8)
    c.circle(btn_cx, btn_cy, btn_r + 9, fill=0, stroke=1)

    # Gold solid medallion body
    c.setFillColor(colors.HexColor('#C49E4A'))
    c.circle(btn_cx, btn_cy, btn_r, fill=1, stroke=0)

    c.setFillColor(colors.HexColor('#DFBF77'))
    c.circle(btn_cx, btn_cy, btn_r - 3, fill=1, stroke=0)

    c.setFillColor(colors.HexColor('#0B2E34'))
    c.circle(btn_cx, btn_cy, btn_r - 5, fill=1, stroke=0)

    # Button Text: CLICK HERE
    c.setFillColor(c_gold_bright)
    c.setFont("Georgia-Bold", 8.8)
    c.drawCentredString(btn_cx, btn_cy + 5, "CLICK")
    c.drawCentredString(btn_cx, btn_cy - 7, "HERE")
    draw_diamond(c, btn_cx - 18, btn_cy - 1, 2.5, 2.5, c_gold_rich)
    draw_diamond(c, btn_cx + 18, btn_cy - 1, 2.5, 2.5, c_gold_rich)

    # Embed clickable URL on the circular medallion
    website_url = "https://pushu1.github.io/param-pummy-wedding/"
    c.linkURL(website_url, (btn_cx - btn_r - 10, btn_cy - btn_r - 10, btn_cx + btn_r + 10, btn_cy + btn_r + 10), relative=0)

    # Hint caption below button
    c.setFillColor(c_gold_rich)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawCentredString(mid_x, btn_cy - btn_r - 16, "TAP SEAL TO OPEN ANIMATED DIGITAL INVITATION & MUSIC")

    c.setFillColor(c_sage)
    c.setFont("Helvetica", 6.8)
    c.drawCentredString(mid_x, btn_cy - btn_r - 26, "Upadhyay Family • Pali, Rajasthan • RSVP: +91 94610 61236, +91 98879 97822")

    # STRICTLY SINGLE PAGE
    c.save()
    print("Regenerated Transparent Circular Vector PDF successfully!")

if __name__ == '__main__':
    generate_minimal_vector_pdf()
