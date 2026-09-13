/* Menú dinámico: páginas del sitio + páginas nuevas (base o este dispositivo). */
(function () {
  var SYSTEM = [
    { title: "Inicio", file: "index.html" },
    { title: "Personas", file: "pages/personas.html" },
    { title: "Familias", file: "pages/familias.html" },
    { title: "Apellidos", file: "pages/apellidos.html" },
    { title: "Documentos", file: "pages/documentos.html" },
    { title: "Árboles", file: "pages/arboles.html" },
    { title: "Lugares", file: "pages/lugares.html" },
    { title: "Mapa", file: "pages/mapa.html" },
    { title: "Cronología", file: "pages/cronologia.html" },
    { title: "Fuentes", file: "pages/fuentes.html" },
    { title: "Biblioteca", file: "pages/biblioteca.html" },
    { title: "Sobre el proyecto", file: "pages/sobre.html" },
  ];

  function inPages() {
    return /\/pages(\/|$)/.test(location.pathname);
  }

  function hrefFor(file) {
    if (!file) return "#";
    if (/^https?:/i.test(file) || file.charAt(0) === "?") return file;
    if (inPages()) {
      if (file === "index.html") return "../index.html";
      if (file.indexOf("pages/") === 0) return file.slice(6);
      return "../" + file;
    }
    return file;
  }

  function slugify(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  function readLocalPages() {
    try {
      return JSON.parse(localStorage.getItem("ms_paginas") || "[]");
    } catch (e) {
      return [];
    }
  }

  function writeLocalPages(rows) {
    localStorage.setItem("ms_paginas", JSON.stringify(rows));
  }

  async function readDbPages() {
    if (!window.msReady) return [];
    var client = await window.msReady;
    if (!client) return [];
    var res = await client
      .from("paginas")
      .select("slug,titulo,resumen,cuerpo,href,mostrar_en_menu,orden")
      .eq("mostrar_en_menu", true)
      .order("orden", { ascending: true });
    if (res.error || !res.data) return [];
    return res.data;
  }

  function isActive(href) {
    var here = location.pathname.split("/").pop() || "index.html";
    var target = (href || "").split("?")[0].split("/").pop();
    if (here === "index.html" || here === "" || here === "pediawiki") {
      return target === "index.html" || href === "index.html" || href === "../index.html";
    }
    return here === target;
  }

  function extraItems(dbRows, localRows) {
    var seen = {};
    var out = [];
    function add(row) {
      var slug = row.slug || slugify(row.titulo || row.title);
      if (!slug || seen[slug]) return;
      seen[slug] = true;
      var title = row.titulo || row.title;
      var show = row.mostrar_en_menu !== false && row.show_in_menu !== false;
      if (!show || !title) return;
      out.push({
        title: title,
        file: row.href || "pages/pagina.html?slug=" + encodeURIComponent(slug),
        slug: slug,
      });
    }
    (dbRows || []).forEach(add);
    (localRows || []).forEach(add);
    return out;
  }

  function paint(nav, items, variant) {
    if (!nav) return;
    nav.innerHTML = "";
    items.forEach(function (item) {
      var a = document.createElement("a");
      a.href = hrefFor(item.file);
      a.textContent = item.title;
      if (variant === "tailwind") {
        var active = isActive(hrefFor(item.file));
        a.className = active
          ? "px-3 py-1.5 rounded-md bg-sefarad-600 text-white shadow-sm font-semibold"
          : "px-3 py-1.5 rounded-md text-slate-300 hover:text-sefarad-300 hover:bg-slate-800/60 transition-all";
      } else if (variant === "mobile") {
        a.className = "px-3 py-2 rounded text-slate-300 hover:bg-slate-800";
      } else if (isActive(hrefFor(item.file))) {
        a.className = "active";
      }
      nav.appendChild(a);
    });
    var admin = document.createElement("a");
    admin.href = hrefFor("admin.html");
    admin.textContent = variant === "tailwind" || variant === "mobile" ? "Admin" : "Admin";
    if (variant === "tailwind") {
      admin.className =
        "px-3 py-1.5 rounded-md text-sefarad-400 hover:text-sefarad-200 hover:bg-slate-800/60 transition-all font-semibold";
    } else if (variant === "mobile") {
      admin.className = "px-3 py-2 rounded text-sefarad-400 hover:bg-slate-800 font-semibold";
    }
    nav.appendChild(admin);
  }

  async function renderNav() {
    var dbRows = [];
    try {
      dbRows = await readDbPages();
    } catch (e) {
      dbRows = [];
    }
    var extras = extraItems(dbRows, readLocalPages());
    var items = SYSTEM.concat(extras);
    var desktop = document.getElementById("main-nav") || document.querySelector("nav.main-nav") || document.querySelector("header nav");
    var mobileGrid = document.querySelector("#mobile-menu .grid") || document.querySelector("#mobile-menu");
    var variant =
      desktop && (desktop.id === "main-nav" || /lg:flex|space-x-1/.test(desktop.className || ""))
        ? "tailwind"
        : "css";
    paint(desktop, items, variant);
    if (mobileGrid) paint(mobileGrid, items, "mobile");
  }

  window.msNav = {
    slugify: slugify,
    readLocalPages: readLocalPages,
    writeLocalPages: writeLocalPages,
    renderNav: renderNav,
    hrefFor: hrefFor,
  };

  function start() {
    renderNav();
    if (window.msReady) window.msReady.then(function () { renderNav(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
