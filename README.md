# Cosmo 2D
Engine para facilitar a criação de jogos 2d em JavaScript para WEB ou Frameworks multiplataformas, como Cordova ou Ionic.
## Tutorial:
### Introdução
O Cosmo 2D ajuda a criar um canvas game 2D para navegadores e outros. Basta criar os objetos dentro do `window.onload()` no arquivo _game.js_.
### Tela do jogo (`gameScreen`)
O primeiro objeto que precisa ser criado é `gameScreen`, ele insere o canvas no HTML faz o controle da camera e são renderizados os senários e atores.
#### Inicialização
```javascript
gameScreen = new GameScreen(resolution, orientation, autoHeight, content);
```
* **resolution** - Define o tamanho do canvas, o formato de entrada e um vetor com dois valores inteiros com a largura e altura da tela, o valor padrão é de [320, 240]. Dependendo dos valores setados em relação a tela do dispositivo pode haver deformidade da imagem. Pode ser usado as constantes:
```javascript
var QQVGA = [160, 120]
var HQVGA = [240, 160]
var QVGA = [320, 240]
var WQVGA = [400, 240]
var HVGA = [480, 320]
var nHD = [640, 360]
var VGA = [640, 480]
var WVGA = [800, 480]
var FWVGA = [854, 480]
var qHD = [960, 540]
var DVGA = [960, 640]
var SVGA = [800, 600]
var WSVGA = [1024, 600]
var XGA = [1024, 768]
var WXGA = [1280, 720]
var HD = [1280, 720]
var SXGA = [1280, 1024]
var WXGA = [1366, 768]
var SXGA_P = [1400, 1050]
var WXGA_P = [1440, 900]
var UXGA = [1600, 1200]
var UXGA_PP = [1680, 1050]
var WUXGA = [1920, 1200]
var FHD = [1920, 1080]
var FULL_HD = [1920, 1080]
var QWXGA = [2048, 1152]
var QXGA = [2048, 1536]
var WQHD = [2560, 1440]
var WQXGA = [2560, 1600]
```
* **orientation** - Define a orientação da tela, paisagem (`true`) ou retrato (`false`), o padrão é paisagem. Pode ser usado as constantes:
```javascript
LANDSCAPE = true
PORTRAIT = false
```
* **autoHeight** - É usado para evitar deformação na imagem devido o tamanho da tela do dispositivo, quando este argumento é `true` a altura da `gameScreen` é recalculada com a mesma proporção da tela do dispositivo.
* **content** - Recebe o id do content onde o canvas vai ser inserido no __HTML__, por padrão ele vem no `body`.
#### Atributos
As dimensões do `gameScreen` estão contidas no atributo `size`:
```javascript
gameScreen.size = {
    width,              //Largura da tela
    height,             //Altura da tela
    deviceWidth,        //Largura do dispositivo
    deviceHeight        //Altura do dispositivo
}
```
Todos os gráficos são renderizados no atributo `bufferContext`:
```javascript
gameScreen.bufferContext.drawImage(...);
```