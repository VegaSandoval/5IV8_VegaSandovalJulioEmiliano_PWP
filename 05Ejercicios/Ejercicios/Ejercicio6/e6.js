const $=(s)=>document.querySelector(s);

function calcAge(birth){
  const today=new Date();
  let years=today.getFullYear()-birth.getFullYear();
  const m=today.getMonth()-birth.getMonth();
  if(m<0 || (m===0 && today.getDate()<birth.getDate())) years--;
  return years;
}

$('#calc').addEventListener('click', ()=>{
  const v=$('#fn').value;
  const err=$('#err'), out=$('#out'); err.textContent=''; out.style.display='none';

  if(!v){ err.textContent='Selecciona una fecha válida.'; return; }
  const birth=new Date(v);
  const years=calcAge(birth);
  if(isNaN(years)||years<0){ err.textContent='La fecha no es válida.'; return; }

  // Datos extra (opcional): días para el próximo cumpleaños
  const today=new Date();
  let next=new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if(next < today) next.setFullYear(today.getFullYear()+1);
  const diffDays=Math.ceil((next-today)/(1000*60*60*24));

  out.innerHTML=`
    <p>Fecha de nacimiento: <b>${birth.toLocaleDateString()}</b></p>
    <p class="big">Edad: ${years} ${years===1?'año':'años'}</p>
    <p>Siguiente cumpleaños en: ${diffDays} ${diffDays===1?'día':'días'}</p>
  `;
  out.style.display='block';
});
