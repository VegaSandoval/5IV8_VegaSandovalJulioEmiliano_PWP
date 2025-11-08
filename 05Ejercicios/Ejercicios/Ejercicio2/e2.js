const $ = (s)=>document.querySelector(s);
const money=(n)=>n.toLocaleString('es-MX',{style:'currency',currency:'MXN'});

$('#calc').addEventListener('click', ()=>{
  const base = parseFloat($('#base').value);
  const v1 = parseFloat($('#v1').value);
  const v2 = parseFloat($('#v2').value);
  const v3 = parseFloat($('#v3').value);
  const err=$('#err'), out=$('#out'); err.textContent=''; out.style.display='none';

  if([base,v1,v2,v3].some(x=>isNaN(x)||x<0)){ err.textContent='Ingresa valores numéricos válidos (≥ 0).'; return; }
  const totalVentas = v1+v2+v3;
  const comision = totalVentas*0.10;
  const totalMes = base + comision;

  out.innerHTML = `
    <p>Ventas: ${money(totalVentas)} · Comisión (10%): <b>${money(comision)}</b></p>
    <p>Sueldo base: ${money(base)}</p>
    <p class="big">Total del mes: ${money(totalMes)}</p>
  `;
  out.style.display='block';
});
