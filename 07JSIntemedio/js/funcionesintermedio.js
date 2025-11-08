const $ = (s) => document.querySelector(s);
const money = (n) => n.toLocaleString('es-MX',{style:'currency',currency:'MXN'});

// ---- Problema 1
$('#btn-p1').addEventListener('click', () => {
  const a = parseFloat($('#p1-a').value);
  const b = parseFloat($('#p1-b').value);
  const err = $('#p1-err'), out = $('#p1-out');
  err.textContent = ''; out.style.display = 'none';

  if (isNaN(a) || isNaN(b)) { err.textContent = 'Ingresa ambos números.'; return; }

  let op = '', res = 0;
  if (a === b) { op = 'Multiplicación'; res = a * b; }
  else if (a > b) { op = 'Resta (A - B)'; res = a - b; }
  else { op = 'Suma (A + B)'; res = a + b; }

  out.innerHTML = `<p>Operación: <b>${op}</b></p><p class="big">Resultado: ${res}</p>`;
  out.style.display = 'block';
});

// ---- Problema 2
$('#btn-p2').addEventListener('click', () => {
  const a = parseFloat($('#p2-a').value);
  const b = parseFloat($('#p2-b').value);
  const c = parseFloat($('#p2-c').value);
  const err = $('#p2-err'), out = $('#p2-out');
  err.textContent = ''; out.style.display = 'none';

  if ([a,b,c].some(v => isNaN(v))) { err.textContent = 'Completa los tres números.'; return; }

  let aviso = '';
  if (a===b || a===c || b===c) aviso = '⚠️ Hay números repetidos; el enunciado pedía diferentes.';
  const mayor = Math.max(a,b,c);

  out.innerHTML = `<p class="big">Mayor: ${mayor}</p>${aviso ? `<p>${aviso}</p>`:''}`;
  out.style.display = 'block';
});

// ---- Problema 3
$('#btn-p3').addEventListener('click', () => {
  const horas = parseFloat($('#p3-horas').value);
  const tarifa = parseFloat($('#p3-tarifa').value);
  const err = $('#p3-err'), out = $('#p3-out');
  err.textContent = ''; out.style.display = 'none';

  if (isNaN(horas) || horas < 0 || isNaN(tarifa) || tarifa < 0) {
    err.textContent = 'Ingresa horas y tarifa válidas (≥ 0).'; return;
  }

  const horasBase = Math.min(horas, 40);
  const extras = Math.max(horas - 40, 0);

  const extrasDoble = Math.min(extras, 8);
  const extrasTriple = Math.max(extras - 8, 0);

  const pagoBase   = horasBase * tarifa;
  const pagoExtras = extrasDoble * tarifa * 2 + extrasTriple * tarifa * 3;
  const pagoTotal  = pagoBase + pagoExtras;

  out.innerHTML = `
    <p>Horas base: <b>${horasBase}</b> · Extras: <b>${extras}</b> (doble: ${extrasDoble}, triple: ${extrasTriple})</p>
    <p>Pago base: ${money(pagoBase)}</p>
    <p class="big">Pago por extras: ${money(pagoExtras)}</p>
    <p class="big">Total semanal: ${money(pagoTotal)}</p>
  `;
  out.style.display = 'block';
});

// ---- Problema 4
$('#btn-p4').addEventListener('click', () => {
  const sal = parseFloat($('#p4-sal').value);
  const anios = parseFloat($('#p4-anios').value);
  const err = $('#p4-err'), out = $('#p4-out');
  err.textContent = ''; out.style.display = 'none';

  if (isNaN(sal) || sal < 0 || isNaN(anios) || anios < 0) {
    err.textContent = 'Ingresa salario y años válidos (≥ 0).'; return;
  }

  let pct = 0.05;
  if (anios >= 1 && anios < 2) pct = 0.07;
  else if (anios >= 2 && anios < 5) pct = 0.10;
  else if (anios >= 5 && anios < 10) pct = 0.15;
  else if (anios >= 10) pct = 0.20;

  const utilidad = sal * pct;

  out.innerHTML = `
    <p>Años en la empresa: <b>${anios}</b> · Porcentaje: <b>${(pct*100).toFixed(0)}%</b></p>
    <p class="big">Utilidad anual: ${money(utilidad)}</p>
  `;
  out.style.display = 'block';
});
