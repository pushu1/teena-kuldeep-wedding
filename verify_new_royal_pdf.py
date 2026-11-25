import os
import re
import pypdf

PDF_PATH = r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\Teena_Kuldeep_New_Royal_Digital_Invitation.pdf'

reader = pypdf.PdfReader(PDF_PATH)
num_pages = len(reader.pages)
print(f"Total Pages: {num_pages}")
assert num_pages == 1, f"Expected 1 page, got {num_pages}"

page = reader.pages[0]
w = float(page.mediabox.width)
h = float(page.mediabox.height)
print(f"Page Mediabox: {w} x {h} pt (A5 is ~420 x 595 pt)")

# Extract text
extracted_text = page.extract_text()
print("\n--- Raw Extracted Text from PDF ---")
print(extracted_text.strip())
print("-----------------------------------\n")

clean_text = re.sub(r'[^A-Z0-9]', '', extracted_text.upper())
print("Clean Alpha-Numeric Sequence:", clean_text)

# Verify required core items for Teena & Kuldeep
assert "ROYALWEDDINGCELEBRATION" in clean_text, "Missing THE ROYAL WEDDING CELEBRATION"
assert "TEENA" in clean_text, "Missing TEENA"
assert "NAINA" not in clean_text, "ERROR: Found forbidden name NAINA in PDF!"
assert "KULDEEP" in clean_text, "Missing KULDEEP"
assert "FRIDAY11DECEMBER2026" in clean_text, "Missing FRIDAY, 11 DECEMBER 2026"
assert "TWOHEARTSONEBEAUTIFULJOURNEY" in clean_text, "Missing TWO HEARTS. ONE BEAUTIFUL JOURNEY."
assert "CLICKHERE" in clean_text, "Missing CLICK HERE"
assert "OPENYOURWEDDINGINVITATION" in clean_text, "Missing OPEN YOUR WEDDING INVITATION"

print("\n[PASSED] All 8 required elements verified in extracted PDF text!")

# Verify forbidden elements (family details, timings, venues must NOT be on cover PDF)
forbidden = [
    "naina", "ramgopal", "manju", "janki", "pepi", "champalal", "chyamalal", "jasraj", "upadhyay", "vajpayee",
    "ganesh invocation", "lagan vinayak", "chak pujan", "preeti bhoj", "baraat swagat", "panigrahan",
    "dharamshala", "tejaji nagar", "80 feet", "9782715591", "9024538960", "rsvp", "page 2"
]
for item in forbidden:
    assert item.lower() not in extracted_text.lower(), f"Forbidden element found on cover PDF: {item}"

print("[PASSED] Content limits check: PASSED! Strictly single-page cover with zero forbidden information.")

# Verify annotations
annots = page.get('/Annots')
print(f"Number of annotations: {len(annots) if annots else 0}")
assert annots and len(annots) >= 1, "No annotations found!"

verified_links = []
for a in annots:
    obj = a.get_object()
    subtype = obj.get('/Subtype')
    rect = obj.get('/Rect')
    action = obj.get('/A')
    uri = action.get('/URI') if action else None
    print(f"Annotation: Subtype={subtype}, Rect={rect}, URI={uri}")
    if subtype == '/Link' and uri == 'https://pushu1.github.io/param-pummy-wedding/':
        verified_links.append(obj)

assert len(verified_links) > 0, "No active link to production website found!"
print(f"\n[PASSED] ALL VERIFICATIONS PASSED SUCCESSFULLY! Active hyperlink confirmed to https://pushu1.github.io/param-pummy-wedding/.")
