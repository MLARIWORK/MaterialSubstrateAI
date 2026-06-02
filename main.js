const list = document.getElementById("mineral-list");
function renderList(filter = "") {
  list.innerHTML = "";
  const f = filter.toLowerCase().trim();
  GROUPS.forEach(g => {
    const items = MINERALS.filter(m =>
      m.category === g.id &&
      (!f || m.name.toLowerCase().includes(f) || m.symbol.toLowerCase().includes(f) || m.category.toLowerCase().includes(f))
    );
    if (items.length === 0) return;
    const grpEl = document.createElement("div");
    grpEl.className = "group";
    grpEl.innerHTML = `<div class="group-title">${g.label}</div>`;
    items.forEach(m => {
      const el = document.createElement("div");
      el.className = "mineral-item";
      el.dataset.id = m.id;
      el.innerHTML = `
        <div class="symbol">${m.symbol}</div>
        <div class="mineral-name">${m.name}</div>
        <div class="mineral-meta">${m.mining.length + m.processing.length + m.refining.length} nodes</div>
      `;
      el.addEventListener("click", () => selectMineral(m.id));
      grpEl.appendChild(el);
    });
    list.appendChild(grpEl);
  });
}
renderList();

document.getElementById("search").addEventListener("input", e => renderList(e.target.value));

/* ============================================================
   WORLD MAP
   ============================================================ */
const svg = d3.select("#map");
const mapEl = document.querySelector(".map-container");
let W = mapEl.clientWidth;
let H = mapEl.clientHeight;

const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);

/* All map elements live inside gZoom so pan/zoom transforms them together */
const gZoom = svg.append("g").attr("class", "zoom-wrapper");
const gOcean = gZoom.append("g");
const gGraticule = gZoom.append("g");
const gCountries = gZoom.append("g");
const gArcs = gZoom.append("g");
const gArrows = gZoom.append("g");
const gNodes = gZoom.append("g");

let currentZoomK = 1;

const zoom = d3.zoom()
  .scaleExtent([1, 10])
  .on("zoom", (event) => {
    gZoom.attr("transform", event.transform);
    currentZoomK = event.transform.k;
    /* Counter-scale node markers, labels, and direction arrows so they stay readable */
    const inv = `scale(${1 / currentZoomK})`;
    gNodes.selectAll(".node-inner").attr("transform", inv);
    gNodes.selectAll(".label-inner").attr("transform", inv);
    gArrows.selectAll(".arrow-inner").attr("transform", inv);
  });

svg.call(zoom);

/* Zoom button wiring */
document.getElementById("zoom-in").addEventListener("click", () => {
  svg.transition().duration(280).call(zoom.scaleBy, 1.6);
});
document.getElementById("zoom-out").addEventListener("click", () => {
  svg.transition().duration(280).call(zoom.scaleBy, 1 / 1.6);
});
document.getElementById("zoom-reset").addEventListener("click", () => {
  svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
});

/* Shared radius scale used by both nodes and arc-endpoint pullback */
const radiusScale = d3.scaleSqrt().domain([0, 100]).range([3, 18]);

let currentMineral = null;
let world = null;

function resize() {
  W = mapEl.clientWidth;
  H = mapEl.clientHeight;
  svg.attr("viewBox", `0 0 ${W} ${H}`);
  projection.fitSize([W * 0.95, H * 0.92], { type: "Sphere" });
  draw();
}
window.addEventListener("resize", resize);

function drawBase() {
  // ocean sphere
  gOcean.selectAll("path").data([{type:"Sphere"}]).join("path")
    .attr("d", path).attr("class", "sphere");

  // graticule
  const graticule = d3.geoGraticule().step([20, 20]);
  gGraticule.selectAll("path").data([graticule()]).join("path")
    .attr("d", path).attr("class", "graticule");

  // countries
  if (world) {
    const countries = topojson.feature(world, world.objects.countries).features;
    gCountries.selectAll("path").data(countries).join("path")
      .attr("d", path).attr("class", "country");
  }
}

function draw() {
  drawBase();
  if (currentMineral) renderMineralOnMap(currentMineral);
}

/* Load world topojson */
const WORLD_URLS = [
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
  "https://unpkg.com/world-atlas@2/countries-110m.json"
];

async function loadWorld() {
  for (const url of WORLD_URLS) {
    try {
      const r = await fetch(url);
      if (r.ok) { world = await r.json(); return; }
    } catch (e) { /* try next */ }
  }
}

(async () => {
  await loadWorld();
  document.getElementById("loading").style.display = "none";
  resize();
  // auto-select first mineral after load
  selectMineral("gallium");
})();

/* ============================================================
   ARC GENERATOR — curved great-circle-ish path
   ============================================================ */
function arcPath(from, to, dstRadius) {
  const p1 = projection(from);
  const p2 = projection(to);
  if (!p1 || !p2) return "";
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < 2) return "";
  /* leave a tiny gap so the arc kisses the edge of the destination circle */
  const pull = (dstRadius || 0) + 1;
  const shrink = Math.min(0.9, pull / dist);
  const p2adj = [p2[0] - dx * shrink, p2[1] - dy * shrink];
  const dr = dist * 1.3;
  return `M${p1[0]},${p1[1]} A${dr},${dr} 0 0,1 ${p2adj[0]},${p2adj[1]}`;
}

/* ============================================================
   RENDER MINERAL
   ============================================================ */
function renderMineralOnMap(m) {
  // Build node list with stage info
  const stageList = [
    ["mining", m.mining],
    ["processing", m.processing],
    ["refining", m.refining]
  ];

  const nodes = [];
  stageList.forEach(([stage, arr]) => {
    arr.forEach(d => {
      const coord = COORDS[d.country];
      if (!coord) return;
      nodes.push({ stage, country: d.country, share: d.share, note: d.note, coord });
    });
  });

  // Build arcs (top mining → top processing → top refining)
  const topMining = m.mining.slice(0, 4).map(d => ({...d, coord: COORDS[d.country]})).filter(d=>d.coord);
  const topProcessing = m.processing.slice(0, 4).map(d => ({...d, coord: COORDS[d.country]})).filter(d=>d.coord);
  const topRefining = m.refining.slice(0, 4).map(d => ({...d, coord: COORDS[d.country]})).filter(d=>d.coord);

  const arcs = [];
  topMining.forEach(src => {
    topProcessing.forEach(dst => {
      arcs.push({
        from: src.coord, to: dst.coord,
        kind: "mining-processing",
        weight: src.share * dst.share,
        dstShare: dst.share
      });
    });
  });
  topProcessing.forEach(src => {
    topRefining.forEach(dst => {
      arcs.push({
        from: src.coord, to: dst.coord,
        kind: "processing-refining",
        weight: src.share * dst.share,
        dstShare: dst.share
      });
    });
  });
  // Trim to strongest connections
  arcs.sort((a,b)=>b.weight-a.weight);
  const topArcs = arcs.slice(0, 14);

  // Render arcs
  const arcSel = gArcs.selectAll("path").data(topArcs);
  arcSel.exit().remove();
  const arcMerged = arcSel.enter().append("path")
    .merge(arcSel)
    .attr("class", d => `arc ${d.kind}`)
    .attr("d", d => arcPath(d.from, d.to, radiusScale(d.dstShare)))
    .attr("stroke-width", d => Math.max(0.4, Math.min(2.5, Math.sqrt(d.weight)/8)))
    .attr("opacity", 0);
  arcMerged.transition().duration(800).attr("opacity", 0.55);

  // Mid-arc direction chevrons (placed after `d` is set so getPointAtLength is valid)
  gArrows.selectAll(".arc-arrow").remove();
  arcMerged.each(function(d) {
    const len = this.getTotalLength();
    if (len < 10) return; // too short to host a readable arrow
    const mid  = this.getPointAtLength(len * 0.5);
    const next = this.getPointAtLength(Math.min(len, len * 0.5 + 1));
    const angle = Math.atan2(next.y - mid.y, next.x - mid.x) * 180 / Math.PI;
    const color = d.kind === "mining-processing" ? "#c2392b" : "#b67d00";
    const g = gArrows.append("g")
      .attr("class", "arc-arrow")
      .attr("transform", `translate(${mid.x},${mid.y}) rotate(${angle})`)
      .attr("opacity", 0);
    const inner = g.append("g")
      .attr("class", "arrow-inner")
      .attr("transform", `scale(${1 / currentZoomK})`);
    inner.append("path")
      .attr("d", "M-3,-2 L2,0 L-3,2")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.2)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");
    g.transition().duration(800).attr("opacity", 0.9);
  });

  // Render nodes — aggregate per country+stage
  const nodeMap = new Map();
  nodes.forEach(n => {
    const key = n.country + "_" + n.stage;
    if (!nodeMap.has(key)) nodeMap.set(key, n);
  });
  const nodeArr = Array.from(nodeMap.values());

  const nodeSel = gNodes.selectAll(".node").data(nodeArr, d => d.country + "_" + d.stage);
  nodeSel.exit().transition().duration(300).attr("opacity", 0).remove();

  const nodeEnter = nodeSel.enter().append("g")
    .attr("class", "node")
    .attr("transform", d => {
      const p = projection(d.coord);
      return `translate(${p[0]},${p[1]})`;
    });
  /* inner group is counter-scaled on zoom so circles stay readable */
  const inner = nodeEnter.append("g")
    .attr("class", "node-inner")
    .attr("transform", `scale(${1 / currentZoomK})`);
  inner.append("circle")
    .attr("class", d => `node-${d.stage}`)
    .attr("r", 0)
    .attr("opacity", 0.9)
    .on("mouseenter", function(ev, d) {
      d3.select(this).transition().duration(150).attr("r", radiusScale(d.share) * 1.3);
      showTooltip(ev, d);
    })
    .on("mousemove", function(ev) { moveTooltip(ev); })
    .on("mouseleave", function(ev, d) {
      d3.select(this).transition().duration(150).attr("r", radiusScale(d.share));
      hideTooltip();
    });

  /* update positions (in case projection changed) and apply current zoom counter-scale */
  nodeSel.merge(nodeEnter)
    .attr("transform", d => {
      const p = projection(d.coord);
      return `translate(${p[0]},${p[1]})`;
    })
    .select(".node-inner")
    .attr("transform", `scale(${1 / currentZoomK})`);

  gNodes.selectAll(".node-inner circle")
    .transition().duration(600)
    .attr("r", d => radiusScale(d.share));

  // Label each country only once, anchored to its largest stage circle
  gNodes.selectAll(".label-group").remove();
  const labelMap = new Map();
  nodeArr.forEach(n => {
    if (n.share < 15) return;
    const existing = labelMap.get(n.country);
    if (!existing || n.share > existing.share) labelMap.set(n.country, n);
  });
  Array.from(labelMap.values()).forEach(d => {
    const p = projection(d.coord);
    if (!p) return;
    const offsetX = radiusScale(d.share) + 4;
    const g = gNodes.append("g")
      .attr("class", "label-group")
      .attr("transform", `translate(${p[0]},${p[1]})`);
    const li = g.append("g")
      .attr("class", "label-inner")
      .attr("transform", `scale(${1 / currentZoomK})`);
    li.append("text").attr("class", "node-label")
      .attr("x", offsetX).attr("y", 3).text(d.country);
    li.append("text").attr("class", "node-share")
      .attr("x", offsetX).attr("y", 14).text(d.share + "%");
  });

  // Update header overlay
  document.getElementById("sel-sym").textContent = m.symbol;
  document.getElementById("sel-name").textContent = m.name;
  document.getElementById("sel-cat").textContent = m.category;

  // Stats pills
  const statsEl = document.getElementById("map-stats");
  statsEl.innerHTML = "";
  const topMine = m.mining[0];
  const topRef = m.refining[0];
  statsEl.innerHTML = `
    <div class="stat-pill">
      <div class="stat-label">Top miner</div>
      <div class="stat-value">${topMine.country} · ${topMine.share}%</div>
    </div>
    <div class="stat-pill">
      <div class="stat-label">Top refiner</div>
      <div class="stat-value">${topRef.country} · ${topRef.share}%</div>
    </div>
  `;

  // Sidebar active state
  document.querySelectorAll(".mineral-item").forEach(el => {
    el.classList.toggle("active", el.dataset.id === m.id);
  });

  // Country highlighting
  const countriesByStage = { mining: new Set(), processing: new Set(), refining: new Set() };
  m.mining.forEach(d => countriesByStage.mining.add(d.country));
  m.processing.forEach(d => countriesByStage.processing.add(d.country));
  m.refining.forEach(d => countriesByStage.refining.add(d.country));
  // Map country name to ISO numeric (rough mapping for the countries in our list)
  const COUNTRY_NAME_TO_ID = {
    "China": "156", "USA": "840", "Australia": "036", "DRC": "180", "Chile": "152",
    "Brazil": "076", "Russia": "643", "Canada": "124", "Indonesia": "360", "Peru": "604",
    "Mexico": "484", "South Africa": "710", "Myanmar": "104", "India": "356", "Japan": "392",
    "South Korea": "410", "Belgium": "056", "Germany": "276", "France": "250", "Norway": "578",
    "Estonia": "233", "Vietnam": "704", "Malaysia": "458", "Argentina": "032", "Bolivia": "068",
    "Philippines": "608", "New Caledonia": "540", "Kazakhstan": "398", "Mongolia": "496",
    "Zimbabwe": "716", "Rwanda": "646", "Zambia": "894", "Austria": "040", "Finland": "246",
    "Taiwan": "158", "Poland": "616", "Iceland": "352", "UK": "826", "Switzerland": "756",
    "Nigeria": "566", "Tanzania": "834", "Madagascar": "450", "Mozambique": "508", "Ukraine": "804"
  };
  gCountries.selectAll("path")
    .attr("class", d => {
      const id = d.id; // numeric ISO
      let cls = "country";
      for (const [name, isoId] of Object.entries(COUNTRY_NAME_TO_ID)) {
        if (isoId.padStart(3,"0") === String(id).padStart(3,"0")) {
          if (countriesByStage.refining.has(name)) cls += " has-refining";
          else if (countriesByStage.processing.has(name)) cls += " has-processing";
          else if (countriesByStage.mining.has(name)) cls += " has-mining";
          break;
        }
      }
      return cls;
    });

  // Populate info panel
  renderInfoPanel(m);
}

/* ============================================================
   TOOLTIP
   ============================================================ */
const tooltip = document.getElementById("tooltip");
function showTooltip(ev, d) {
  const m = currentMineral;
  if (!m) return;

  /* gather every stage this country participates in, within the current mineral */
  const stages = [
    { key: "mining", label: "Mining", arr: m.mining },
    { key: "processing", label: "Processing", arr: m.processing },
    { key: "refining", label: "Refining", arr: m.refining }
  ];
  const rows = stages
    .map(s => {
      const entry = s.arr.find(x => x.country === d.country);
      return entry ? { key: s.key, label: s.label, share: entry.share, note: entry.note } : null;
    })
    .filter(Boolean);

  const rowsHtml = rows.map(r => `
    <div>
      <div class="tt-row-main">
        <div class="tt-row-dot ${r.key}"></div>
        <div class="tt-row-label">${r.label}</div>
        <div class="tt-row-share">${r.share}%</div>
      </div>
      ${r.note ? `<div class="tt-row-note">${r.note}</div>` : ""}
    </div>
  `).join("");

  tooltip.innerHTML = `
    <div class="tt-country-header">${d.country}</div>
    <div class="tt-rows">${rowsHtml}</div>
  `;
  tooltip.style.opacity = 1;
  moveTooltip(ev);
}
function moveTooltip(ev) {
  const rect = mapEl.getBoundingClientRect();
  const x = ev.clientX - rect.left + 14;
  const y = ev.clientY - rect.top + 14;
  tooltip.style.left = x + "px";
  tooltip.style.top = y + "px";
}
function hideTooltip() { tooltip.style.opacity = 0; }

/* ============================================================
   INFO PANEL
   ============================================================ */
function renderInfoPanel(m) {
  const panel = document.getElementById("info-panel");

  const stageHtml = (title, stage, arr) => {
    const items = arr.map(d =>
      `<div class="chain-country">
        <span class="chain-country-name">${d.country}</span>
        <span class="chain-country-share">${d.share}%</span>
      </div>`
    ).join("");
    return `
      <div class="chain-stage">
        <div class="chain-stage-header">
          <div class="chain-stage-dot ${stage}"></div>
          <div class="chain-stage-label">${title}</div>
        </div>
        <div class="chain-countries">${items}</div>
      </div>
    `;
  };

  const apps = m.applications.map(a =>
    `<li>
      <div>
        <span class="app-title">${a.title}</span>
        <span class="app-detail">${a.detail}</span>
      </div>
    </li>`
  ).join("");

  panel.innerHTML = `
    <div class="info-section">
      <h3>Why it matters for AI</h3>
      <div class="why-text">${m.why}</div>
    </div>

    <div class="info-section">
      <h3>Top applications</h3>
      <ul class="applications-list">${apps}</ul>
    </div>

    <div class="info-section">
      <h3>Supply chain</h3>
      ${stageHtml("Mining", "mining", m.mining)}
      ${stageHtml("Processing", "processing", m.processing)}
      ${stageHtml("Refining", "refining", m.refining)}
    </div>

    ${m.chokepoint ? `
    <div class="info-section">
      <h3>Strategic chokepoint</h3>
      <div class="chokepoint">
        <div class="chokepoint-label">Concentration risk</div>
        <div class="chokepoint-text">${m.chokepoint}</div>
      </div>
    </div>
    ` : ""}
  `;
}

function selectMineral(id) {
  const m = MINERALS.find(x => x.id === id);
  if (!m) return;
  currentMineral = m;
  renderMineralOnMap(m);
}

/* ============================================================
   METHODOLOGY MODAL
   ============================================================ */
const modal = document.getElementById("modal-backdrop");
document.getElementById("open-methodology").addEventListener("click", () => {
  modal.classList.add("open");
});
document.getElementById("modal-close").addEventListener("click", () => {
  modal.classList.remove("open");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.remove("open");
});

