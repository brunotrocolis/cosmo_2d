//--------------------------------------------------------------------------------------------------------------
//Variáveis ----------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
var time = { fps: 60, delta: 0, last: 0 }; //Vareáveis de controle de tempo e FPS

var gameScreen = null;

var mainScene; //Senário
var mainActor; //Protagonista

var mainStart = null;
var mainLoop = null;

//Constantes:
var KEY = { ENTER: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

var QQVGA = [160, 120];
var HQVGA = [240, 160];
var QVGA = [320, 240];
var WQVGA = [400, 240];
var HVGA = [480, 320];
var nHD = [640, 360];
var VGA = [640, 480];
var WVGA = [800, 480];
var FWVGA = [854, 480];
var qHD = [960, 540];
var DVGA = [960, 640];
var SVGA = [800, 600];
var WSVGA = [1024, 600];
var XGA = [1024, 768];
var WXGA = [1280, 720];
var HD = [1280, 720];
var SXGA = [1280, 1024];
var WXGA = [1366, 768];
var SXGA_P = [1400, 1050];
var WXGA_P = [1440, 900];
var UXGA = [1600, 1200];
var UXGA_PP = [1680, 1050];
var WUXGA = [1920, 1200];
var FHD = [1920, 1080];
var FULL_HD = [1920, 1080];
var QWXGA = [2048, 1152];
var QXGA = [2048, 1536];
var WQHD = [2560, 1440];
var WQXGA = [2560, 1600];

var LANDSCAPE = true;
var PORTRAIT = false;
