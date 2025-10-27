var instrucciones = [
    "Utiliza las flechas de navegación para mover las piezas.",
    "Para ordenar las piezas guíate por la imagen objetivo."
];

var movimientos = [];
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
var filaVacia = 2;
var columnaVacia = 2;

function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarIntruccionesLista(instrucciones[i], "lista-instrucciones");
    }
} 

function mostrarIntruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function checarSiGano(){
    for(var i = 0; i < rompe.length; i++){  
        for(var j = 0; j < rompe[i].length; j++){
            if(rompe[i][j] !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

function mostrarCartelGanador(){
    alert("🎉 Felicidades, ganaste el juego!");
}

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columaPos2){
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columaPos2];

    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columaPos2] = pos1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

function posicionValida(fila, columna){
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};

function moverEnDireccion(direccion){
    var nuevaFilaPiezaVacia = filaVacia;
    var nuevaColumnaPiezaVacia = columnaVacia;

    if(direccion === codigosDireccion.ABAJO) nuevaFilaPiezaVacia++;
    else if(direccion === codigosDireccion.ARRIBA) nuevaFilaPiezaVacia--;
    else if(direccion === codigosDireccion.DERECHA) nuevaColumnaPiezaVacia++;
    else if(direccion === codigosDireccion.IZQUIERDA) nuevaColumnaPiezaVacia--;

    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarUltimoMovimiento(direccion);

        if(checarSiGano()){
            setTimeout(mostrarCartelGanador, 200);
        }
    }
}

function intercambiarPosiciones(fila1, columna1, fila2, columa2){
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columa2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columa2);
    intercambiarPoscionesDOM('pieza'+pieza1, 'pieza'+pieza2);
}

function intercambiarPoscionesDOM(idPieza1, idPieza2){
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    var padre = pieza1.parentNode;
    var clon1 = pieza1.cloneNode(true);
    var clon2 = pieza2.cloneNode(true);

    padre.replaceChild(clon1, pieza2);
    padre.replaceChild(clon2, pieza1);
}

function actualizarUltimoMovimiento(direccion){
    var flecha = document.getElementById("flecha");
    switch(direccion){
        case codigosDireccion.ARRIBA: flecha.textContent = "↑"; break;
        case codigosDireccion.ABAJO: flecha.textContent = "↓"; break;
        case codigosDireccion.DERECHA: flecha.textContent = "→"; break;
        case codigosDireccion.IZQUIERDA: flecha.textContent = "←"; break;
    }
}

function mezclarPiezas(veces){
    if(veces <= 0) return;
    var direcciones = [37,38,39,40];
    var dir = direcciones[Math.floor(Math.random() * direcciones.length)];
    moverEnDireccion(dir);
    setTimeout(()=>mezclarPiezas(veces - 1),100);
}

function capturarTeclas(){
    document.body.onkeydown = function(e){
        if(Object.values(codigosDireccion).includes(e.which)){
            moverEnDireccion(e.which);
            e.preventDefault();
        }
    }
}

function iniciar(){
    mezclarPiezas(30);
    capturarTeclas();
}

mostrarInstrucciones(instrucciones);
iniciar();
