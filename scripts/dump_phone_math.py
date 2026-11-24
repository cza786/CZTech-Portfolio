with open('scripts/matched_phone.js', encoding='utf-8') as f:
    text = f.read()

idx = text.find('let m=[{name:"LinkedIn"')
start = max(0, idx - 8000)
end = idx + 200

with open('scripts/telephone_math.js', 'w', encoding='utf-8') as out:
    out.write(text[start:end])

print("Written telephone_math.js, len:", end - start)
