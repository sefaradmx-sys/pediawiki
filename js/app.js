// Función para cargar personajes destacados desde Supabase
async function cargarPersonajesDestacados() {
  try {
    // Verificar que el cliente de Supabase esté disponible
    if (!window.supabase || !window.supabaseClient) {
      console.error('Cliente Supabase no disponible');
      mostrarError('Error: Cliente Supabase no configurado correctamente');
      return;
    }

    // Conectar con la tabla 'personajes' en Supabase
    const { data, error } = await window.supabaseClient
      .from('personajes')
      .select('*')
      .limit(6);

    if (error) {
      console.error('Error al cargar personajes:', error);
      mostrarError('Error al conectar con la base de datos: ' + error.message);
      return;
    }

    if (data && data.length > 0) {
      renderizarPersonajes(data);
    } else {
      console.warn('No hay personajes en la base de datos');
      mostrarMensaje('No hay personajes registrados aún. <a href="admin.html" class="text-sefarad-600 font-semibold hover:text-sefarad-700">Agregar el primer registro</a>');
    }
  } catch (err) {
    console.error('Error inesperado:', err);
    mostrarError('Error inesperado al cargar datos');
  }
}

// Función para renderizar tarjetas de personajes
function renderizarPersonajes(personajes) {
  const container = document.getElementById('personajes-destacados');
  
  if (!container) {
    console.warn('Contenedor #personajes-destacados no encontrado');
    return;
  }

  container.innerHTML = '';

  personajes.forEach((personaje) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'group glass-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105';
    
    // Construir contenido de la tarjeta
    let contenido = `
      <div class="relative overflow-hidden h-48 bg-gradient-to-br from-sefarad-300 to-sefarad-600">
    `;

    // Mostrar imagen si existe
    if (personaje.imagen_url) {
      contenido += `
        <img src="${personaje.imagen_url}" alt="${personaje.nombre || 'Personaje'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onerror="this.parentElement.innerHTML='<div class=\"w-full h-full flex items-center justify-center text-sefarad-100 text-4xl\"><i class=\"fa-solid fa-user-circle\"></i></div>'">
      `;
    } else {
      contenido += `
        <div class="w-full h-full flex items-center justify-center text-sefarad-100 text-4xl">
          <i class="fa-solid fa-user-circle"></i>
        </div>
      `;
    }

    contenido += `
      </div>
      <div class="p-5">
        <h3 class="font-serif text-xl font-bold text-sefarad-900 mb-2 line-clamp-2">${personaje.nombre || 'Sin nombre'}</h3>
        
        ${personaje.descripcion ? `
          <p class="text-sm text-slate-700 mb-3 line-clamp-3">${personaje.descripcion}</p>
        ` : ''}
        
        ${personaje.fecha_nacimiento || personaje.lugar_origen ? `
          <div class="flex flex-col gap-1 text-xs text-slate-600 mb-4">
            ${personaje.fecha_nacimiento ? `<span><i class="fa-solid fa-calendar text-sefarad-600 mr-2"></i>${personaje.fecha_nacimiento}</span>` : ''}
            ${personaje.lugar_origen ? `<span><i class="fa-solid fa-map-pin text-sefarad-600 mr-2"></i>${personaje.lugar_origen}</span>` : ''}
          </div>
        ` : ''}

        <div class="flex gap-2 pt-3 border-t border-sefarad-200">
          <a href="personas.html?id=${personaje.id}" class="flex-1 bg-sefarad-600 hover:bg-sefarad-700 text-white text-xs font-medium py-2 rounded transition-colors text-center">
            Ver Perfil
          </a>
          ${personaje.video_youtube ? `
            <button class="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-medium py-2 rounded transition-colors flex items-center justify-center gap-1" onclick="abrirVideo('${personaje.video_youtube}')" title="Ver video en YouTube">
              <i class="fa-solid fa-play"></i> Video
            </button>
          ` : ''}
        </div>
      </div>
    `;

    tarjeta.innerHTML = contenido;
    container.appendChild(tarjeta);
  });
}

// Función para abrir videos de YouTube en nueva pestaña
function abrirVideo(urlVideo) {
  if (urlVideo && urlVideo.trim()) {
    window.open(urlVideo, '_blank');
  }
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
  const container = document.getElementById('personajes-destacados');
  if (container) {
    container.innerHTML = `
      <div class="col-span-3 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <i class="fa-solid fa-exclamation-circle text-red-600 text-2xl mb-2"></i>
        <p class="text-red-700 font-medium">${mensaje}</p>
      </div>
    `;
  }
}

// Función para mostrar mensajes informativos
function mostrarMensaje(mensaje) {
  const container = document.getElementById('personajes-destacados');
  if (container) {
    container.innerHTML = `
      <div class="col-span-3 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <i class="fa-solid fa-info-circle text-blue-600 text-2xl mb-2"></i>
        <p class="text-blue-700 font-medium">${mensaje}</p>
      </div>
    `;
  }
}

// Cargar personajes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado. Iniciando carga de personajes...');
  cargarPersonajesDestacados();
});

// También ejecutar si el DOM ya está cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', cargarPersonajesDestacados);
} else {
  cargarPersonajesDestacados();
}