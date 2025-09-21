let demoItems = [];
const perPage = 8;
let currentPage = 1;

async function loadData() {
  const res = await fetch("jobs.json");
  demoItems = await res.json();
  renderList(1);

  // Load mock tests also
  loadMockTests();
}

function renderList(page = 1) {
  const list = document.getElementById("listContainer");
  list.innerHTML = "";
  currentPage = page;
  const start = (page - 1) * perPage;
  const pageItems = demoItems.slice(start, start + perPage);
  pageItems.forEach((it) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="meta">
        <h3><a href="detail.html?id=${it.id}">${it.title}</a></h3>
        <div class="date">${it.date}</div>
        <div class="tag">${it.tag}</div>
      </div>
      <p>${it.excerpt}</p>
    `;
    list.appendChild(card);
  });
  renderPagination();
}

function renderPagination() {
  const pag = document.getElementById("pagination");
  pag.innerHTML = "";
  const total = Math.ceil(demoItems.length / perPage);
  for (let i = 1; i <= total; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => renderList(i);
    if (i === currentPage) btn.classList.add("active");
    pag.appendChild(btn);
  }
}

// ✅ Load Mock Tests
async function loadMockTests() {
  const res = await fetch("mocktests.json");
  const mockItems = await res.json();
  const container = document.getElementById("mockContainer");
  container.innerHTML = "";
  mockItems.forEach((t) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${t.title}</h3>
      <p><strong>Subject:</strong> ${t.subject}</p>
      <a href="${t.link}" target="_blank">Start Test</a>
    `;
    container.appendChild(card);
  });
}

loadData();