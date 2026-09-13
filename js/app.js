/* Portada: personajes desde Supabase, con respaldo local y datos de demostración. */

function mapSeedPerson(p) {
  return {
    id: p.id,
    nombre: p.nombre,
    descripcion: p.biografia,
    fecha_nacimiento: p.nacimiento && p.nacimiento.fecha,
    lugar_origen: p.nacimiento && p.nacimiento.lugar,
    imagen_url: p.foto,
    video_youtube: null,
  };
}

async function cargarPersonajesDestacados() {
  var container = document.getElementById("personajes-destacados");
  if (!container) return;

  var rows = [];
  try {
    var client = window.msReady ? await window.msReady : null;
    if (client) {
      var res = await client.from("personajes").select("*").limit(6);
      if (res.error) {
        console.warn("Supabase personajes:", res.error.message);
      } else if (res.data && res.data.length) {
        rows = res.data;
      }
    }
  } catch (err) {
    console.error("Error al conectar con la base:", err);
  }

  try {
    var local = JSON.parse(localStorage.getItem("ms_personajes") || "[]");
    if (local.length) rows = local.concat(rows);
  } catch (e) {}

  if (!rows.length && typeof MS_DATA !== "undefined" && MS_DATA.personas) {
    rows = MS_DATA.personas.slice(0, 6).map(mapSeedPerson);
  }

  if (rows.length) {
    renderizarPersonajes(rows);
    return;
  }

  mostrarMensaje(
    'La base está conectada pero aún no hay registros. <a href="admin.html" class="text-sefarad-600 font-semibold hover:text-sefarad-700">Agregar el primer registro</a>'
  );
}

function renderizarPersonajes(personajes) {
  var container = document.getElementById("personajes-destacados");
  if (!container) return;
  container.innerHTML = "";

  personajes.forEach(function (personaje) {
    var tarjeta = document.createElement("div");
    tarjeta.className =
      "group glass-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105";

    var contenido =
      '<div class="relative overflow-hidden h-48 bg-gradient-to-br from-sefarad-300 to-sefarad-600">';
    if (personaje.imagen_url) {
      contenido +=
        '<img src="' +
        personaje.imagen_url +
        '" alt="' +
        (personaje.nombre || "Personaje") +
        '" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">';
    } else {
      contenido +=
        '<div class="w-full h-full flex items-center justify-center text-sefarad-100 text-4xl"><i class="fa-solid fa-user-circle"></i></div>';
    }
    contenido += "</div><div class=\"p-5\">";
    contenido +=
      '<h3 class="font-serif text-xl font-bold text-sefarad-900 mb-2 line-clamp-2">' +
      (personaje.nombre || "Sin nombre") +
      "</h3>";
    if (personaje.descripcion) {
      contenido +=
        '<p class="text-sm text-slate-700 mb-3 line-clamp-3">' + personaje.descripcion + "</p>";
    }
    if (personaje.fecha_nacimiento || personaje.lugar_origen) {
      contenido += '<div class="flex flex-col gap-1 text-xs text-slate-600 mb-4">';
      if (personaje.fecha_nacimiento) {
        contenido +=
          '<span><i class="fa-solid fa-calendar text-sefarad-600 mr-2"></i>' +
          personaje.fecha_nacimiento +
          "</span>";
      }
      if (personaje.lugar_origen) {
        contenido +=
          '<span><i class="fa-solid fa-map-pin text-sefarad-600 mr-2"></i>' +
          personaje.lugar_origen +
          "</span>";
      }
      contenido += "</div>";
    }
    var perfil =
      "pages/persona.html?id=" + encodeURIComponent(personaje.id || personaje.nombre || "");
    contenido +=
      '<div class="flex gap-2 pt-3 border-t border-sefarad-200"><a href="' +
      perfil +
      '" class="flex-1 bg-sefarad-600 hover:bg-sefarad-700 text-white text-xs font-medium py-2 rounded transition-colors text-center">Ver Perfil</a>';
    if (personaje.video_youtube) {
      contenido +=
        '<button class="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-medium py-2 rounded transition-colors" onclick="abrirVideo(\'' +
        personaje.video_youtube.replace(/'/g, "") +
        '\')"><i class="fa-solid fa-play"></i> Video</button>';
    }
    contenido += "</div></div>";
    tarjeta.innerHTML = contenido;
    container.appendChild(tarjeta);
  });
}

function abrirVideo(urlVideo) {
  if (urlVideo && urlVideo.trim()) window.open(urlVideo, "_blank");
}

function mostrarError(mensaje) {
  var container = document.getElementById("personajes-destacados");
  if (!container) return;
  container.innerHTML =
    '<div class="col-span-3 p-6 bg-red-50 border border-red-200 rounded-lg text-center"><i class="fa-solid fa-exclamation-circle text-red-600 text-2xl mb-2"></i><p class="text-red-700 font-medium">' +
    mensaje +
    "</p></div>";
}

function mostrarMensaje(mensaje) {
  var container = document.getElementById("personajes-destacados");
  if (!container) return;
  container.innerHTML =
    '<div class="col-span-3 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center"><i class="fa-solid fa-info-circle text-blue-600 text-2xl mb-2"></i><p class="text-blue-700 font-medium">' +
    mensaje +
    "</p></div>";
}

document.addEventListener("DOMContentLoaded", function () {
  cargarPersonajesDestacados();
});
