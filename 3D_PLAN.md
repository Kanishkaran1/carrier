# 3D Hero Element — Implementation Plan
**Date:** 2026-06-02  
**Scope:** New file `src/components/HeroFan3D.tsx` + one surgical edit to `src/pages/Index.tsx` (hero section only).

---

## 1. What the 3D element is

**A centrifugal fan impeller** — the rotating blade assembly found inside every split-AC indoor unit.

- 8 swept blades radiating from a central hub, enclosed by a thin outer ring  
- Slow continuous rotation (≈ one revolution / 18 s) — ambient, non-distracting  
- Mouse-reactive tilt: the whole assembly gently tracks cursor position (±12°), giving it a living, premium feel  
- Positioned on the **right 40 % of the hero**, vertically centred, slightly overlapping the gradient fade — the text always wins on the left  

Why this element over alternatives:

| Option | Reason skipped |
|--------|---------------|
| Particle airflow | Heavy — hundreds of objects, complex shader |
| Snowflake / frost crystal | Decorative, less brand-relevant |
| Abstract AC unit box | Not visually interesting at hero scale |
| **Centrifugal impeller** ✓ | Instantly HVAC-legible, pure procedural geometry, low poly, premium with good lighting |

---

## 2. New dependency

| Package | Gzipped size | Purpose |
|---------|-------------|---------|
| `@react-three/fiber` | ~26 kB | React renderer for Three.js |
| `@react-three/drei` | ~12 kB (tree-shaken) | `useProgress`, nothing else needed |
| `three` | ~168 kB | 3D engine (chunk-split, never loaded on mobile) |

**Total Three.js chunk: ~206 kB gzipped** — delivered only to desktop users via `React.lazy`. Mobile users download zero bytes of it.

---

## 3. Performance strategy

### Mobile: zero cost
```tsx
// In Index.tsx
const [isDesktop, setIsDesktop] = useState(false);
useEffect(() => {
  setIsDesktop(window.innerWidth >= 1024);
}, []);

// Lazy import fires only when the component actually renders
const HeroFan3D = React.lazy(() => import("@/components/HeroFan3D"));

// In JSX — Three.js chunk never fetched on mobile:
{isDesktop && (
  <Suspense fallback={null}>
    <HeroFan3D />
  </Suspense>
)}
```

### Desktop: minimal GPU load
- `dpr={[1, 1.5]}` — cap pixel ratio at 1.5× (no 4K rendering)
- `frameloop="always"` — needed for continuous rotation, but all animation is a single `useFrame` delta add
- `gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}` — hint to GPU scheduler
- No shadows, no post-processing, no environment maps
- 8 blades × `BoxGeometry(0.07, 0.72, 0.05)` = 96 triangles total for blades
- `TorusGeometry(1.0, 0.034, 8, 48)` ring = 96 triangles
- Hub `CylinderGeometry(0.11, 0.11, 0.08, 16)` = 64 triangles
- **Total: < 300 triangles** — negligible draw call cost

### Graceful WebGL fallback
```tsx
// ErrorBoundary wraps Canvas — if WebGL init fails, renders null (hero still looks full)
// Also checked before render:
const hasWebGL = typeof window !== "undefined" &&
  (!!window.WebGLRenderingContext || !!window.WebGL2RenderingContext);
```

---

## 4. Geometry & materials

```
Fan assembly (single <group> ref):
  ├─ Hub       CylinderGeometry(0.11, 0.11, 0.08, 16)
  │            MeshStandardMaterial — color #cc1a1a (brand red), metalness 0.7, roughness 0.15
  │
  ├─ Ring      TorusGeometry(1.0, 0.034, 8, 48)  
  │            MeshStandardMaterial — color #cc1a1a, metalness 0.65, roughness 0.2
  │
  └─ Blades ×8  BoxGeometry(0.07, 0.72, 0.05)
               Each positioned at radius 0.52, rotated (index/8)×2π around Z
               Blade itself swept 28° from radial direction for impeller look
               MeshStandardMaterial — color #dde1e8 (cool silver-white), metalness 0.55, roughness 0.25
```

**Lighting**
```
ambientLight        intensity 0.45
directionalLight    position [-2, 3, 4]   intensity 1.3   color #ffffff
pointLight          position [ 2, -1, 3]  intensity 0.55  color #ff3333  distance 9
```

The red point light catches the silver blades on one side with a warm-red rim, matching brand colour without painting everything red.

---

## 5. Animation

```ts
useFrame((state, delta) => {
  // Continuous rotation
  fan.rotation.z += delta * 0.35;            // ~18 s per revolution

  // Mouse tilt — smooth lerp, max ±0.2 rad (~11.5°)
  fan.rotation.x = MathUtils.lerp(fan.rotation.x, state.mouse.y * 0.2,  0.04);
  fan.rotation.y = MathUtils.lerp(fan.rotation.y, state.mouse.x * 0.2,  0.04);
});
```

`lerp` factor `0.04` = very slow follow — the element feels weighty, not jittery.

---

## 6. Canvas & placement

```tsx
// Canvas
<Canvas
  camera={{ position: [0, 0, 4.2], fov: 36 }}
  dpr={[1, 1.5]}
  gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
  style={{ background: "transparent" }}
>
```

```tsx
// Placement inside hero slide div (absolute, desktop-only)
<div className="absolute right-[3%] top-1/2 -translate-y-1/2
                w-[340px] h-[340px] xl:w-[400px] xl:h-[400px]
                pointer-events-none hidden lg:block z-[5] opacity-85">
  <Suspense fallback={null}>
    {isDesktop && hasWebGL && <HeroFan3D />}
  </Suspense>
</div>
```

Z-layering: gradient overlays are `z-0`, hero text is `z-10`, fan canvas is `z-[5]` — text always wins.

---

## 7. Files changed

| File | Change |
|------|--------|
| `package.json` | Add `@react-three/fiber`, `@react-three/drei`, `three` + `@types/three` |
| `src/components/HeroFan3D.tsx` | **New file** — complete self-contained 3D component |
| `src/pages/Index.tsx` | Add `isDesktop` state + lazy import + 1 placement `<div>` inside hero CarouselItem |

No other files change. The 3D chunk is fully isolated — removing the `<div>` from Index.tsx and deleting `HeroFan3D.tsx` cleanly reverts everything.

---

## 8. Approval checklist

- [ ] `@react-three/fiber` + `three` dependency install approved  
- [ ] Centrifugal fan impeller as the chosen element approved  
- [ ] Desktop-only (≥ 1024 px) conditional load approved  
- [ ] Mouse-reactive tilt behaviour approved  
- [ ] Placement: right side of hero, `pointer-events-none`, behind text approved  
- [ ] Proceed to implementation ✓
