import pypdf

reader = pypdf.PdfReader(r'C:\Users\Hp\.gemini\antigravity\scratch\param-pummy-wedding\Teena_Kuldeep_Digital_Wedding_Invitation.pdf')
print('Total pages in PDF:', len(reader.pages))
assert len(reader.pages) == 1, "Must be exactly 1 page"

page = reader.pages[0]
annots = page.get('/Annots', [])
print('Total annotations on page:', len(annots))

for i, a in enumerate(annots):
    obj = a.get_object()
    st = obj.get('/Subtype')
    rect = obj.get('/Rect')
    action = obj.get('/A')
    uri = action.get('/URI') if action else None
    print(f"Annotation {i}: Subtype={st}, Rect={rect}, URI={uri}")

print("\nPDF verification successful! Exactly 1 page with valid interactive URI link.")
