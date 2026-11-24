with open('scripts/matched_phone.js', encoding='utf-8') as f:
    text = f.read()

# find index of telephone-scene
idx = text.find('telephone-scene')
start = max(0, idx - 2000)
end = min(len(text), idx + 6000)

with open('scripts/telephone_source.js', 'w', encoding='utf-8') as out:
    out.write(text[start:end])

print("Written telephone_source.js, length:", end - start)
