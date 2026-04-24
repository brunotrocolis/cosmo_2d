# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cosmo 2D is a TypeScript-based 2D game engine for browser/Canvas games. Source files are in `src/` as ES modules with proper types. Vite bundles the output to `dist/cosmo.js` (UMD) and `dist/cosmo.esm.js` (ESM).

## Build & Run

```bash
npm run dev      # Start dev server on http://localhost:3000 (serves test/)
npm run build    # Type-check + build to dist/
npm run preview  # Serve dist/ for final testing
npm run lint     # ESLint
npm run format   # Prettier
```

The test game uses WASD to move a hero actor through a tilemap scene with collision.

## Architecture

### Source Structure

```
src/
├── index.ts      # Library entry point — re-exports all classes + constants + sets up input listeners
├── state.ts      # Global mutable state (game, time, key, touch) — imported by all classes
├── game.ts       # Game — loop orchestrator, owns screen + scene
├── screen.ts     # Screen — canvas setup, camera, double buffering
├── scene.ts      # Scene — holds actors[] and tiles[2][]
├── actor.ts      # Actor — entity with position, sprite, collision
├── sprite.ts     # Sprite — image, animation, collision box
├── tiles.ts      # Tiles — spritesheet tilemap, generates blockMap
├── block.ts      # Block — AABB solid rectangle for tile collision
├── button.ts     # Button — touch/keyboard UI button
├── sound.ts      # Sound — wraps HTMLAudioElement
└── analog.ts     # Analog — (stub, future use)
```

### Dependency Flow

All classes that need runtime context import from `state.ts`. This avoids circular ES module dependencies since `state.ts` holds only plain data (typed as `any` for the `game` reference).

### Update/Render Order (per frame)

1. `Game.update()` → `game.loop()` → `Scene.update()` → `Screen.update()`
2. Actor update: `actor.loop()` → `sprite.update()` (recalculates collision center)
3. `Screen.update()`: camera pan + `Block.update()` (AABB push for solid actors)
4. `Game.render()` → `Scene.render()`: tiles[0] → actors → tiles[1]
5. Buffer canvas composited to main canvas

### Key Behaviors

**Collision:** AABB between actors (`Actor.collision()`) and tiles→actors (`Block._block()`). Block flags (`actor.block.left/up/right/down`) are set and cleared per block per frame.

**Tiles:** `setBlockMap()` merges adjacent solid tiles into larger `Block` rectangles for efficiency. Tile rendering cached on an offscreen canvas (`tileMap`).

**Camera:** `screen.camera.actor = someActor` enables following. Margins define the dead zone. Panning modifies `scene.x/y`.

**Input:** `state.key[keyCode]` (boolean), `state.touch[]`. Also exported from index as `cosmo.key` / `cosmo.touch`.

**Sprites:** Never share a Sprite instance between Actors — each actor needs its own (shared sprites corrupt animation timing).

### Usage Pattern

```typescript
import * as cosmo from 'cosmo-2d'; // or from '../src/index'

const game = new cosmo.Game({
  screen: new cosmo.Screen({ resolution: cosmo.VGA }),
});
game.scene = new cosmo.Scene({ actor: [...], tiles: [[...], []] });
game.play();
```

### Actor Lifecycle

Override `start()` (once on first update), `loop()` (every frame), `over()` (cleanup). `unique: true` skips cloning the actor when added to a scene. `persistent: true` keeps the actor alive across scene changes.
