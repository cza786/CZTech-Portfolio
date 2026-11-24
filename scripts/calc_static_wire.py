import math

i = -240
r = 240

def s(e):
    e = max(0.0, min(1.0, e))
    return e * e * e * (e * (6.0 * e - 15.0) + 10.0)

def o(e):
    return {
        'a': -10.0 * math.pi / 180.0 * s((e - 0.15) / 0.85),
        'y': -120.0 * e,
        'x': -45.0 * e
    }

def l(e, t, a, i_pt, r_pt):
    n = 1.0 - r_pt
    return {
        'x': n*n*n*e['x'] + 3.0*n*n*r_pt*t['x'] + 3.0*n*r_pt*r_pt*a['x'] + r_pt*r_pt*r_pt*i_pt['x'],
        'y': n*n*n*e['y'] + 3.0*n*n*r_pt*t['y'] + 3.0*n*r_pt*r_pt*a['y'] + r_pt*r_pt*r_pt*i_pt['y']
    }

def c(e, t):
    a = o(e)
    cosA = math.cos(a['a'])
    sinA = math.sin(a['a'])
    d = {
        'x': i + (592.0 - i) * cosA - (495.0 - r) * sinA + a['x'],
        'y': r + (592.0 - i) * sinA + (495.0 - r) * cosA + a['y']
    }
    h = {'x': 770.0, 'y': 808.0}
    m = max(0.0, t - 2700.0) / 1000.0
    u = math.sin(8.0 * m) * math.exp(-3.5 * m) * 14.0 * e
    g = {'x': 470.0 - 90.0 * e + u, 'y': 915.0 - 15.0 * e}
    
    p = []
    for step in range(361):
        progress = step / 360.0
        if progress < 0.62:
            p.append(l(d, {'x': d['x'] - 125.0, 'y': d['y'] + 45.0}, {'x': g['x'] - 130.0, 'y': g['y'] - 35.0}, g, progress / 0.62))
        else:
            p.append(l(g, {'x': g['x'] + 90.0, 'y': g['y'] + 100.0}, {'x': 690.0, 'y': 810.0}, h, (progress - 0.62) / 0.38))
    
    f = [0.0] * len(p)
    for k in range(1, len(p)):
        f[k] = f[k - 1] + math.hypot(p[k]['x'] - p[k - 1]['x'], p[k]['y'] - p[k - 1]['y'])
    
    v = f[-1]
    y = []
    b = 1
    for step in range(901):
        a_step = step / 900.0
        target_dist = a_step * v
        while b < 360 and f[b] < target_dist:
            b += 1
        r_pt = p[b - 1]
        n_pt = p[b]
        denom = f[b] - f[b - 1]
        frac = (target_dist - f[b - 1]) / (denom if denom != 0.0 else 1.0)
        lx = n_pt['x'] - r_pt['x']
        ly = n_pt['y'] - r_pt['y']
        seg_len = math.hypot(lx, ly) or 1.0
        taper = s(a_step / 0.055) * s((1.0 - a_step) / 0.05)
        angle = a_step * math.pi * 78.0
        normal_offset = math.sin(angle) * (19.0 - 2.0 * e) * taper
        tangent_offset = 11.0 * math.cos(angle) * taper
        y.append({
            'x': r_pt['x'] + (n_pt['x'] - r_pt['x']) * frac - ly / seg_len * normal_offset + lx / seg_len * tangent_offset,
            'y': r_pt['y'] + (n_pt['y'] - r_pt['y']) * frac + lx / seg_len * normal_offset + ly / seg_len * tangent_offset
        })
    return y

pts = c(0, 0)
d_path = ' '.join(f"{'M' if idx == 0 else 'L'}{pt['x']:.3f},{pt['y']:.3f}" for idx, pt in enumerate(pts))

with open('scripts/static_wire_path.txt', 'w', encoding='utf-8') as out:
    out.write(d_path)

print(f"Generated static wire path, length: {len(d_path)} characters, points: {len(pts)}")
