"""Rendert die Kostenwende-Lichtszenen: die Wende-Kurve als Glühfaden im Dunkeln.
Reine Grafik (numpy), keine Fotos, keine KI-Bilder. Ausgabe: WebP in ./out
Aufruf: python3 render.py <outdir>
"""
import sys, numpy as np
from scipy.ndimage import gaussian_filter
from PIL import Image

OUT = sys.argv[1] if len(sys.argv) > 1 else "docs/szene"
rng = np.random.default_rng(7)

# Wende-Kurve: steigt unruhig, kippt am Wendepunkt (Index 6), fällt.
P = np.array([(-0.08, .74), (.10, .66), (.22, .69), (.35, .56), (.47, .52), (.58, .40), (.655, .22),
              (.70, .27), (.76, .52), (.85, .78), (.95, .90), (1.08, .96)])
PEAK = 6

def catmull(P, n=4000):
    pts = []; ts = []
    for i in range(len(P) - 1):
        p0 = P[max(i - 1, 0)]; p1 = P[i]; p2 = P[i + 1]; p3 = P[min(i + 2, len(P) - 1)]
        t = np.linspace(0, 1, n // (len(P) - 1), endpoint=False)[:, None]
        c = 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t**2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t**3)
        pts.append(c); ts.append(i + t[:, 0])
    return np.vstack(pts), np.concatenate(ts)

def splat(H, W, xy, w):
    img = np.zeros((H, W)); x = xy[:, 0] * W; y = xy[:, 1] * H
    x0 = np.floor(x).astype(int); y0 = np.floor(y).astype(int); fx = x - x0; fy = y - y0
    for dx, dy, ww in ((0, 0, (1 - fx) * (1 - fy)), (1, 0, fx * (1 - fy)), (0, 1, (1 - fx) * fy), (1, 1, fx * fy)):
        xi = x0 + dx; yi = y0 + dy; m = (xi >= 0) & (xi < W) & (yi >= 0) & (yi < H)
        np.add.at(img, (yi[m], xi[m]), (w * ww)[m])
    return img

def scene(W, H, transform, focus_blur=0.0, horizon=.62, refl=.16, name='x', ambient=1.0):
    pts, t = catmull(P, n=max(W, H) * 8)
    xy = transform(pts)
    s = np.scale = None
    # Helligkeit entlang der Kurve: am Wendepunkt am hellsten (Information: hier dreht der Preis)
    heat = 0.55 + 0.75 * np.exp(-((t - PEAK) / 1.35) ** 2)
    step = np.linalg.norm(np.diff(xy * [W, H], axis=0), axis=1); step = np.append(step, step[-1])
    w = heat * step
    # Schärfentiefe: Kurvenpunkte fern vom Wendepunkt unschärfer (3 Ebenen, weich überblendet)
    d = np.abs(t - PEAK) / 5.0
    layers = [(np.clip(1 - d * 2.2, 0, 1), 0.0), (np.clip(1 - np.abs(d * 2.2 - 1), 0, 1), 1.0), (np.clip(d * 2.2 - 1, 0, 1), 2.2)]
    core = np.zeros((H, W)); g1 = np.zeros((H, W)); g2 = np.zeros((H, W)); g3 = np.zeros((H, W))
    sc = W / 2400
    for lw, blur in layers:
        if lw.sum() == 0: continue
        img = splat(H, W, xy, w * lw)
        b = 1 + blur * focus_blur
        core += gaussian_filter(img, 1.1 * sc * b) * 1.0
        g1 += gaussian_filter(img, 5 * sc * b)
        g2 += gaussian_filter(img, 26 * sc * max(b * .7, 1))
        g3 += gaussian_filter(img, 140 * sc)
    def col(a, rgb): return a[..., None] * np.array(rgb)[None, None, :]
    nz = lambda a: a / (np.percentile(a[a > 0], 99.7) + 1e-9)
    core, g1, g2, g3 = nz(core), nz(g1), nz(g2), nz(g3)
    L = col(core, (1.0, .86, .66)) * 3.2 + col(g1, (1.0, .55, .18)) * 1.1 + col(g2, (.95, .38, .10)) * .26 + col(g3, (.70, .24, .06)) * .10 * ambient
    # Grund: warmes Schwarz mit leichter Raumtiefe
    yy, xx = np.mgrid[0:H, 0:W] / np.array([H, W])[:, None, None]
    base = np.stack([.0060 + .004 * (1 - yy), .0046 + .003 * (1 - yy), .0036 + .002 * (1 - yy)], -1)
    # Spiegelung auf einer dunklen Fläche unterhalb des Horizonts
    hz = int(horizon * H)
    R = L[:hz][::-1]; R = gaussian_filter(R, (14 * sc * 3, 6 * sc, 0))
    fall = np.exp(-np.arange(H - hz) / (H * .10))[:, None, None]
    Lr = np.zeros_like(L); n = min(R.shape[0], H - hz); Lr[hz:hz + n] = R[:n] * refl * fall[:n]; Lr = gaussian_filter(Lr, (3 * sc * 3, 0, 0))
    surf = (1 / (1 + np.exp(-(yy - horizon) * H / (6 * sc))))[..., None] * np.array([.0022, .0018, .0014])
    edge = np.exp(-((yy - horizon) * H / (2.2 * sc * 3)) ** 2)[..., None] * L.mean(axis=(0, 1)) * .0  # weiche Kante
    img = base + L + Lr + surf
    # Vignette
    v = 1 - .55 * (((xx - .5) / .75) ** 2 + ((yy - .45) / .9) ** 2); img *= np.clip(v, .25, 1)[..., None]
    # Filmische Tonkurve + Gamma + Korn
    img = 1 - np.exp(-img * 2.2)
    img = np.clip(img, 0, 1) ** (1 / 2.2)
    img += rng.normal(0, .009, (H, W, 1))
    out = (np.clip(img, 0, 1) * 255).astype(np.uint8)
    im = Image.fromarray(out)
    im.save(f'{OUT}/{name}.webp', quality=74, method=6)
    im.resize((W // 2, H // 2), Image.LANCZOS).save(f'{OUT}/{name}-klein.webp', quality=72, method=6)
    print(name, W, H)

# Hero quer: Kurve im oberen Drittel, Text sitzt darunter
scene(2400, 1350, lambda p: np.c_[p[:, 0], .08 + p[:, 1] * .50], focus_blur=1.6, horizon=.53, refl=.20, name='szene-wende')
# Hero hoch (Handy): Kurve oben, enger
scene(1080, 1920, lambda p: np.c_[-.18 + p[:, 0] * 1.25, .08 + p[:, 1] * .34], focus_blur=1.8, horizon=.42, refl=.22, name='szene-wende-hoch')
# Kapitel: Nahaufnahme des Wendepunkts, starke Schärfentiefe
scene(1600, 1600, lambda p: np.c_[(p[:, 0] - .66) * 2.6 + .5, (p[:, 1] - .28) * 2.6 + .36], focus_blur=3.2, horizon=.995, refl=0.0, name='szene-wendepunkt', ambient=1.4)
