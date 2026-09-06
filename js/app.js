/* ============================================================
   MEMORIA SEFARDÍ — Lógica de la aplicación de demostración
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Tabs
  document.querySelectorAll('.tabs').forEach(tabContainer => {
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const panels = tabContainer.parentElement.querySelectorAll('.tab-panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => {
          p.classList.toggle('active', p.id === target);
        });
      });
    });
  });

  // Search (demo)
  document.querySelectorAll('.search-bar form, .hero-search form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = form.querySelector('input').value.trim().toLowerCase();
      if (!q) return;
      // Simple redirect to personas with query
      window.location.href = `pages/personas.html?q=${encodeURIComponent(q)}`;
    });
  });

  // Highlight active nav
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.includes(href.replace('../', '').replace('./', ''))) {
      a.classList.add('active');
    }
  });

  // Populate dynamic lists if containers exist
  populateHomeHighlights();
  populatePersonasList();
  populateFamiliasList();
  populateDocumentosList();
  populateApellidosList();
  populatePersonDetail();
  populateAdminStats();
});

function populateHomeHighlights() {
  const destacados = document.getElementById('personajes-destacados');
  if (destacados && typeof MS_DATA !== 'undefined') {
    destacados.innerHTML = MS_DATA.personas.slice(0, 3).map(p => `
      <article class="card">
        <div class="card-img">📜</div>
        <div class="card-body">
          <h3><a href="pages/persona.html?id=${p.id}">${p.nombre}</a></h3>
          <div class="card-meta">${p.nacimiento.fecha} – ${p.fallecimiento.fecha} · ${p.lugares[0] || ''}</div>
          <p class="card-excerpt">${p.biografia.substring(0, 120)}...</p>
          <div class="mt-1"><span class="badge ${getEvidenciaBadge(p.nacimiento.evidencia)}">${getEvidenciaLabel(p.nacimiento.evidencia)}</span></div>
        </div>
      </article>
    `).join('');
  }

  const familiasRecientes = document.getElementById('familias-recientes');
  if (familiasRecientes) {
    familiasRecientes.innerHTML = MS_DATA.familias.map(f => `
      <article class="card">
        <div class="card-img">🏛️</div>
        <div class="card-body">
          <h3><a href="pages/familia.html?id=${f.id}">${f.apellido}</a></h3>
          <div class="card-meta">Variantes: ${f.variantes.slice(0, 3).join(', ')}</div>
          <p class="card-excerpt">${f.historia.substring(0, 110)}...</p>
        </div>
      </article>
    `).join('');
  }

  const docsRecientes = document.getElementById('docs-recientes');
  if (docsRecientes) {
    docsRecientes.innerHTML = MS_DATA.documentos.map(d => `
      <article class="card">
        <div class="card-img">📄</div>
        <div class="card-body">
          <h3><a href="pages/documento.html?id=${d.id}">${d.titulo}</a></h3>
          <div class="card-meta">${d.tipo} · ${d.fecha} · ${d.lugar}</div>
          <p class="card-excerpt">${d.resumen.substring(0, 100)}...</p>
        </div>
      </article>
    `).join('');
  }
}

function populatePersonasList() {
  const tbody = document.getElementById('personas-tbody');
  if (!tbody || typeof MS_DATA === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const q = (params.get('q') || '').toLowerCase();

  let list = MS_DATA.personas;
  if (q) {
    list = list.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.variantes.some(v => v.toLowerCase().includes(q)) ||
      p.apellidos.some(a => a.toLowerCase().includes(q)) ||
      p.lugares.some(l => l.toLowerCase().includes(q))
    );
  }

  tbody.innerHTML = list.map(p => `
    <tr>
      <td><a href="persona.html?id=${p.id}">${p.nombre}</a></td>
      <td>${p.nacimiento.fecha}</td>
      <td>${p.nacimiento.lugar}</td>
      <td>${p.fallecimiento.fecha}</td>
      <td><span class="badge ${getEvidenciaBadge(p.nacimiento.evidencia)}">${getEvidenciaLabel(p.nacimiento.evidencia)}</span></td>
    </tr>
  `).join('') || '<tr><td colspan="5">No se encontraron resultados.</td></tr>';
}

function populateFamiliasList() {
  const container = document.getElementById('familias-grid');
  if (!container) return;
  container.innerHTML = MS_DATA.familias.map(f => `
    <article class="card">
      <div class="card-img">🏛️</div>
      <div class="card-body">
        <h3><a href="familia.html?id=${f.id}">${f.apellido}</a></h3>
        <div class="card-meta">${f.variantes.join(' · ')}</div>
        <p class="card-excerpt">${f.historia.substring(0, 140)}...</p>
        <div class="mt-1"><span class="badge badge-documentado">Documentado</span></div>
      </div>
    </article>
  `).join('');
}

function populateDocumentosList() {
  const container = document.getElementById('documentos-lista');
  if (!container) return;
  container.innerHTML = MS_DATA.documentos.map(d => `
    <div class="doc-item">
      <div class="doc-icon">📄</div>
      <div class="doc-info">
        <h4><a href="documento.html?id=${d.id}">${d.titulo}</a></h4>
        <div class="doc-meta">${d.tipo} · ${d.fecha} · ${d.lugar} · ${d.archivo}</div>
      </div>
    </div>
  `).join('');
}

function populateApellidosList() {
  const tbody = document.getElementById('apellidos-tbody');
  if (!tbody) return;
  tbody.innerHTML = MS_DATA.familias.map(f => `
    <tr>
      <td><a href="familia.html?id=${f.id}">${f.apellido}</a></td>
      <td>${f.variantes.join(', ')}</td>
      <td>${f.lugares.slice(0, 4).join(', ')}</td>
      <td><span class="badge badge-documentado">Documentado</span></td>
    </tr>
  `).join('');
}

function populatePersonDetail() {
  const container = document.getElementById('persona-detalle');
  if (!container || typeof MS_DATA === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'david-ben-abraham-toledano';
  const p = getPersona(id);
  if (!p) {
    container.innerHTML = '<p>Persona no encontrada.</p>';
    return;
  }

  // Update page title
  document.title = `${p.nombre} — Memoria Sefardí`;

  const evidenciaHTML = p.evidenciaDocumental.map(e => `
    <tr>
      <td>${e.dato}</td>
      <td><span class="badge ${getEvidenciaBadge(e.nivel)}">${getEvidenciaLabel(e.nivel)}</span></td>
      <td><span class="stars">${starsHTML(e.estrellas)}</span></td>
      <td>${e.fuente}</td>
    </tr>
  `).join('');

  const docsHTML = p.documentos.map(did => {
    const d = getDocumento(did);
    if (!d) return '';
    return `<div class="doc-item">
      <div class="doc-icon">📄</div>
      <div class="doc-info">
        <h4><a href="documento.html?id=${d.id}">${d.titulo}</a></h4>
        <div class="doc-meta">${d.tipo} · ${d.fecha}</div>
      </div>
    </div>`;
  }).join('') || '<p>No hay documentos asociados en la demostración.</p>';

  const fuentesHTML = p.fuentes.map(f => `<li><strong>${f.tipo}:</strong> ${f.ref}</li>`).join('') || '<li>Sin fuentes adicionales en la demostración.</li>';

  const eventosHTML = p.eventos.map(ev => `
    <div class="timeline-item">
      <div class="timeline-date">${ev.anio}</div>
      <div class="timeline-content">
        <h4>${ev.titulo}</h4>
        <p>${ev.lugar} · ${ev.tipo}</p>
      </div>
    </div>
  `).join('');

  // Simple tree
  const padresHTML = p.padres.map(par => `
    <div class="tree-person ${par.evidencia === 'documentado' || par.evidencia === 'confirmado' ? 'documented' : (par.evidencia === 'probable' || par.evidencia === 'posible' ? 'estimated' : 'unconfirmed')}">
      <div class="name">${par.id ? `<a href="persona.html?id=${par.id}">${par.nombre}</a>` : par.nombre}</div>
      <div class="years">${getEvidenciaLabel(par.evidencia)}</div>
    </div>
  `).join('');

  const hijosHTML = p.hijos.map(h => `
    <div class="tree-person documented">
      <div class="name">${h.id ? `<a href="persona.html?id=${h.id}">${h.nombre}</a>` : h.nombre}</div>
      <div class="years">${getEvidenciaLabel(h.evidencia)}</div>
    </div>
  `).join('') || '<div class="tree-person unconfirmed"><div class="name">Sin hijos documentados</div></div>';

  container.innerHTML = `
    <div class="person-header">
      <div class="container">
        <div class="person-header-inner">
          <div class="person-photo">👤</div>
          <div class="person-info">
            <div class="breadcrumb"><a href="../index.html">Inicio</a> › <a href="personas.html">Personas</a> › ${p.nombre}</div>
            <h1>${p.nombre}</h1>
            <p class="person-variants">Variantes: ${p.variantes.join(' · ')}</p>
            <div class="person-facts">
              <div>
                <div class="fact-label">Nacimiento</div>
                <div class="fact-value">${p.nacimiento.fecha}<br><small>${p.nacimiento.lugar}</small>
                  <span class="badge ${getEvidenciaBadge(p.nacimiento.evidencia)}">${getEvidenciaLabel(p.nacimiento.evidencia)}</span>
                </div>
              </div>
              <div>
                <div class="fact-label">Fallecimiento</div>
                <div class="fact-value">${p.fallecimiento.fecha}<br><small>${p.fallecimiento.lugar}</small>
                  <span class="badge ${getEvidenciaBadge(p.fallecimiento.evidencia)}">${getEvidenciaLabel(p.fallecimiento.evidencia)}</span>
                </div>
              </div>
              <div>
                <div class="fact-label">Profesión</div>
                <div class="fact-value">${p.profesion}</div>
              </div>
              <div>
                <div class="fact-label">Cónyuge</div>
                <div class="fact-value">${p.conyuge.id ? `<a href="persona.html?id=${p.conyuge.id}">${p.conyuge.nombre}</a>` : p.conyuge.nombre}
                  <span class="badge ${getEvidenciaBadge(p.conyuge.evidencia)}">${getEvidenciaLabel(p.conyuge.evidencia)}</span>
                </div>
              </div>
              <div>
                <div class="fact-label">Privacidad</div>
                <div class="fact-value"><span class="privacy-badge privacy-public">Público</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container section">
      <div class="tabs">
        <button class="tab-btn active" data-tab="bio">Biografía</button>
        <button class="tab-btn" data-tab="evidencia">Evidencia documental</button>
        <button class="tab-btn" data-tab="familia">Familia y árbol</button>
        <button class="tab-btn" data-tab="documentos">Documentos</button>
        <button class="tab-btn" data-tab="fuentes">Fuentes</button>
        <button class="tab-btn" data-tab="cronologia">Cronología</button>
        <button class="tab-btn" data-tab="lugares">Lugares</button>
      </div>

      <div id="bio" class="tab-panel active">
        <h2>Biografía</h2>
        <p>${p.biografia.replace(/\n\n/g, '</p><p>')}</p>
        <h3 class="mt-3">Historia familiar</h3>
        <p>${p.historiaFamiliar}</p>
        <h3 class="mt-3">Información sefardí</h3>
        <p>${p.infoSefardi}</p>
        <div class="info-box mt-2">
          <strong>Nota de rigor:</strong> Esta ficha utiliza datos ficticios de demostración. En un entorno real, cada afirmación estaría respaldada por fuentes verificables y se distinguiría claramente lo documentado de lo hipotético.
        </div>
      </div>

      <div id="evidencia" class="tab-panel">
        <h2>Evidencia documental</h2>
        <p class="lead">Cada dato se clasifica según el nivel de evidencia disponible. Nunca se presenta una hipótesis como hecho confirmado.</p>
        <table class="evidence-table">
          <thead>
            <tr>
              <th>Dato</th>
              <th>Nivel</th>
              <th>Evidencia</th>
              <th>Fuente</th>
            </tr>
          </thead>
          <tbody>${evidenciaHTML}</tbody>
        </table>
        <div class="mt-2">
          <p><strong>Leyenda de estrellas:</strong></p>
          <ul style="list-style: disc; padding-left: 1.5rem; font-size: 0.9rem;">
            <li>★★★★★ Evidencia documental directa</li>
            <li>★★★★ Evidencia documental sólida</li>
            <li>★★★ Evidencia indirecta</li>
            <li>★★ Hipótesis razonable</li>
            <li>★ Investigación pendiente</li>
          </ul>
        </div>
      </div>

      <div id="familia" class="tab-panel">
        <h2>Familia y árbol genealógico</h2>
        <div class="warning-box">
          <strong>Importante:</strong> Los indicadores visuales distinguen información documentada (borde verde), estimada (borde amarillo discontinuo) y no confirmada (borde rojo punteado).
        </div>
        <div class="tree-container">
          <div class="tree">
            <div class="tree-level">${padresHTML}</div>
            <div class="tree-connector"></div>
            <div class="tree-level">
              <div class="tree-person documented">
                <div class="name">${p.nombre}</div>
                <div class="years">${p.nacimiento.fecha} – ${p.fallecimiento.fecha}</div>
              </div>
            </div>
            <div class="tree-connector"></div>
            <div class="tree-level">${hijosHTML}</div>
          </div>
        </div>
        <h3 class="mt-3">Relaciones</h3>
        <ul style="list-style: disc; padding-left: 1.5rem;">
          <li><strong>Padres:</strong> ${p.padres.map(par => par.nombre + ' (' + getEvidenciaLabel(par.evidencia) + ')').join('; ')}</li>
          <li><strong>Cónyuge:</strong> ${p.conyuge.nombre} (${getEvidenciaLabel(p.conyuge.evidencia)})</li>
          <li><strong>Hijos:</strong> ${p.hijos.map(h => h.nombre).join(', ') || 'No documentados'}</li>
          <li><strong>Hermanos:</strong> ${p.hermanos.map(h => h.nombre).join(', ') || 'No documentados'}</li>
        </ul>
      </div>

      <div id="documentos" class="tab-panel">
        <h2>Documentos relacionados</h2>
        <div class="doc-list">${docsHTML}</div>
      </div>

      <div id="fuentes" class="tab-panel">
        <h2>Fuentes y referencias</h2>
        <ol style="list-style: decimal; padding-left: 1.5rem;">${fuentesHTML}</ol>
      </div>

      <div id="cronologia" class="tab-panel">
        <h2>Cronología de su vida</h2>
        <div class="timeline">${eventosHTML}</div>
      </div>

      <div id="lugares" class="tab-panel">
        <h2>Lugares</h2>
        <p>Lugares asociados: <strong>${p.lugares.join(', ')}</strong></p>
        <div class="map-box mt-2">
          <div style="text-align:center;padding:2rem;">
            <p style="font-size:2rem;margin-bottom:0.5rem;">🗺️</p>
            <p>Mapa interactivo de demostración</p>
            <p style="font-size:0.9rem;color:#666;">En producción se integraría Leaflet / OpenStreetMap mostrando los puntos de nacimiento, residencia y migración de esta persona.</p>
            <p class="mt-1"><strong>Ruta aproximada:</strong> Toledo → Lisboa → Salónica</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Re-bind tabs after dynamic insert
  const tabContainer = container.querySelector('.tabs');
  if (tabContainer) {
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => p.classList.toggle('active', p.id === target));
      });
    });
  }
}

function populateAdminStats() {
  const stats = document.getElementById('admin-stats');
  if (!stats || !MS_DATA.stats) return;
  const s = MS_DATA.stats;
  stats.innerHTML = `
    <div class="stat-card"><div class="number">${s.personas}</div><div class="label">Personas</div></div>
    <div class="stat-card"><div class="number">${s.familias}</div><div class="label">Familias</div></div>
    <div class="stat-card"><div class="number">${s.documentos}</div><div class="label">Documentos</div></div>
    <div class="stat-card"><div class="number">${s.fotografias}</div><div class="label">Fotografías</div></div>
    <div class="stat-card"><div class="number">${s.fuentes}</div><div class="label">Fuentes</div></div>
    <div class="stat-card"><div class="number">${s.contribucionesPendientes}</div><div class="label">Pendientes</div></div>
    <div class="stat-card"><div class="number">${s.usuarios}</div><div class="label">Usuarios</div></div>
  `;
}
