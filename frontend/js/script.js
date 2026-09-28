// ---------- Datos de edificios ----------
const BUILDINGS = [
  {
    id: "torre-aurora", name: "Torre Aurora", category: "Oficinas corporativas",
    location: "Av. Reforma 1450, Col. Centro · Ciudad de México", status: "optimo",
    desc: "Torre de oficinas clase A con fachada de vidrio, seis elevadores de alta velocidad y sistema de gestión energética automatizado.",
    year: 2014, floors: 24, units: 96, area: "18,500 m²",
    tags: ["Elevadores rápidos", "Generador de respaldo", "Seguridad 24/7", "Estacionamiento subterráneo"],
    contact: "Mariana Ortega", phone: "+52 55 4821 3390"
  },
  {
    id: "bellavista", name: "Edificio Bellavista", category: "Residencial",
    location: "Calle 12 #34-56, Chapinero · Bogotá", status: "mantenimiento",
    desc: "Conjunto residencial familiar con zona social en azotea, salón comunal y dos torres de parqueadero cubierto.",
    year: 2008, floors: 12, units: 48, area: "7,400 m²",
    tags: ["Salón comunal", "Zona BBQ", "Portería 24h", "Ascensor panorámico"],
    contact: "Andrés Cárdenas", phone: "+57 601 745 2210"
  },
  {
    id: "solaris", name: "Condominio Solaris", category: "Residencial vacacional",
    location: "Av. del Mar 890, Bocagrande · Cartagena", status: "optimo",
    desc: "Complejo vacacional frente al mar con piscina, gimnasio y administración de alquileres a corto plazo.",
    year: 2016, floors: 9, units: 72, area: "9,800 m²",
    tags: ["Piscina", "Gimnasio", "Acceso a playa", "Administración de alquileres"],
    contact: "Laura Jiménez", phone: "+57 605 310 4488"
  },
  {
    id: "meridian", name: "Centro Empresarial Meridian", category: "Oficinas corporativas",
    location: "Paseo de la Reforma 296, Juárez · Ciudad de México", status: "mantenimiento",
    desc: "Complejo corporativo con salas de juntas equipadas, terraza panorámica y valet parking para visitantes.",
    year: 2018, floors: 18, units: 60, area: "15,200 m²",
    tags: ["Sala de juntas", "Terraza panorámica", "Valet parking", "Fibra óptica"],
    contact: "Ricardo Salinas", phone: "+52 55 2310 7765"
  },
  {
    id: "los-pinos", name: "Residencial Los Pinos", category: "Residencial",
    location: "Av. Los Pinos 220, Providencia · Guadalajara", status: "optimo",
    desc: "Conjunto residencial de mediana altura con áreas verdes, roof garden y bicicletero techado.",
    year: 2011, floors: 8, units: 32, area: "5,600 m²",
    tags: ["Área de juegos", "Roof garden", "Lavandería", "Bicicletero"],
    contact: "Fernanda López", phone: "+52 33 4477 2290"
  },
  {
    id: "andes", name: "Plaza Corporativa Andes", category: "Oficinas corporativas",
    location: "Av. El Dorado 68-45, Chapinero · Bogotá", status: "optimo",
    desc: "Torre corporativa con certificación de eficiencia energética, auditorio propio y domótica en todas las plantas.",
    year: 2020, floors: 22, units: 88, area: "20,100 m²",
    tags: ["Auditorio", "Cafetería", "Domótica", "Certificación LEED"],
    contact: "Camilo Restrepo", phone: "+57 601 900 3312"
  }
];

// ---------- Reportes de ejemplo (solo si no hay nada guardado) ----------
const SEED_REPORTS = [
  { building: "torre-aurora", category: "Plomería", priority: "Alta", title: "Fuga de agua en el piso 12",
    desc: "Se detectó una fuga constante en la tubería del baño de damas del piso 12. El agua está escurriendo hacia el pasillo y puede dañar el cielo raso. Se necesita revisión urgente del sistema hidráulico.",
    author: "Mariana Ortega", hours: 12, img: null },
  { building: "meridian", category: "Ascensor", priority: "Alta", title: "Ascensor principal detenido",
    desc: "El ascensor principal del lobby quedó detenido entre los pisos 4 y 5 con la puerta entreabierta. El personal de mantenimiento colocó señalización y está esperando al técnico certificado.",
    author: "Ricardo Salinas", hours: 20, img: null },
  { building: "los-pinos", category: "Eléctrico", priority: "Media", title: "Luminaria fundida en el parqueadero",
    desc: "Tres luminarias del parqueadero subterráneo dejaron de funcionar, dejando una zona sin visibilidad adecuada durante la noche.",
    author: "Fernanda López", hours: 24, img: null },
  { building: "bellavista", category: "Estructura", priority: "Alta", title: "Grieta en la fachada norte",
    desc: "Apareció una grieta visible en la fachada norte a la altura del piso 6. Se recomienda inspección estructural antes de que crezca.",
    author: "Andrés Cárdenas", hours: 24, img: null },
  { building: "solaris", category: "Otro", priority: "Media", title: "Filtración en el techo de la alberca",
    desc: "Se detectó una pequeña filtración en el techo del área de alberca durante la última lluvia. No representa riesgo inmediato pero debe revisarse.",
    author: "Laura Jiménez", hours: 18, img: null },
];

const STORAGE_KEY = "sirep:reports";
let activeFilter = "all";

function loadReports() {
  let raw;
  try { raw = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { raw = null; }
  if (!raw) {
    raw = SEED_REPORTS.map(r => ({ ...r, id: crypto.randomUUID(), createdAt: Date.now(), expires: Date.now() + r.hours * 3600000 }));
    saveReports(raw);
  }
  return raw;
}
function saveReports(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
}
function pruneExpired() {
  const now = Date.now();
  const list = loadReports().filter(r => r.expires > now);
  saveReports(list);
  return list;
}

// ---------- Skyline decorativo del hero ----------
function drawSkyline() {
  const w = 1400, h = 260;
  const rng = (seed) => { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; };
  const rnd = rng(11);
  let x = 0, bars = [];
  while (x < w) {
    const bw = 55 + rnd() * 55;
    const bh = 60 + rnd() * 170;
    bars.push(`<rect x="${x}" y="${h - bh}" width="${bw - 3}" height="${bh}" fill="#8fa4d4"/>`);
    x += bw;
  }
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">${bars.join("")}</svg>`;
}

// ---------- Render edificios ----------
function statusLabel(s) { return s === "optimo" ? "Óptimo" : "Mantenimiento"; }

function renderBuildings() {
  const box = document.getElementById("buildingsList");
  box.innerHTML = "";
  BUILDINGS.forEach((b, i) => {
    const card = document.createElement("div");
    card.className = "building-card" + (i % 2 === 1 ? " reverse" : "");
    card.innerHTML = `
      <div class="b-media" style="background:linear-gradient(135deg,#c9d6ef,#7e98cf);">
        <span class="b-status ${b.status}">${statusLabel(b.status)}</span>
      </div>
      <div class="b-body">
        <p class="eyebrow">${b.category.toUpperCase()}</p>
        <h3>${b.name}</h3>
        <p class="b-loc">📍 ${b.location}</p>
        <p class="b-desc">${b.desc}</p>
        <div class="b-stats">
          <div><small>Año</small><strong>${b.year}</strong></div>
          <div><small>Pisos</small><strong>${b.floors}</strong></div>
          <div><small>Unidades</small><strong>${b.units}</strong></div>
          <div><small>Área</small><strong>${b.area}</strong></div>
        </div>
        <div class="b-tags">${b.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="b-foot">
          <div class="b-contact"><span>👤 ${b.contact}</span><span>📞 ${b.phone}</span></div>
          <button class="btn btn-primary btn-small" onclick="goToBuildingReports('${b.id}')">Ver reportes</button>
        </div>
      </div>`;
    box.appendChild(card);
  });
}

function goToBuildingReports(id) {
  activeFilter = id;
  document.getElementById("reportes").scrollIntoView({ behavior: "smooth" });
  renderFilters();
  renderReports();
}

// ---------- Filtros ----------
function renderFilters() {
  const box = document.getElementById("buildingFilters");
  const items = [{ id: "all", name: "Todos los edificios" }, ...BUILDINGS.map(b => ({ id: b.id, name: b.name }))];
  box.innerHTML = items.map(it =>
    `<button class="filter-pill ${activeFilter === it.id ? "active" : ""}" data-id="${it.id}">${it.name}</button>`
  ).join("");
  box.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.id;
      renderFilters();
      renderReports();
    });
  });
}

// ---------- Render reportes ----------
function fmtRemaining(ms) {
  if (ms <= 0) return "Expirado";
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `Quedan ${h}h ${m}min` : `Quedan ${m}min`;
}

function renderReports() {
  const list = pruneExpired().filter(r => activeFilter === "all" || r.building === activeFilter);
  const grid = document.getElementById("reportsGrid");
  document.getElementById("reportCount").textContent = `${list.length} reporte${list.length !== 1 ? "s" : ""} activo${list.length !== 1 ? "s" : ""}`;
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-msg">No hay reportes activos para este filtro.</p>`;
    return;
  }
  list.sort((a, b) => a.expires - b.expires).forEach(r => {
    const b = BUILDINGS.find(bd => bd.id === r.building);
    const total = r.expires - r.createdAt;
    const remaining = r.expires - Date.now();
    const pct = Math.max(0, Math.min(100, (remaining / total) * 100));
    const card = document.createElement("div");
    card.className = "report-card";
    card.innerHTML = `
      <div class="r-media" style="${r.img ? `background-image:url('${r.img}')` : "background:linear-gradient(135deg,#dbe3f2,#aebde0);"}">
        <span class="r-priority ${r.priority.toLowerCase()}">${r.priority}</span>
      </div>
      <div class="r-body">
        <div class="r-tags"><span>${b ? b.name : "Edificio"}</span><span>${r.category}</span></div>
        <h4>${r.title}</h4>
        <p>${r.desc}</p>
        <div class="r-timer"><span>${fmtRemaining(remaining)}</span></div>
        <div class="r-bar"><div class="r-bar-fill" style="width:${pct}%"></div></div>
        <div class="r-author"><span class="r-avatar">${r.author.charAt(0)}</span>${r.author}</div>
      </div>`;
    grid.appendChild(card);
  });
}

// ---------- Formulario ----------
function setupForm() {
  const select = document.getElementById("fBuilding");
  select.innerHTML = BUILDINGS.map(b => `<option value="${b.id}">${b.name}</option>`).join("");

  const form = document.getElementById("reportForm");
  const openForm = () => { form.classList.add("open"); form.scrollIntoView({ behavior: "smooth", block: "center" }); };
  document.getElementById("btnPublicarHero").addEventListener("click", () => {
    document.getElementById("reportes").scrollIntoView({ behavior: "smooth" });
    openForm();
  });
  document.getElementById("btnPublicarReportes").addEventListener("click", openForm);
  document.getElementById("btnCancelForm").addEventListener("click", () => form.classList.remove("open"));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const hours = Math.min(24, Math.max(1, parseInt(document.getElementById("fHours").value, 10) || 24));
    const finish = (imgData) => {
      const list = loadReports();
      list.push({
        id: crypto.randomUUID(),
        building: select.value,
        category: document.getElementById("fCategory").value,
        priority: document.getElementById("fPriority").value,
        title: document.getElementById("fTitle").value.trim(),
        desc: document.getElementById("fDesc").value.trim(),
        author: "Tú",
        img: imgData || null,
        createdAt: Date.now(),
        expires: Date.now() + hours * 3600000
      });
      saveReports(list);
      form.reset();
      document.getElementById("fHours").value = 24;
      form.classList.remove("open");
      activeFilter = "all";
      renderFilters();
      renderReports();
    };
    const file = document.getElementById("fPhoto").files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => finish(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      finish(null);
    }
  });
}

// ---------- Stats del hero ----------
function renderHeroStats() {
  const reports = pruneExpired();
  document.getElementById("heroStats").innerHTML = `
    <div class="hstat"><span class="hicon">⌂</span><div><strong>${BUILDINGS.length}</strong><small>Edificios conectados</small></div></div>
    <div class="hstat"><span class="hicon">▤</span><div><strong>${reports.length}</strong><small>Reportes activos</small></div></div>
    <div class="hstat"><span class="hicon">◷</span><div><strong>24 h</strong><small>Duración máxima</small></div></div>`;
}

// ---------- Init ----------
document.getElementById("heroSkyline").innerHTML = drawSkyline();
renderBuildings();
renderFilters();
renderReports();
renderHeroStats();
setupForm();
setInterval(() => { renderReports(); renderHeroStats(); }, 60000);