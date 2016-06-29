var Ymax=8;                // MAX # OF PIXEL STEPS IN THE "X" DIRECTION
var Xmax=8;                // MAX # OF PIXEL STEPS IN THE "Y" DIRECTION
var Tmax=10000;            // MAX # OF MILLISECONDS BETWEEN PARAMETER CHANGES
var swapspeed=200;       // SPEED IN WHICH IMAGES CHANGE

// THE ARRAY BELOW CONTAINS A SUBARRAY FOR EACH FLOATING IMAGE.
// EACH SUBARRAY CONTAINS THE DIFFERENT SEPERATE IMAGES USED FOR THE ANIMATION.

var floatimages=[ 
['butterfly1.gif', 'butterfly2.gif', 'butterfly3.gif', 'butterfly4.gif', 'butterfly5.gif' ],
['butterfly2.gif', 'butterfly3.gif', 'butterfly4.gif', 'butterfly5.gif', 'butterfly1.gif' ],
['butterfly3.gif', 'butterfly4.gif', 'butterfly5.gif', 'butterfly1.gif', 'butterfly2.gif' ],
['butterfly4.gif', 'butterfly5.gif', 'butterfly1.gif', 'butterfly2.gif', 'butterfly3.gif' ],
['butterfly5.gif', 'butterfly1.gif', 'butterfly2.gif', 'butterfly3.gif', 'butterfly4.gif' ]
];

//*********DO NOT EDIT BELOW***********
var w3c =(document.getElementById)? true:false;
var ns4 = (document.layers)? true:false;
var ie4 = (document.all && !w3c)? true:false;
var ie5 = (document.all && w3c)? true:false;
var ns6 = (w3c && navigator.appName.indexOf("Netscape")>=0 )? true:false;
var wind_w, wind_h, t='', IDs=new Array();

for(i=0; i<floatimages.length; i++){
t+=(ns4)?'<layer name="pic'+i+'" visibility="hide" width="10" height="10">' : '<div id="pic'+i+'" style="position:absolute; visibility:hidden;width:10px; height:10px"><a href="javascript:hidebutterfly()">';
t+='<img src="'+floatimages[i][0]+'" name="p'+i+'" border="0">';
t+=(ns4)? '</a></layer>':'</a></div>';
}
document.write(t);

function moveimage(num){
if(getidleft(num)+IDs[num].W+IDs[num].Xstep >= wind_w+getscrollx())IDs[num].Xdir=false;
if(getidleft(num)-IDs[num].Xstep<=getscrollx())IDs[num].Xdir=true;
if(getidtop(num)+IDs[num].H+IDs[num].Ystep >= wind_h+getscrolly())IDs[num].Ydir=false;
if(getidtop(num)-IDs[num].Ystep<=getscrolly())IDs[num].Ydir=true;
moveidby(num, (IDs[num].Xdir)?IDs[num].Xstep:-IDs[num].Xstep , (IDs[num].Ydir)?IDs[num].Ystep:-IDs[num].Ystep);
}

function getnewprops(num){
IDs[num].Ydir=Math.floor(Math.random()*2)>0;
IDs[num].Xdir=Math.floor(Math.random()*2)>0;
IDs[num].Ystep=Math.ceil(Math.random()*Ymax);
IDs[num].Xstep=Math.ceil(Math.random()*Xmax);
setTimeout('getnewprops('+num+')', Math.floor(Math.random()*Tmax));
}

function getscrollx(){
if(ie4||ie5)return document.body.scrollLeft;
else return window.pageXOffset;
}

function getscrolly(){
if(ie4||ie5)return document.body.scrollTop;
else return window.pageYOffset;
}

function getid(name){
if(ns4)return document.layers[name];
else if(ie4)return document.all[name];
else return document.getElementById(name);
}

function moveidto(num,x,y){
if(ns4)IDs[num].moveTo(x,y);
else{
IDs[num].style.left=x+'px';
IDs[num].style.top=y+'px';
}}

function getidleft(num){
if(ns4)return IDs[num].left;
else return parseInt(IDs[num].style.left);
}

function getidtop(num){
if(ns4)return IDs[num].top;
else return parseInt(IDs[num].style.top);
}

function moveidby(num,dx,dy){
if(ns4)IDs[num].moveBy(dx, dy);
else{
IDs[num].style.left=(getidleft(num)+dx)+'px';
IDs[num].style.top=(getidtop(num)+dy)+'px';
}}

function getwindowwidth(){
if(ie4||ie5)return document.body.clientWidth;
else return window.innerWidth;
}

function getwindowheight(){
if(ie4||ie5)return document.body.clientHeight;
else return window.innerHeight;
}

function swapimg(num){
IDs[num].ctr=(IDs[num].ctr<floatimages[num].length-1)?IDs[num].ctr+1:0;
if(ns4)IDs[num].document.images["p"+num].src=floatimages[num][IDs[num].ctr];
else document.images["p"+num].src=floatimages[num][IDs[num].ctr];
setTimeout('swapimg('+num+')', swapspeed);
}

window.onload=function(){
wind_w=getwindowwidth()-30;
wind_h=getwindowheight()-30;
for(i=0; i<floatimages.length; i++){
IDs[i]=getid('pic'+i);
if(ns4){
IDs[i].W=IDs[i].document.images["p"+i].width;
IDs[i].H=IDs[i].document.images["p"+i].height;
}else{
IDs[i].W=document.images["p"+i].width;
IDs[i].H=document.images["p"+i].height;
}
IDs[i].ctr=0;
getnewprops(i);
moveidto(i , Math.floor(Math.random()*(wind_w-IDs[i].W)), Math.floor(Math.random()*(wind_h-IDs[i].H)));
swapimg(i);
if(ns4)IDs[i].visibility = "show";
else IDs[i].style.visibility = "visible";
startfly=setInterval('moveimage('+i+')',Math.floor(Math.random()*100)+100);
}}

window.onresize=function(){
  wind_w=getwindowwidth();
  wind_h=getwindowheight();
}

function hidebutterfly(){
for(i=0; i<floatimages.length; i++){
if (ie4)
eval("document.all.pic"+i+".style.visibility='hidden'")
else if (ns6)
document.getElementById("pic"+i).style.visibility='hidden'
else if (ns4)
eval("document.pic"+i+".visibility='hide'")
clearInterval(startfly)
}
}
