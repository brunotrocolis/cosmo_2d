//--------------------------------------------------------------------------------------------------------------
//Variáveis ----------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
var time = { fps: 60, delta: 0, last: 0 }; //Vareáveis de controle de tempo e FPS

var mainScene; //Senário
var mainActor; //Protagonista

var mainStart = null;
var mainLoop = null;

//Constantes:
var KEY = { ENTER: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

var QQVGA = [160, 120];
var QVGA = [320, 240];
var VGA = [640, 480];
var VGA = [720, 480];
var SVGA = [800, 600];
var XGA = [1024, 768];
var WXGA_HD = [1280, 720];
var WXGA = [1366, 768];
var WXGA_P = [1440, 900];
var UXGA = [1600, 900];
var UXGA_PP = [1680, 1050];
var FULL_HD = [1920, 1080];

var LANDSCAPE = true;
var PORTRAIT = false;
