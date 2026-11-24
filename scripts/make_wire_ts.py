with open('scripts/static_wire_path.txt', encoding='utf-8') as f:
    path_d = f.read().strip()

ts_content = f"""// src/data/telephone-wire.ts
// Pre-computed mathematical bezier spiral points for vintage telephone rotary cord

export const staticWirePath = "{path_d}";
"""

with open('src/data/telephone-wire.ts', 'w', encoding='utf-8') as out:
    out.write(ts_content)

print("Created src/data/telephone-wire.ts successfully")
