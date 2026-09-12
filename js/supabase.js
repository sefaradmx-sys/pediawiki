// js/supabase.js
// Sistema robusto de conexión a Supabase

// Configuración desde variables de entorno (VITE)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jytwmhpqerddaimyjtws.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dHdtaHBxZXJkZGFpbXlqdHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwOTYwNDcsImV4cCI6MjEwNDY3MjA0N30.3iPk7B-S_Rdj1h9YEwSVA3PoGwKrGRTETtuP4seUWwo';

let _supabaseClient = null;
let _supabaseReady = false;
let _supabaseError = null;

// Carga el script de Supabase desde CDN si no está disponible globalmente
function cargarSupabaseLibreria() {
  return new Promise((resolve, reject) => {
    // Si ya está cargado globalmente
    if (typeof window.supabase !== 'undefined') {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No se pudo cargar la librería de Supabase'));
    document.head.appendChild(script);
  });
}

// Inicializar el cliente de Supabase
async function inicializarSupabase() {
  if (_supabaseReady || _supabaseError) return _supabaseClient;

  try {
    // Esperar a que se cargue la librería
    await cargarSupabaseLibreria();

    // Validar que el cliente esté disponible
    if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
      throw new Error('Librería de Supabase no disponible después de cargar');
    }

    // Crear el cliente
    _supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    _supabaseReady = true;
    
    console.log('✅ Cliente de Supabase inicializado correctamente');
    return _supabaseClient;

  } catch (error) {
    _supabaseError = error;
    console.error('❌ Error inicializando Supabase:', error.message);
    return null;
  }
}

// Función para obtener el cliente (asincrónico)
async function obtenerClienteSupabase() {
  if (_supabaseClient) return _supabaseClient;
  return await inicializarSupabase();
}

// Funciones de utilidad para operaciones comunes

/**
 * Obtener todos los registros de una tabla
 * @param {string} tabla - Nombre de la tabla
 * @param {object} opciones - Opciones de query (select, filter, etc.)
 */
async function obtenerDatos(tabla, opciones = {}) {
  const client = await obtenerClienteSupabase();
  if (!client) throw new Error('Cliente de Supabase no disponible');

  let query = client.from(tabla).select(opciones.select || '*');

  if (opciones.filter) {
    query = query.eq(opciones.filter.campo, opciones.filter.valor);
  }

  if (opciones.limit) {
    query = query.limit(opciones.limit);
  }

  if (opciones.order) {
    query = query.order(opciones.order.campo, { ascending: opciones.order.asc !== false });
  }

  const { data, error } = await query;
  if (error) throw new Error(`Error obteniendo datos de ${tabla}: ${error.message}`);
  return data;
}

/**
 * Insertar un nuevo registro
 * @param {string} tabla - Nombre de la tabla
 * @param {object} datos - Datos a insertar
 */
async function insertarDatos(tabla, datos) {
  const client = await obtenerClienteSupabase();
  if (!client) throw new Error('Cliente de Supabase no disponible');

  const { data, error } = await client.from(tabla).insert([datos]).select();
  if (error) throw new Error(`Error insertando en ${tabla}: ${error.message}`);
  return data;
}

/**
 * Actualizar un registro
 * @param {string} tabla - Nombre de la tabla
 * @param {object} datos - Datos a actualizar
 * @param {object} filtro - Filtro para identificar el registro
 */
async function actualizarDatos(tabla, datos, filtro) {
  const client = await obtenerClienteSupabase();
  if (!client) throw new Error('Cliente de Supabase no disponible');

  let query = client.from(tabla).update(datos);
  
  Object.entries(filtro).forEach(([campo, valor]) => {
    query = query.eq(campo, valor);
  });

  const { data, error } = await query.select();
  if (error) throw new Error(`Error actualizando ${tabla}: ${error.message}`);
  return data;
}

/**
 * Eliminar un registro
 * @param {string} tabla - Nombre de la tabla
 * @param {object} filtro - Filtro para identificar el registro
 */
async function eliminarDatos(tabla, filtro) {
  const client = await obtenerClienteSupabase();
  if (!client) throw new Error('Cliente de Supabase no disponible');

  let query = client.from(tabla).delete();
  
  Object.entries(filtro).forEach(([campo, valor]) => {
    query = query.eq(campo, valor);
  });

  const { data, error } = await query;
  if (error) throw new Error(`Error eliminando de ${tabla}: ${error.message}`);
  return data;
}

/**
 * Subir un archivo a Supabase Storage
 * @param {string} bucket - Nombre del bucket
 * @param {string} ruta - Ruta del archivo
 * @param {File} archivo - Archivo a subir
 */
async function subirArchivo(bucket, ruta, archivo) {
  const client = await obtenerClienteSupabase();
  if (!client) throw new Error('Cliente de Supabase no disponible');

  const { data, error } = await client.storage
    .from(bucket)
    .upload(ruta, archivo, { upsert: true });

  if (error) throw new Error(`Error subiendo archivo: ${error.message}`);
  return data;
}

/**
 * Obtener URL pública de un archivo
 * @param {string} bucket - Nombre del bucket
 * @param {string} ruta - Ruta del archivo
 */
function obtenerURLArchivo(bucket, ruta) {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${ruta}`;
}

// Inicialización automática al cargar el script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarSupabase);
} else {
  inicializarSupabase();
}

// Exportar para uso en otros scripts
window.SupabaseService = {
  obtenerClienteSupabase,
  obtenerDatos,
  insertarDatos,
  actualizarDatos,
  eliminarDatos,
  subirArchivo,
  obtenerURLArchivo,
  isReady: () => _supabaseReady,
  getError: () => _supabaseError
};
