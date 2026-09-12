<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Administración - Memoria Sefardí</title>
  <!-- Tailwind CSS para que se vea profesional -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 min-h-screen py-10 px-4">

  <main class="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-slate-200">
    <h1 class="text-3xl font-bold text-slate-900 mb-2">Agregar Nuevo Registro</h1>
    <p class="text-slate-600 mb-6 text-sm">Llena los datos del ancestro y sube su foto o documento. Se guardará directo en Supabase.</p>

    <form id="form-registro" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Nombre</label>
          <input type="text" id="nombre" required class="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Apellido</label>
          <input type="text" id="apellido" required class="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Fecha de Nacimiento</label>
          <input type="text" id="fecha_nacimiento" placeholder="Ej. 1540 o 12/05/1540" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Lugar de Nacimiento</label>
          <input type="text" id="lugar_nacimiento" placeholder="Ej. Toledo, España" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Fecha de Defunción</label>
          <input type="text" id="fecha_defuncion" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Lugar de Defunción</label>
          <input type="text" id="lugar_defuncion" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none">
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Biografía / Notas históricas</label>
        <textarea id="biografia" rows="4" class="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none"></textarea>
      </div>

      <!-- Espacio para la foto o documento -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Fotografía o Imagen del documento</label>
        <input type="file" id="archivo_foto" accept="image/*" class="w-full border border-slate-300 rounded-lg p-2 text-sm bg-slate-50 cursor-pointer">
      </div>

      <!-- Enlace de YouTube por si hay video o entrevista -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Enlace de YouTube (Audiovisual)</label>
        <input type="url" id="youtube_url" placeholder="https://www.youtube.com/watch?v=..." class="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none">
      </div>

      <button type="submit" id="btn-guardar" class="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-800 transition-colors">
        Guardar Registro en la Base de Datos
      </button>
    </form>
    
    <div id="mensaje-estado" class="mt-4 text-center text-sm font-medium"></div>
  </main>

  <!-- Scripts necesarios -->
  <script src="js/supabase.js"></script>
  <script src="js/admin.js"></script>
</body>
</html>
  
