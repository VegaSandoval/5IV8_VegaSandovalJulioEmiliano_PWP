const $=(s)=>document.querySelector(s);
const clamp01=(n)=>!(n>=0 && n<=10);

$('#calc').addEventListener('click', ()=>{
  const p1=parseFloat($('#p1').value), p2=parseFloat($('#p2').value),
        p3=parseFloat($('#p3').value), ex=parseFloat($('#ex').value),
        tf=parseFloat($('#tf').value);
  const err=$('#err'), out=$('#out'); err.textContent=''; out.style.display='none';

  const vals=[p1,p2,p3,ex,tf];
  if(vals.some(v=>isNaN(v) || clamp01(v))){
    err.textContent='Todas las calificaciones deben estar entre 0 y 10.';
    return;
  }

  const promParciales=(p1+p2+p3)/3;
  const compParc=promParciales*0.55;
  const compEx=ex*0.30;
  const compTf=tf*0.15;
  const total=(compParc+compEx+compTf);

  out.innerHTML=`
    <p>Promedio de parciales: <b>${promParciales.toFixed(2)}</b> → 55% = <b>${compParc.toFixed(2)}</b></p>
    <p>Examen final: ${ex.toFixed(2)} → 30% = <b>${compEx.toFixed(2)}</b></p>
    <p>Trabajo final: ${tf.toFixed(2)} → 15% = <b>${compTf.toFixed(2)}</b></p>
    <p class="big">Calificación final: ${total.toFixed(2)}</p>
  `;
  out.style.display='block';
});
