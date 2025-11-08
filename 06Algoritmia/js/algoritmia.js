// === Utilidades ===
const $ = (s) => document.querySelector(s);

// === Problema 1: Invertir palabras ===
$('#btn-p1').addEventListener('click', ()=>{
  const txt = $('#p1-input').value.trim();
  const out = $('#p1-output');
  if(!txt){ out.textContent = 'Por favor ingresa un texto válido.'; return; }
  const invertido = txt.split(/\s+/).reverse().join(' ');
  out.textContent = `Resultado:\n${invertido}`;
});

// === Problema 2: Producto escalar mínimo ===
$('#btn-p2').addEventListener('click', ()=>{
  const x=[], y=[];
  for(let i=1;i<=5;i++){
    const xi=parseFloat($('#x'+i).value);
    const yi=parseFloat($('#y'+i).value);
    if(isNaN(xi)||isNaN(yi)){ $('#p2-output').textContent='Completa todos los valores numéricos.'; return; }
    x.push(xi); y.push(yi);
  }
  // Ordena X ascendente y Y descendente para minimizar producto
  x.sort((a,b)=>a-b);
  y.sort((a,b)=>b-a);
  const productos = x.map((v,i)=>v*y[i]);
  const suma = productos.reduce((a,b)=>a+b,0);
  $('#p2-output').textContent = `Vectores ordenados:\nX: ${x.join(', ')}\nY: ${y.join(', ')}\n\nProducto escalar mínimo = ${suma}`;
});

// === Problema 3: Palabra con más caracteres únicos ===
$('#btn-p3').addEventListener('click', ()=>{
  const val = $('#p3-input').value.trim();
  const out = $('#p3-output');
  if(!val){ out.textContent='Ingresa palabras separadas por coma, sin espacios.'; return; }

  const palabras = val.split(',').map(p=>p.toUpperCase());
  let maxWord='', maxCount=0;
  palabras.forEach(p=>{
    const set = new Set(p.replace(/[^A-Z]/g,'')); // solo letras A-Z
    if(set.size>maxCount){ maxCount=set.size; maxWord=p; }
  });
  if(maxCount===0){ out.textContent='Ninguna palabra válida.'; return; }
  out.textContent = `Palabra con más caracteres únicos: ${maxWord}\nCantidad: ${maxCount}`;
});
