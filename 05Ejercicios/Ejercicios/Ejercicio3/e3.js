const $=(s)=>document.querySelector(s);
const money=(n)=>n.toLocaleString('es-MX',{style:'currency',currency:'MXN'});

$('#calc').addEventListener('click', ()=>{
  const prod = $('#prod').value.trim() || 'Producto';
  const precio = parseFloat($('#precio').value);
  const err=$('#err'), out=$('#out'); err.textContent=''; out.style.display='none';

  if(isNaN(precio) || precio<0){ err.textContent='Ingresa un precio válido (≥ 0).'; return; }

  const desc = precio*0.15;
  const total = precio - desc;

  out.innerHTML = `
    <p>Producto: <b>${prod}</b></p>
    <p>Precio: ${money(precio)} · Descuento (15%): <b>-${money(desc)}</b></p>
    <p class="big">Total a pagar: ${money(total)}</p>
  `;
  out.style.display='block';
});
