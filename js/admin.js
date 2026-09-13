/* Panel admin: personas → tabla personajes; páginas → menú automático. */
(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function setStatus(msg, ok) {
    var el = $("mensaje-estado");
    var text = $("texto-estado");
    if (!el) return;
    el.classList.remove("hidden");
    el.style.background = ok ? "#ecfdf5" : "#fef2f2";
    el.style.color = ok ? "#065f46" : "#9f1239";
    if (text) text.textContent = msg;
    else el.textContent = msg;
  }

  function localPeople() {
    try {
      return JSON.parse(localStorage.getItem("ms_personajes") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveLocalPeople(rows) {
    localStorage.setItem("ms_personajes", JSON.stringify(rows));
  }

  async function savePerson(payload) {
    var client = window.msReady ? await window.msReady : null;
    if (client) {
      var res = await client.from("personajes").insert(payload).select();
      if (!res.error) return { ok: true, where: "base" };
    }
    var rows = localPeople();
    rows.unshift(Object.assign({ id: Date.now() }, payload));
    saveLocalPeople(rows);
    return { ok: true, where: "local" };
  }

  async function savePage(payload) {
    var client = window.msReady ? await window.msReady : null;
    if (client) {
      var res = await client.from("paginas").insert(payload).select();
      if (!res.error) return { ok: true, where: "base" };
    }
    var rows = window.msNav.readLocalPages();
    rows = rows.filter(function (p) { return p.slug !== payload.slug; });
    rows.push(payload);
    window.msNav.writeLocalPages(rows);
    return { ok: true, where: "local" };
  }

  function paintPeople(list) {
    var box = $("lista-personajes");
    if (!box) return;
    var rows = list || [];
    if (!rows.length) {
      box.innerHTML = '<p class="col-span-3 text-center text-slate-500 py-8">Aún no hay personajes. Usa el formulario de arriba.</p>';
      return;
    }
    box.innerHTML = rows
      .map(function (p) {
        return (
          '<div class="glass-card rounded-xl p-4">' +
          "<p class=\"font-serif text-lg font-bold text-slate-900\">" +
          (p.nombre || "Sin nombre") +
          "</p>" +
          '<p class="text-sm text-slate-600 mt-1">' +
          [p.fecha_nacimiento, p.lugar_origen].filter(Boolean).join(" · ") +
          "</p></div>"
        );
      })
      .join("");
  }

  async function loadPeople() {
    var rows = localPeople();
    var client = window.msReady ? await window.msReady : null;
    if (client) {
      var res = await client.from("personajes").select("*").limit(50);
      if (!res.error && res.data && res.data.length) rows = res.data.concat(rows);
    }
    if (!rows.length && window.MS_DATA && MS_DATA.personas) {
      rows = MS_DATA.personas.map(function (p) {
        return {
          nombre: p.nombre,
          fecha_nacimiento: p.nacimiento && p.nacimiento.fecha,
          lugar_origen: p.nacimiento && p.nacimiento.lugar,
        };
      });
    }
    paintPeople(rows);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = $("form-personaje");
    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        var payload = {
          nombre: ($("nombre") && $("nombre").value.trim()) || "",
          fecha_nacimiento: ($("fecha_nacimiento") && $("fecha_nacimiento").value.trim()) || "",
          lugar_origen: ($("lugar_origen") && $("lugar_origen").value.trim()) || "",
          imagen_url: ($("imagen_url") && $("imagen_url").value.trim()) || "",
          descripcion: ($("descripcion") && $("descripcion").value.trim()) || "",
          video_youtube: ($("video_youtube") && $("video_youtube").value.trim()) || "",
        };
        if (!payload.nombre) {
          setStatus("El nombre es obligatorio.", false);
          return;
        }
        var r = await savePerson(payload);
        setStatus(
          r.where === "base"
            ? "Personaje guardado en la base de datos."
            : "Personaje guardado. La base tiene bloqueo de escritura; queda en este dispositivo y ya se lista abajo.",
          true
        );
        form.reset();
        loadPeople();
      });
    }

    var pageForm = $("form-pagina");
    if (pageForm) {
      var title = $("page-title");
      var slug = $("page-slug");
      if (title && slug) {
        title.addEventListener("input", function () {
          if (!slug.dataset.touched) slug.value = window.msNav.slugify(title.value);
        });
        slug.addEventListener("input", function () {
          slug.dataset.touched = "1";
          slug.value = window.msNav.slugify(slug.value);
        });
      }
      pageForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        var titulo = title.value.trim();
        var s = window.msNav.slugify(slug.value || titulo);
        if (!titulo || !s) {
          setStatus("La página necesita título.", false);
          return;
        }
        var payload = {
          slug: s,
          titulo: titulo,
          resumen: ($("page-excerpt") && $("page-excerpt").value.trim()) || "",
          cuerpo: ($("page-body") && $("page-body").value.trim()) || "",
          mostrar_en_menu: !$("page-in-menu") || $("page-in-menu").checked,
          orden: 200,
        };
        var r = await savePage(payload);
        setStatus(
          r.where === "base"
            ? 'Página «' + s + '» guardada. Ya aparece en el menú.'
            : 'Página «' + s + '» creada y agregada al menú. (Si la base no acepta escritura, queda en este dispositivo.)',
          true
        );
        pageForm.reset();
        if (window.msNav) window.msNav.renderNav();
      });
    }

    loadPeople();
  });
})();
