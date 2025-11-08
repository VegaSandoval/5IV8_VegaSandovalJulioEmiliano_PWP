const $ = (s) => document.querySelector(s);
const money = (n) => n.toLocaleString('es-MX',{style:'currency',currency:'MXN'});

$('#calc').addEventListener('click', () => {
  const cap = parseFloat($('#capital').value);
  const meses = parseInt($('#meses').value,10);
  const err = $('#err'); const out = $('#out');
  err.textContent = ''; out.style.display = 'none';

  if (isNaN(cap) || cap <= 0){ err.textContent = 'Ingresa un capital válido (> 0).'; return; }
  if (isNaN(meses) || meses < 1 || meses > 18){ err.textContent = 'Meses debe estar entre 1 y 18.'; return; }

  const tasa = 0.02;                          // 2% mensual
  const total = cap * Math.pow(1 + tasa, meses);
  const interes = total - cap;

  out.innerHTML = `
    <p>Capital inicial: <b>${money(cap)}</b></p>
    <p>Meses: <b>${meses}</b> · Tasa mensual: <b>2%</b> (compuesto)</p>
    <p class="big">Interés ganado: ${money(interes)}</p>
    <p class="big">Total al final: ${money(total)}</p>
  `;
  out.style.display = 'block';
});
