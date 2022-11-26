full_screen_butom = document.getElementById("full_screen_butom")
variables = document.getElementById("variables")
joystick_base = document.getElementById("joystick_base")
joystick_base.style.background="transparent"
joystick_palanca = document.getElementById("joystick_palanca")
joystick_click = false

salida01 = 0
salida02 = 0

//Para detectar que ha sido presionado un boton o un elemento tanto en pantallas táctiles como en pc.
//Ejemplo:
//click_compatible(elemento_ejemplo, "down",funcion)
//eventos disponibles: down, up, over, out, move
//function funcion_presionar(){}
//function funcion_soltar(){}
function string_pos(substr,str){return str.indexOf(substr)+1;}
var touchDevice = ('ontouchstart' in document.documentElement);
function click_compatible(Elemento, evento, funcion)
{
eventos_disponibles=["down","up","enter","leave","move"]
click_list = ["mousedown","mouseup","mouseover","mouseout","mousemove","touchstart", "touchend","touchenter","touchleave","touchmove"]
i = string_pos(evento,eventos_disponibles)-1
if(touchDevice){i+=5}
evento = click_list[i]
Elemento.addEventListener(evento, funcion,false);
}

click_compatible(full_screen_butom,"down",function(){toggleFullScreen()})








//Determinar el ancho y el alto de la ventana.
//Ejemplo:
//var width = ventana.width
//var height =ventana.heigth
ventana = {width: window.innerWidth, height: window.innerHeight, orientation: "portrait"}
window.addEventListener('resize',ajuste_ventana);
function ajuste_ventana()
{
ventana.width = window.innerWidth;
ventana.height = window.innerHeight,
ventana.orientation = "portrait";
if(ventana.width>ventana.height){ventana.orientation = "landscape"}
ajustar_joystick()
}














//Para obtener la posicion del mouse en la página.
//las variables mouse_x y mouse_y almacenarán la posición del mouse.
function floor(x){return Math.trunc(x);}
var touchDevice = ('ontouchstart' in document.documentElement);
mouse_x = 0
mouse_y = 0
body = document.body

if(touchDevice)
{
//COORDENADAS DEL TOUCH
body.addEventListener("touchmove", countTouches, false);
body.addEventListener("touchstart", countTouches, false);
function countTouches(event)
{
mouse_x = floor(event.touches[0].clientX);
mouse_y = floor(event.touches[0].clientY);
}
}
else
{
body.addEventListener("mousemove", mouseMoveHandler, false);
body.addEventListener("mousedown", mouseMoveHandler, false);
function mouseMoveHandler(e)
{
mouse_x = e.clientX
mouse_y = e.clientY
}
}






























function abs(x){return Math.abs(x);}
function chr(val){return String.fromCodePoint(val);}
function floor(x){return Math.trunc(x);}
function string_replace(str,substr,newstr){return str.replace(substr,newstr);}
function string_replace_all(str,substr,newstr){
while(str.includes(substr))
{
str = str.replace(substr,newstr)
}
return str;
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////
///Joystick

joystick = {
	eje_x: 0,
	eje_y: 0,
	porcentaje_diametro: 30,
	diametro: 30*ventana.height/100,
	x: 5*ventana.width/100,
	y: ventana.height-5*ventana.height/100-30*ventana.height/100,
	x_orien: 0,
	margen: 5*ventana.height/100
}


click_compatible(joystick_base,"down",function(){joystick_click = true;})
click_compatible(joystick_base,"up",function(){joystick_up()})
click_compatible(joystick_base,"leave",function(){joystick_up()})

function joystick_up(){
joystick_click = false;
joystick.eje_x = 0;
joystick.eje_y = 0;
ajustar_palanca()
}

function joystick_check(){
	joystick.eje_x = floor((mouse_x-(joystick.x+joystick.diametro/2))*100/(joystick.diametro/2))
	joystick.eje_y = floor((mouse_y-(joystick.y+joystick.diametro/2))*100/(joystick.diametro/2))
	if(joystick.eje_x>100){joystick.eje_x=100}
	if(joystick.eje_y>100){joystick.eje_y=100}
	if(joystick.eje_x<-100){joystick.eje_x=-100}
	if(joystick.eje_y<-100){joystick.eje_y=-100}
}




function ajustar_palanca()
{
	palanca_porcentaje_distancia = (joystick.diametro/2)*1;
	palanca_centro_x = joystick.diametro/4;
	palanca_centro_y = joystick.diametro/4;
	palanca_x =  joystick.x+palanca_centro_x+joystick.eje_x*palanca_porcentaje_distancia /100;
	palanca_y = joystick.y+palanca_centro_y+joystick.eje_y*palanca_porcentaje_distancia /100;
	joystick_palanca.style.left = palanca_x+"px";
	joystick_palanca.style.top = palanca_y+"px";
}


function ajustar_joystick()
{
	joystick.diametro = joystick.porcentaje_diametro*ventana.height/100;
	porcentaje_margen = 10
	joystick.margen = porcentaje_margen*ventana.height/100;
	if(ventana.orientation=="portrait"){joystick.diametro= joystick.porcentaje_diametro*ventana.width/100;joystick.margen= porcentaje_margen*ventana.width/100}
	joystick.x = joystick.margen
	joystick.y = ventana.height-joystick.diametro-joystick.margen
	joystick_base.style.width=joystick.diametro+"px";
	joystick_base.style.height=joystick.diametro+"px";
	joystick_base.style.left = joystick.x+"px";
	joystick_base.style.top = joystick.y+"px";
	joystick_palanca.style.width = joystick.diametro/2+"px";
	joystick_palanca.style.height = joystick.diametro/2+"px";
	joystick_palanca.style.left = joystick.x+joystick.diametro/4+"px"
	joystick_palanca.style.top = joystick.y+joystick.diametro/4+"px"
	ajustar_palanca()
}




///END JOYSTICK
ajustar_joystick()

///////////////////////////////////////////////////////////////////////////////////////////////////////////


//END CREATE
ajuste_ventana()



///practica
box = document.getElementById("box")
box_x = 0
box_y = 0
box_speed_max = 10
box_speed_x = 0
box_speed_y = 0
box_width = 5*ventana.width/100
box_height = 5*ventana.width/100


//Para la ejecucion constante de código o para crear un ciclo.
setInterval(function x(){ejecucionConstante()}, 1000/30);
function ejecucionConstante(){
variables_string = `
joystick_click: ${joystick_click}
salida01: ${salida01}
salida02: ${salida02}

touchDevice: ${touchDevice}
ventana.orientation: ${ventana.orientation}
ventana.width: ${ventana.width}
ventana.height: ${ventana.height}
mouse_x: ${mouse_x}
mouse_y: ${mouse_y}
joystick.eje_x: ${joystick.eje_x}
joystick.eje_y: ${joystick.eje_y}
`
variables_string =`

`

variables_string = string_replace_all(variables_string, chr(10),"<br>");
variables.innerHTML = variables_string;

if(joystick_click)
{
	joystick_check()
	ajustar_palanca()
	box_speed_x = joystick.eje_x*box_speed_max/100
	box_speed_y = joystick.eje_y*box_speed_max/100
	box_speed_x_final = box_speed_x
	box_speed_y_final = box_speed_y
	box_width = 5*ventana.width/100
	box_height = 5*ventana.width/100
	box_x+=box_speed_x_final
	box_y+=box_speed_y_final
	while(box_x+1>ventana.width-box_width-1){box_x-=1}
	while(box_y+1>ventana.height-box_height-1){box_y-=1}
}
	
	if(box_x<0){box_x = 0}
	if(box_x>ventana.width-box_width){box_x = ventana.width-box_width}
	if(box_y<0){box_y = 0}
	if(box_y>ventana.height-box_height){box_y = ventana.height-box_height}
	box.style.width = box_width+"px"
	box.style.height = box_height+"px"
	box.style.left = box_x+"px"
	box.style.top = box_y+"px"
}








///////////////FUNCION PANTALLA COMPLETA
////////////////////////////////////////////////////////////////////////////////
function toggleFullScreen() {
  	if ((document.fullScreenElement && document.fullScreenElement !== null) ||   
   	(!document.mozFullScreen && !document.webkitIsFullScreen)) {
   	if (document.documentElement.requestFullScreen) {
   	document.documentElement.requestFullScreen();
    	} else if (document.documentElement.mozRequestFullScreen) {
	document.documentElement.mozRequestFullScreen();
	} else if (document.documentElement.webkitRequestFullScreen) {
	document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	}
	} else {
	if (document.cancelFullScreen) {
	document.cancelFullScreen();
	} else if (document.mozCancelFullScreen) {
	document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
	document.webkitCancelFullScreen();
}}}
/////////////////////////////////////////////////////////////////////////////////

