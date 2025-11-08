const API = "https://api.allorigins.win/raw?url=https://terraria.wiki.gg/api.php";
const results = document.getElementById("results");
const form = document.getElementById("form");
const input = document.getElementById("q");

document.querySelectorAll(".tip").forEach(t =>
  t.addEventListener("click", () => { input.value = t.dataset.q; form.requestSubmit(); })
);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (!q) return;
  await searchTerraria(q);
});

async function searchTerraria(q){
  results.innerHTML = `<p>Buscando <strong>${q}</strong>...</p>`;
  try{
    const url = `${API}?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.query || !data.query.search || data.query.search.length === 0){
      results.innerHTML = `<div class="empty">Sin resultados para <strong>${escapeHtml(q)}</strong>.</div>`;
      return;
    }

    const cards = data.query.search.map(p => `
      <article class="card">
        <h3 class="title">${escapeHtml(p.title)}</h3>
        <p class="extract">${p.snippet ? p.snippet.replace(/<\/?[^>]+(>|$)/g, "") : "Sin resumen disponible."}</p>
        <div class="actions">
          <a href="https://terraria.wiki.gg/wiki/${encodeURIComponent(p.title)}" target="_blank" rel="noopener">Ver en wiki ↗</a>
        </div>
      </article>
    `).join("");

    results.innerHTML = cards;

  }catch(err){
    results.innerHTML = `<div class="error">Error al consultar la API: ${escapeHtml(String(err.message))}</div>`;
  }
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

searchTerraria("Demonite").catch(console.error);
