from PIL import Image, ImageFilter, ImageDraw
import numpy as np

img1 = Image.open(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\couple_looking_circle.png').convert('RGBA')
img2 = Image.open(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\couple_namaste_circle.png').convert('RGBA')
w, h = img1.size

# =========================================================================
# 1. GROOM HEAD LOOKING CUTOUT (from img1)
# =========================================================================
# Polygon enclosing Groom head in img1:
# Safa top plume: (390, 140), safa dome: (250, 150) to (180, 260) to (160, 380)
# Safa tail down shoulder: (180, 500)
# Neck/collar seam: (300, 520) to (380, 520) to (430, 480)
# Beard/chin: (440, 460) to nose (470, 400) to brow (440, 350)
gh1_mask = Image.new('L', (w, h), 0)
d = ImageDraw.Draw(gh1_mask)
d.polygon([
    (380, 135), (410, 150), (430, 220), (450, 270),
    (470, 330), (475, 400), (450, 450), (430, 480),
    (390, 520), (320, 525), (280, 500), (220, 510),
    (180, 480), (160, 380), (170, 260), (220, 170),
    (280, 140), (340, 135)
], fill=255)
gh1_mask = gh1_mask.filter(ImageFilter.GaussianBlur(radius=2.0))

groom_head_looking = Image.new('RGBA', (w, h), (0, 0, 0, 0))
groom_head_looking.paste(img1, (0, 0), gh1_mask)
groom_head_looking.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\layer_groom_head_looking.png')

# =========================================================================
# 2. BRIDE HEAD LOOKING CUTOUT (from img1)
# =========================================================================
# Bride head in img1:
# Dupatta veil top: (620, 275) to (740, 290) to (880, 400) to (920, 600)
# Face left: brow (600, 360), nose (580, 420), lips/chin (590, 470)
# Choker/neck seam: (620, 530) to (740, 540)
bh1_mask = Image.new('L', (w, h), 0)
d = ImageDraw.Draw(bh1_mask)
d.polygon([
    (630, 275), (720, 280), (790, 320), (860, 390),
    (910, 480), (920, 600), (860, 640), (780, 630),
    (740, 560), (670, 550), (620, 530), (590, 475),
    (575, 420), (585, 360), (600, 310)
], fill=255)
bh1_mask = bh1_mask.filter(ImageFilter.GaussianBlur(radius=2.0))

bride_head_looking = Image.new('RGBA', (w, h), (0, 0, 0, 0))
bride_head_looking.paste(img1, (0, 0), bh1_mask)
bride_head_looking.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\layer_bride_head_looking.png')

# =========================================================================
# 3. GROOM HEAD FRONT CUTOUT (from img2)
# =========================================================================
# Groom front head:
# Safa top plume: (370, 140), top fan: (440, 170) to (470, 270)
# Turban right: (470, 320)
# Turban left: (270, 280) to (310, 200)
# Beard/chin: (390, 440)
# Collar seam: (320, 470) to (450, 470)
gh2_mask = Image.new('L', (w, h), 0)
d = ImageDraw.Draw(gh2_mask)
d.polygon([
    (360, 135), (420, 145), (460, 210), (475, 270),
    (480, 340), (465, 410), (440, 460), (390, 485),
    (340, 460), (315, 410), (285, 340), (275, 270),
    (300, 200), (330, 150)
], fill=255)
gh2_mask = gh2_mask.filter(ImageFilter.GaussianBlur(radius=2.0))

groom_head_front = Image.new('RGBA', (w, h), (0, 0, 0, 0))
groom_head_front.paste(img2, (0, 0), gh2_mask)
groom_head_front.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\layer_groom_head_front.png')

# =========================================================================
# 4. BRIDE HEAD FRONT CUTOUT (from img2)
# =========================================================================
# Bride front head:
# Dupatta top: (640, 230) to (760, 280) to (830, 400) to (840, 520)
# Dupatta left: (530, 400) to (510, 520)
# Choker/neck seam: (580, 490) to (710, 490)
bh2_mask = Image.new('L', (w, h), 0)
d = ImageDraw.Draw(bh2_mask)
d.polygon([
    (640, 230), (710, 245), (780, 300), (830, 380),
    (845, 480), (830, 550), (740, 550), (690, 490),
    (600, 490), (540, 550), (510, 480), (525, 380),
    (560, 300), (600, 250)
], fill=255)
bh2_mask = bh2_mask.filter(ImageFilter.GaussianBlur(radius=2.0))

bride_head_front = Image.new('RGBA', (w, h), (0, 0, 0, 0))
bride_head_front.paste(img2, (0, 0), bh2_mask)
bride_head_front.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\layer_bride_head_front.png')

print('All 4 head cutout layers generated!')
