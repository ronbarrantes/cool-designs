const catalogUrl = "../catalog/design-catalog.json";

const state = {
  records: [],
  selectedId: null,
  search: "",
  quality: "all",
};

const cardsEl = document.querySelector("#cards");
const searchInput = document.querySelector("#searchInput");
const qualityFilter = document.querySelector("#qualityFilter");
const resultCount = document.querySelector("#resultCount");
const catalogMeta = document.querySelector("#catalogMeta");
const detailEmpty = document.querySelector("#detailEmpty");
const detailContent = document.querySelector("#detailContent");

function textMatches(record, query) {
  if (!query) return true;
  const haystack = [
    record.name,
    record.workflow,
    record.states,
    record.pattern,
    record.recreation,
    record.quality,
    ...(record.tags || []),
  ].join(" ").toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function filteredRecords() {
  return state.records.filter((record) => {
    const qualityMatches = state.quality === "all" || record.quality === state.quality;
    return qualityMatches && textMatches(record, state.search);
  });
}

function relativeAssetPath(path) {
  return `../${path}`;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function renderCard(record) {
  const hasCapture = record.capture_paths && record.capture_paths.length > 0;
  const thumbnail = hasCapture
    ? `<img src="${escapeHtml(relativeAssetPath(record.capture_paths[0]))}" alt="Screenshot capture for ${escapeHtml(record.name)}" loading="lazy">`
    : "No screenshot captured";

  return `
    <button class="card" type="button" data-id="${escapeHtml(record.id)}" aria-selected="${record.id === state.selectedId}">
      <div class="card-head">
        <h3>${escapeHtml(record.name)}</h3>
        <span class="quality">${escapeHtml(record.quality)}</span>
      </div>
      <div class="thumb">${thumbnail}</div>
      <p class="summary"><strong>Workflow:</strong> ${escapeHtml(record.workflow)}</p>
      <p class="summary"><strong>Pattern:</strong> ${escapeHtml(record.pattern)}</p>
    </button>
  `;
}

function renderCards() {
  const records = filteredRecords();
  resultCount.textContent = `${records.length} of ${state.records.length}`;
  cardsEl.innerHTML = records.length
    ? records.map(renderCard).join("")
    : '<p class="missing">No catalog records match the current filters.</p>';
}

function renderQualityOptions() {
  const qualities = [...new Set(state.records.map((record) => record.quality).filter(Boolean))].sort();
  qualityFilter.innerHTML = [
    '<option value="all">All quality levels</option>',
    ...qualities.map((quality) => `<option value="${escapeHtml(quality)}">${escapeHtml(quality)}</option>`),
  ].join("");
}

function renderDetail(record) {
  if (!record) {
    detailEmpty.hidden = false;
    detailContent.hidden = true;
    return;
  }

  const sources = (record.source_urls || [])
    .map((url) => `<li><a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(url)}</a></li>`)
    .join("");
  const capture = record.capture_paths && record.capture_paths.length > 0
    ? `<img class="detail-image" src="${escapeHtml(relativeAssetPath(record.capture_paths[0]))}" alt="Screenshot capture for ${escapeHtml(record.name)}">`
    : '<div class="missing">No screenshot path is listed for this record.</div>';

  detailEmpty.hidden = true;
  detailContent.hidden = false;
  detailContent.innerHTML = `
    <h2>${escapeHtml(record.name)}</h2>
    <p class="meta">${escapeHtml(record.id)} · ${escapeHtml(record.quality)} · verified ${escapeHtml(record.last_verified)}</p>
    <div class="detail-section">
      <h3>Capture</h3>
      ${capture}
    </div>
    <div class="detail-section">
      <h3>Workflow</h3>
      <p>${escapeHtml(record.workflow)}</p>
    </div>
    <div class="detail-section">
      <h3>States</h3>
      <p>${escapeHtml(record.states)}</p>
    </div>
    <div class="detail-section">
      <h3>Pattern</h3>
      <p>${escapeHtml(record.pattern)}</p>
    </div>
    <div class="detail-section">
      <h3>Recreation</h3>
      <p>${escapeHtml(record.recreation)}</p>
    </div>
    <div class="detail-section">
      <h3>Sources</h3>
      <ul class="source-list">${sources || "<li>No source URL listed.</li>"}</ul>
    </div>
  `;
}

function selectRecord(id) {
  state.selectedId = id;
  renderCards();
  renderDetail(state.records.find((record) => record.id === id));
}

function showBrokenCapture(img) {
  const message = document.createElement("div");
  message.className = "missing";
  message.textContent = `Screenshot could not be loaded: ${img.getAttribute("src")}`;

  if (img.classList.contains("detail-image")) {
    img.replaceWith(message);
  } else {
    img.parentElement.replaceChildren(message);
  }
}

document.addEventListener("error", (event) => {
  if (event.target instanceof HTMLImageElement) showBrokenCapture(event.target);
}, true);

cardsEl.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (card) selectRecord(card.dataset.id);
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value.trim();
  renderCards();
});

qualityFilter.addEventListener("change", (event) => {
  state.quality = event.target.value;
  renderCards();
});

fetch(catalogUrl)
  .then((response) => {
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    return response.json();
  })
  .then((catalog) => {
    state.records = catalog.records || [];
    catalogMeta.textContent = `${state.records.length} records · schema ${catalog.schema_version}`;
    renderQualityOptions();
    renderCards();
  })
  .catch((error) => {
    catalogMeta.textContent = "Catalog unavailable";
    cardsEl.innerHTML = `<p class="missing">${escapeHtml(error.message)}. Serve the project locally so the browser can load the JSON file.</p>`;
  });
