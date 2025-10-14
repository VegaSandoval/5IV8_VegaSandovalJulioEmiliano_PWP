function problema1(){
    //tarea
}

function problema2(){
    //este es mio
    var p2_x1 = document.querySelector("#p2_x1").ariaValueMax;
    var p2_x2 = document.querySelector("#p2_x2").ariaValueMax;
    var p2_x3 = document.querySelector("#p2_x3").ariaValueMax;
    var p2_x4 = document.querySelector("#p2_x4").ariaValueMax;
    var p2_x5 = document.querySelector("#p2_x5").ariaValueMax;

    var p2_y1 = document.querySelector("#p2_y1").ariaValueMax;
    var p2_y2 = document.querySelector("#p2_y2").ariaValueMax;
    var p2_y3 = document.querySelector("#p2_y3").ariaValueMax;
    var p2_y4 = document.querySelector("#p2_y4").ariaValueMax;
    var p2_y5 = document.querySelector("#p2_y5").ariaValueMax;

    //creamos los vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    v1 = v1.sort(function(a, b){return b-a});
    v2 = v2.sort(function(a, b){return b-a});

    v2 = v2.reverse();

    var p2_producto = 0;
    for(var i=0; i<v1.length; i++){
        p2_producto += v1[i] * v2[i];
    }

    document.querySelector("#p2_resultado").textContent = "#p2_resultado" + p2_producto;
}

function problema3(){
    //tarea
}