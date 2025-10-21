// Ejemplo 1: Función como expresión
// Las funciones pueden ser asignadas a variables.
const saludar = function(nombre) {
    return `Hola, ${nombre}!`;
};
console.log(saludar("Julio"));

// Ejemplo 2: Función flecha
// Una forma más compacta de escribir funciones.
const sumar = (a, b) => a + b;
console.log(sumar(5, 3));

// Ejemplo 3: Función con parámetros por defecto
// Los parámetros pueden tener valores predeterminados.
function presentar(nombre = "Invitado", edad = 18) {
    return `Me llamo ${nombre} y tengo ${edad} años.`;
}
console.log(presentar());
console.log(presentar("Emiliano", 22));

// Ejemplo 4: Función que retorna otra función
// Las funciones pueden devolver otras funciones.
function crearMultiplicador(factor) {
    return function(numero) {
        return numero * factor;
    };
}
const duplicar = crearMultiplicador(2);
console.log(duplicar(4)); // 8

// Ejemplo 5: Función recursiva
// Una función que se llama a sí misma.
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Ejemplo 6: Función de orden superior
// Las funciones pueden recibir otras funciones como argumentos.
function procesarArreglo(arr, funcion) {
    return arr.map(funcion);
}
const numeros = [1, 2, 3, 4];
const alCuadrado = (x) => x * x;
console.log(procesarArreglo(numeros, alCuadrado)); // [1, 4, 9, 16]

// Ejemplo 7: Uso de "this" en funciones
// "this" hace referencia al contexto de la función.
const persona = {
    nombre: "Julio",
    saludar: function() {
        console.log(`Hola, soy ${this.nombre}`);
    }
};
persona.saludar();

// Ejemplo 8: Función asíncrona
// Las funciones pueden manejar operaciones asíncronas.
async function obtenerDatos() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const datos = await respuesta.json();
    console.log(datos);
}
obtenerDatos(); // Llama a la función asíncrona y muestra los datos en la consola       