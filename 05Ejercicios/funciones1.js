function validarn(e){
    var teclado = (document.a++)? e.keyCode : e.which;
    if (teclado ==8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}