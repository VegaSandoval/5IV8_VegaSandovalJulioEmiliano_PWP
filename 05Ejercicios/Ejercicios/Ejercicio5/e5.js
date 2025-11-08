const $=(s)=>document.querySelector(s);

$('#calc').addEventListener('click', ()=>{
  const h=parseInt($('#h').value,10), m=parseInt($('#m').value,10);
  const err=$('#err'), out=$('#out'); err.textContent=''; out.style.display='none';

  if([h,m].some(v=>isNaN(v)||v<0)){ err.textContent='Ingresa cantidades válidas (≥ 0).'; return; }
  const total=h+m;
  if(total===0){ err.textContent='El total no puede ser 0.'; return; }

  const ph=(h/total)*100, pm=(m/total)*100;

  out.innerHTML=`
    <p>Total estudiantes: <b>${total}</b></p>
    <p class="big">Hombres: ${ph.toFixed(2)}% · Mujeres: ${pm.toFixed(2)}%</p>
  `;
  out.style.display='block';
});
