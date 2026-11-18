from PIL import Image, ImageFilter, ImageDraw
import numpy as np

# Load source images
img1 = Image.open(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\couple_looking_circle.png').convert('RGBA')
img2 = Image.open(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\couple_namaste_circle.png').convert('RGBA')
w, h = img1.size

# =========================================================================
# 1. POSE 1: GROOM EYELID
# =========================================================================
groom1_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
# Groom 1 eye socket: x: 384 to 428, y: 366 to 386
# Take upper eyelid skin from y: 358 to 372
g1_lid_source = img1.crop((380, 356, 432, 372))
# Stretch downwards to height 24 so it covers down to y=388
g1_lid_stretched = g1_lid_source.resize((52, 24), Image.Resampling.LANCZOS)

# Create smooth eye contour mask
g1_mask = Image.new('L', (w, h), 0)
d_g1 = ImageDraw.Draw(g1_mask)
d_g1.polygon([(385, 374), (395, 366), (408, 365), (420, 369), (426, 374), (420, 384), (408, 386), (395, 383)], fill=255)
g1_mask = g1_mask.filter(ImageFilter.GaussianBlur(radius=0.9))

groom1_layer.paste(g1_lid_stretched, (380, 365))
# Apply dark lash line along lower closed contour
d_layer = ImageDraw.Draw(groom1_layer)
d_layer.line([(385, 374), (394, 382), (406, 385), (418, 383), (426, 374)], fill=(32, 16, 12, 255), width=2)

# Mask the layer to eye aperture only
g1_final = Image.new('RGBA', (w, h), (0, 0, 0, 0))
g1_final.paste(groom1_layer, (0, 0), g1_mask)
g1_final.save(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\assets\eyelids_groom_pose1.png')

# Preview on img1
comp_g1 = img1.copy()
comp_g1.alpha_composite(g1_final)
comp_g1.crop((370, 340, 440, 410)).save(r'C:\Users\Hp\.gemini\antigravity\brain\199e26aa-2e71-4b06-bd40-67113d52490a\preview_groom1_closed.png')
print('Groom 1 saved')
