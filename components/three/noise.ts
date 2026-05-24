/**
 * Lightweight 2D Perlin-ish noise (smoothstep-based) — no deps.
 * Good enough for cosmetic sway; not statistically rigorous.
 */
const PERM = new Uint8Array(512)
{
  const seed = 1337
  let s = seed
  for (let i = 0; i < 256; i++) PERM[i] = i
  // Fisher–Yates shuffle with a deterministic LCG
  for (let i = 255; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    const tmp = PERM[i]
    PERM[i] = PERM[j]!
    PERM[j] = tmp!
  }
  for (let i = 0; i < 256; i++) PERM[i + 256] = PERM[i]!
}

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10)
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function grad(hash: number, x: number, y: number) {
  const h = hash & 7
  const u = h < 4 ? x : y
  const v = h < 4 ? y : x
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
}

export function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  x -= Math.floor(x)
  y -= Math.floor(y)
  const u = fade(x)
  const v = fade(y)
  const aa = PERM[X + PERM[Y]!]!
  const ab = PERM[X + PERM[Y + 1]!]!
  const ba = PERM[X + 1 + PERM[Y]!]!
  const bb = PERM[X + 1 + PERM[Y + 1]!]!
  const x1 = lerp(grad(aa, x, y), grad(ba, x - 1, y), u)
  const x2 = lerp(grad(ab, x, y - 1), grad(bb, x - 1, y - 1), u)
  // Output is in roughly [-1, 1]
  return lerp(x1, x2, v)
}
