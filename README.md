# Cosmo 2D
Engine para facilitar a criação de jogos 2d em JavaScript para WEB ou Framworks multiplataformas, como Cordova ou Ionic.
## Tutorial:
### Introdução
O Cosmo 2D ajuda a criar um canvas game 2D para navegadores e outros. Basta criar os objetos dentro do `window.onload()` no arquivo _game.js_.
### Tela do jogo (`gameScreen`)
O primeiro objeto que presisa ser criado é `gameScreen`, ele insere o canvas no HTML faz o controle da camera e são renderizados os senários e atores.
#### Inicialização
```javascript
gameScreen = new GameScreen(resolution, orientation, autoHeight, conteiner);
```
* **resolution** - Define o tamanho do canvas, o formato de entrada e um vetor com dois valores inteiros com a largura e altura da tela, o valor padrão é de [320, 240]. Dependendo dos valores setados em relação a tela do dispositivo pode haver deformidade da imagem. Pode ser usado as constantes:
```javascript
QQVGA = [160, 120]
QVGA = [320, 240]
VGA = [640, 480]
VGA = [720, 480]
SVGA = [800, 600]
XGA = [1024, 768]
WXGA_HD = [1280, 720]
WXGA = [1366, 768]
WXGA_P = [1440, 900]
UXGA = [1600, 900]
UXGA_PP = [1680, 1050]
FULL_HD = [1920, 1080]
```
* **orientation** - Define a orientação da tela, paisagem (`true`) ou retrato (`false`), o padrão é paisagem. Pode ser usado as constantes:
```javascript
LANDSCAPE = true
PORTRAIT = false
```
* **autoHeight** - É usado para evitar deformação na imagem devido o tamanho da tela do dispositivo, quando este argumento é `true` a autura da `gameScreen` é recalculada com a mesma proporção da tela do dispositivo.
* **conteiner** - Recebe o id do conteiner onde o canvas vai ser inserido no __HTML__, por padrão ele vem no `body`.
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
Todos os graficos são renderizados no atributo `bufferContext`:
```javascript
gameScreen.bufferContext.drawImage(...);
```