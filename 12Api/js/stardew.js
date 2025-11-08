// MediaWiki ES: algunas instalaciones exponen el API en /mediawiki/api.php
const API = "https://es.stardewvalleywiki.com/mediawiki/api.php";

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
  await searchStardew(q);
});

// carga inicial
searchStardew("Chirivía").catch(console.error);

async function searchStardew(q){
  paintSkeletons(6);
  try{
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      formatversion: "2",
      origin: "*",
      generator: "search",
      gsrsearch: q,
      gsrlimit: "12",
      prop: "pageimages|extracts|info",
      inprop: "url",
      exintro: "1",
      explaintext: "1",
      piprop: "thumbnail",
      pithumbsize: "320"
    });
    const url = `${API}?${params.toString()}`;
    const res = await fetch(url);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!data.query || !data.query.pages || data.query.pages.length === 0){
      results.innerHTML = `<div class="empty">Sin resultados para <strong>${escapeHtml(q)}</strong>.</div>`;
      return;
    }
    const cards = data.query.pages
      .sort((a,b)=>a.index-b.index)
      .map(p => card({
        title: p.title,
        extract: p.extract || "Sin extracto.",
        thumb: p.thumbnail?.source || "",
        url: p.canonicalurl || p.fullurl || "#"
      }))
      .join("");
    results.innerHTML = cards;
  }catch(err){
    results.innerHTML = `<div class="error">Ocurrió un error al consultar la API. ${escapeHtml(String(err.message))}</div>`;
  }
}

function card({title, extract, thumb, url}){
  return `
  <article class="card">
    ${thumb ? `<img class="thumb" src="${thumb}" alt="${escapeHtml(title)}">` : `<div class="thumb" aria-hidden="true"></div>`}
    <h3 class="title">${escapeHtml(title)}</h3>
    <p class="extract">${escapeHtml(extract)}</p>
    <div class="actions"><a href="${url}" target="_blank" rel="noopener">Abrir wiki ↗</a></div>
  </article>`;
}

function paintSkeletons(n){
  results.innerHTML = Array.from({length:n}, () => `<div class="skel"></div>`).join("");
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
