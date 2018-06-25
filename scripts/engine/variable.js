//--------------------------------------------------------------------------------------------------------------
//Variáveis ----------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
var cosmo = {};
cosmo.time = { fps: 60, delta: 0, last: 0 };
cosmo.gameScreen = null;
cosmo.gs = cosmo.gameScreen;
cosmo.mainScene = null;
cosmo.mainActor = null;
cosmo.start = null;
cosmo.loop = null;
//CONSTANTES
cosmo.KEY = { ENTER: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
cosmo.QQVGA = [160, 120];
cosmo.HQVGA = [240, 160];
cosmo.QVGA = [320, 240];
cosmo.WQVGA = [400, 240];
cosmo.HVGA = [480, 320];
cosmo.nHD = [640, 360];
cosmo.VGA = [640, 480];
cosmo.WVGA = [800, 480];
cosmo.FWVGA = [854, 480];
cosmo.qHD = [960, 540];
cosmo.DVGA = [960, 640];
cosmo.SVGA = [800, 600];
cosmo.WSVGA = [1024, 600];
cosmo.XGA = [1024, 768];
cosmo.WXGA = [1280, 720];
cosmo.HD = [1280, 720];
cosmo.SXGA = [1280, 1024];
cosmo.WXGA = [1366, 768];
cosmo.SXGA_P = [1400, 1050];
cosmo.WXGA_P = [1440, 900];
cosmo.UXGA = [1600, 1200];
cosmo.UXGA_PP = [1680, 1050];
cosmo.WUXGA = [1920, 1200];
cosmo.FHD = [1920, 1080];
cosmo.FULL_HD = [1920, 1080];
cosmo.QWXGA = [2048, 1152];
cosmo.QXGA = [2048, 1536];
cosmo.WQHD = [2560, 1440];
cosmo.WQXGA = [2560, 1600];
cosmo.LANDSCAPE = true;
cosmo.PORTRAIT = false;
