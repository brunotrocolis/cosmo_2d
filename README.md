# Cosmo 2D

Engine TypeScript para criação de jogos 2D em canvas para navegadores.

## Requisitos

- Node.js 18+

## Instalação

```bash
npm install
```

## Comandos

```bash
npm run dev      # Inicia o servidor de desenvolvimento (http://localhost:3000/test/index.html)
npm run build    # Compila e gera dist/cosmo.js e dist/cosmo.esm.js
npm run preview  # Serve o build final para testes
npm run lint     # Verifica erros com ESLint
npm run format   # Formata o código com Prettier
```

## Uso básico

```typescript
import * as cosmo from 'cosmo-2d';

const game = new cosmo.Game({
  screen: new cosmo.Screen({ resolution: cosmo.VGA }),
});

game.scene = new cosmo.Scene({
  actor: [hero],
  tiles: [[background], [foreground]],
});

game.play();
```

## Classes

### `Game`

Orquestrador do loop principal.

```typescript
const game = new cosmo.Game({
  screen?: Screen,
  scene?: Scene,
  loop?: () => void,   // chamado a cada frame antes do update da cena
});

game.play();           // inicia o loop
game.update();         // update manual (loop, scene, screen)
game.render();         // render manual (scene, screen)
```

---

### `Screen`

Configura o canvas e controla a câmera.

```typescript
const screen = new cosmo.Screen({
  resolution?: [number, number],  // padrão: cosmo.QVGA [320, 240]
  orientation?: boolean,          // padrão: detectado pelo dispositivo
  auto_height?: boolean,          // recalcula altura para evitar deformação
  content?: string,               // id do elemento HTML que receberá o canvas
  camera_top?: number,
  camera_bottom?: number,
  camera_left?: number,
  camera_right?: number,
  camera_actor?: Actor,
});

screen.add(button);                // adiciona um Button à tela
screen.camera.actor = hero;        // ativa o seguimento de câmera
```

**Constantes de resolução:**

```typescript
cosmo.QQVGA   // [160, 120]
cosmo.QVGA    // [320, 240]
cosmo.VGA     // [640, 480]
cosmo.HD      // [1280, 720]
cosmo.FHD     // [1920, 1080]
// ...entre outras
```

---

### `Scene`

Contém os atores e os tilemaps.

```typescript
const scene = new cosmo.Scene({
  width?: number,
  height?: number,
  actor?: Actor[],
  tiles?: [Tiles[], Tiles[]],      // [layer 0 = fundo, layer 1 = frente]
  background_color?: string,
});

scene.add(actor);                  // adiciona um ator
scene.add(tiles, { layer: 1 });    // adiciona tiles na camada 1
```

---

### `Actor`

Entidade do jogo com posição, sprite e colisão.

```typescript
const hero = new cosmo.Actor({
  name?: string,
  x?: number,
  y?: number,
  sprite?: Sprite,
  solid?: boolean,        // participa da colisão com blocos (padrão: true)
  unique?: boolean,       // não clona o ator ao adicionar na cena
  persistent?: boolean,   // sobrevive à troca de cena
  start(this: Actor): void,    // chamado uma vez ao entrar na cena
  loop(this: Actor): void,     // chamado a cada frame
  over(this: Actor): void,     // chamado ao sair da cena
});

actor.collision();         // retorna o Actor colidindo, ou false
actor.collision(other);    // retorna other se estiver colidindo, ou false
actor.collision('Nome');   // retorna o Actor com aquele nome se colidindo
actor.push(other);         // empurra `other` para fora da colisão
actor.on_screen();         // true se o sprite estiver visível na tela
```

**Flags de bloqueio por tile** (limpas a cada frame):

```typescript
actor.block.up
actor.block.down
actor.block.left
actor.block.right
```

---

### `Sprite`

Imagem com suporte a animação por spritesheet horizontal.

```typescript
const sprite = new cosmo.Sprite({
  image?: string,
  animation_frames?: number,   // número de frames no spritesheet
  animation_speed?: number,    // velocidade da animação
  animation_fix?: number,      // trava em um frame específico
  over_action?: () => void,    // chamado ao completar um ciclo
  scale_x?: number,
  scale_y?: number,
  rotation?: number,           // graus
  opacity?: number,            // 0–1
  origin_x?: number,           // ponto de origem (padrão: centro)
  origin_y?: number,
  collision_x?: number,        // offset da hitbox
  collision_y?: number,
  collision_width?: number,
  collision_height?: number,
});
```

> Cada `Actor` deve ter sua própria instância de `Sprite`. Compartilhar a mesma instância entre atores corrompe o estado da animação.

---

### `Tiles`

Tilemap baseado em spritesheet com suporte a colisão.

```typescript
const tiles = new cosmo.Tiles({
  image: string,
  rows?: number,
  columns?: number,
  matrix?: [col, row, x, y][],   // lista de tiles: índice no sheet + posição no mapa
  block?: boolean[][],            // define quais tiles são sólidos [row][col]
});
```

---

### `Button`

Botão que responde a toque e teclado.

```typescript
const button = new cosmo.Button({
  image?: string,     // spritesheet horizontal: frame 0 = normal, frame 1 = pressionado
  x?: number,
  y?: number,
  scale_x?: number,
  scale_y?: number,
  key?: number,       // keyCode do teclado
  press?: () => void, // chamado ao soltar
  hold?: () => void,  // chamado enquanto pressionado
});

screen.add(button);
```

---

### `Sound`

Reprodução de áudio.

```typescript
const som = new cosmo.Sound({
  sound: string,       // caminho do arquivo de áudio
  volume?: number,     // 0–1
  loop?: boolean,
});

som.play();
som.pause();
som.replay();          // reinicia do início
som.setVolume(0.5);
```

---

## Input

```typescript
cosmo.key[keyCode]   // boolean — true enquanto a tecla estiver pressionada
cosmo.touch[]        // array de pontos de toque ativos
```

## Usando o build sem bundler

Após `npm run build`, inclua no HTML:

```html
<script src="dist/cosmo.js"></script>
<script>
  var game = new cosmo.Game({ ... });
  game.play();
</script>
```
