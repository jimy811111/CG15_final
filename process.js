var s = document.getElementsByClassName("slider");
var n = document.getElementsByClassName("num");
var de = document.getElementsByClassName("de");
for (var i = 0; i < s.length; i++) {
    s[i].onmousedown = Refresh;
    s[i].onmousemove = Refresh;
    s[i].onkeydown = Refresh;
    n[i].innerHTML = s[i].value;
}
for (var i = 0; i < de.length; i++) {
    de[i].onclick = SetDefaultColor;
}

window.onload = init;
var canvas = document.getElementById("content");
canvas.onmouseover = m_in;
canvas.onmouseout = m_out;
canvas.onclick = light_move;

function light_move(){
    if(l_flag==0){
        l_flag=1;
    }
    else{
        l_flag=0;
    }
    
}

function m_in(){ 
    flag = 1;
}

function m_out(){
    flag = 0;
}

function init(){
    Refresh();    
    
}


function Refresh() {
    n[0].innerHTML = s[0].value;
    n[1].innerHTML = s[1].value;
    n[2].innerHTML = s[2].value;
    n[3].innerHTML = s[3].value;
    Change_Color();
    Change_Shadow();
}

function Change_Shadow(){
    var darkness = s[3].value;
    var up =1.5,down=0.3;
    var k = up - (10-darkness)/10 *(up-down);
    spotLight.shadowDarkness  = k;
}
var k;
var d;

var maxx = 0,
    maxy = 0,
    maxz = 0;
var minx = 0,
    miny = 0,
    minz = 0;

function Change_Color() {
    var l = parseInt(s[0].value),
        a = parseInt(s[1].value),
        b = parseInt(s[2].value);
        

    var rgb = Lab2RGB(l,a,b);
    
    
    Setcolor(rgb[0], rgb[1], rgb[2]);
    Setlight(l,a,b);
}

function Setcolor(R, G, B) {
    if (R < 0) {
        R = 0;
    }
    if (G < 0) {
        G = 0;
    }
    if (B < 0) {
        B = 0;
    }
    if (R > 255) {
        R = 255;
    }
    if (G > 255) {
        G = 255;
    }
    if (B > 255) {
        B = 255;
    }
    var str = "\"rgb(" + R.toString() + "," + G.toString() + "," + B.toString() + ")\"";
    document.getElementById("color").style.backgroundColor = 'rgb(' + R + ',' + G + ',' + B + ')';
}

function Setlight(l,a,b){
    var rgb = Lab2RGB(l+10,a,b);
    R = rgb[0];
    G = rgb[1];
    B = rgb[2];
    ambient.color.r = R/255;
    ambient.color.g = G/255;
    ambient.color.b = B/255;
}

function SetDefaultColor() {
    switch (this.id) {
        case "de1":
            s[0].value = 17;
            s[1].value = 0;
            s[2].value = 0;
            break;
        case "de2":
            s[0].value = 24;
            s[1].value = 2;
            s[2].value = -23;
            break;
        case "de3":
            s[0].value = 29;
            s[1].value = 4;
            s[2].value = -30;
            break;
        case "de4":
            s[0].value = 33;
            s[1].value = 4;
            s[2].value = -34;
            break;
        case "de5":
            s[0].value = 38;
            s[1].value = 5;
            s[2].value = -37;
            break;
        case "de6":
            s[0].value = 43;
            s[1].value = 5;
            s[2].value = -39;
            break;
        default:
            break;
    }
    Refresh();
}

function Lab2RGB(l,a,b){
    var var_Y, var_X, var_Z;
    var_Y = (l + 16) / 116;
    var_X = a / 500 + var_Y;
    var_Z = var_Y - b / 200;
    var yt = Math.pow(var_Y, 3),
        xt = Math.pow(var_X, 3),
        zt = Math.pow(var_Z, 3);
    if (yt > 0.008856) {
        var_Y = yt;
    }
    else {
        var_Y = ((var_Y - 16) / 116) / 7.787;
    }
    if (xt > 0.008856) {
        var_X = xt;
    }
    else {
        var_X = ((var_X - 16) / 116) / 7.787;
    }
    if (zt > 0.008856) {
        var_Z = zt;
    }
    else {
        var_Z = ((var_Z - 16) / 116) / 7.787;
    }
    var ref_X = 95.047,
        ref_Y = 100.000,
        ref_Z = 108.883;
    var X, Y, Z;
    X = ref_X * var_X //ref_X =  95.047     Observer= 2°, Illuminant= D65
    Y = ref_Y * var_Y //ref_Y = 100.000
    Z = ref_Z * var_Z //ref_Z = 108.883
    if (X > 95.047) {
        X = 95.047;
    }
    if (Y > 100) {
        Y = 100;
    }
    if (Z > 100) {
        Z = 100;
    }
    if (X < 0) {
        X = 0;
    }
    if (Y < 0) {
        Y = 0;
    }
    if (Z < 0) {
        Z = 0;
    }

    var var_R, var_G, var_B;
    var_X = X / 100; //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
    var_Y = Y / 100; //Y from 0 to 100.000
    var_Z = Z / 100; //Z from 0 to 108.883
    var_R = var_X * 3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
    var_G = var_X * -0.9689 + var_Y * 1.8758 + var_Z * 0.0415;
    var_B = var_X * 0.0557 + var_Y * -0.2040 + var_Z * 1.0570;
    if (var_R > 0.0031308) {
        var_R = 1.055 * (Math.pow(var_R, 1 / 2.4)) - 0.055;
    }
    else {
        var_R = 12.92 * var_R;
    }
    if (var_G > 0.0031308) {
        var_G = 1.055 * (Math.pow(var_G, 1 / 2.4)) - 0.055;
    }
    else {
        var_G = 12.92 * var_G;
    }
    if (var_B > 0.0031308) {
        var_B = 1.055 * (Math.pow(var_B, 1 / 2.4)) - 0.055;
    }
    else {
        var_B = 12.92 * var_B;
    }
    var R, G, B;
    R = var_R * 255;
    G = var_G * 255;
    B = var_B * 255;
    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    var rgb = [R,G,B];
    return(rgb);
}