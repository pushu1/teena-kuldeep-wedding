from PIL import Image, ImageFilter, ImageDraw
import numpy as np

img1 = Image.open(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\couple_looking_circle.png').convert('RGBA')
img2 = Image.open(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\couple_namaste_circle.png').convert('RGBA')
w, h = img1.size

def make_eyelid_patch(img, cx, cy, rx, ry, lid_source_box, blur=0.7):
    x1, y1, x2, y2 = lid_source_box
    source = img.crop((x1, y1, x2, y2))
    patch_w = rx * 2
    patch_h = ry * 2
    lid = source.resize((patch_w, patch_h), Image.Resampling.LANCZOS)
    
    mask = Image.new('L', (patch_w, patch_h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([(1, 1), (patch_w - 2, patch_h - 2)], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=blur))
    
    layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    layer.paste(lid, (cx - rx, cy - ry), mask)
    return layer

# =========================================================================
# 1. POSE 1: GROOM
# =========================================================================
g1_lid = make_eyelid_patch(img1, cx=405, cy=375, rx=24, ry=13, lid_source_box=(384, 360, 428, 372))
g1_lid.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\eyelids_groom_pose1.png')

# =========================================================================
# 2. POSE 1: BRIDE
# =========================================================================
b1_l = make_eyelid_patch(img1, cx=540, cy=409, rx=20, ry=13, lid_source_box=(522, 396, 554, 406))
b1_r = make_eyelid_patch(img1, cx=655, cy=418, rx=25, ry=14, lid_source_box=(634, 406, 676, 418))
b1_lid = Image.new('RGBA', (w, h), (0, 0, 0, 0))
b1_lid.alpha_composite(b1_l)
b1_lid.alpha_composite(b1_r)
b1_lid.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\eyelids_bride_pose1.png')

# =========================================================================
# 3. POSE 2: GROOM
# =========================================================================
g2_l = make_eyelid_patch(img2, cx=348, cy=300, rx=24, ry=14, lid_source_box=(326, 287, 370, 294))
g2_r = make_eyelid_patch(img2, cx=414, cy=300, rx=24, ry=14, lid_source_box=(392, 287, 436, 294))
g2_lid = Image.new('RGBA', (w, h), (0, 0, 0, 0))
g2_lid.alpha_composite(g2_l)
g2_lid.alpha_composite(g2_r)
g2_lid.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\eyelids_groom_pose2.png')

# =========================================================================
# 4. POSE 2: BRIDE
# =========================================================================
b2_l = make_eyelid_patch(img2, cx=636, cy=346, rx=24, ry=14, lid_source_box=(614, 332, 658, 340))
b2_r = make_eyelid_patch(img2, cx=706, cy=346, rx=24, ry=14, lid_source_box=(684, 332, 728, 340))
b2_lid = Image.new('RGBA', (w, h), (0, 0, 0, 0))
b2_lid.alpha_composite(b2_l)
b2_lid.alpha_composite(b2_r)
b2_lid.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\eyelids_bride_pose2.png')

# =========================================================================
# 5. NAMASTE HANDS LAYER
# =========================================================================
hands_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
hands_mask = Image.new('L', (w, h), 0)
d_hm = ImageDraw.Draw(hands_mask)

# Groom namaste hands:
d_hm.polygon([
    (310, 580),
    (330, 510),
    (360, 455),
    (390, 440),
    (425, 445),
    (440, 490),
    (435, 560),
    (410, 620),
    (320, 630)
], fill=255)

# Bride namaste hands:
d_hm.polygon([
    (540, 560),
    (560, 480),
    (585, 445),
    (615, 445),
    (635, 490),
    (630, 570),
    (590, 620),
    (550, 600)
], fill=255)

hands_mask = hands_mask.filter(ImageFilter.GaussianBlur(radius=2.5))
hands_layer.paste(img2, (0, 0), hands_mask)
hands_layer.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\namaste_hands_layer.png')

# Previews
comp1 = img1.copy()
comp1.alpha_composite(g1_lid)
comp1.alpha_composite(b1_lid)
comp1.save(r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a\preview_all_pose1_closed.png')

comp2 = img2.copy()
comp2.alpha_composite(g2_lid)
comp2.alpha_composite(b2_lid)
comp2.save(r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a\preview_all_pose2_closed.png')

print('All assets regenerated cleanly!')
