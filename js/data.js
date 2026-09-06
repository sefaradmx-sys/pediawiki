/* ============================================================
   MEMORIA SEFARDÍ — Datos de demostración (ficticios)
   Todos los personajes y documentos son inventados para demo.
   ============================================================ */

const MS_DATA = {
  personas: [
    {
      id: "david-ben-abraham-toledano",
      nombre: "David ben Abraham Toledano",
      variantes: ["David Toledano", "David de Toledo", "David ben Abraham"],
      nacimiento: { fecha: "c. 1485", lugar: "Toledo, Castilla", evidencia: "probable" },
      fallecimiento: { fecha: "c. 1542", lugar: "Salónica, Imperio Otomano", evidencia: "documentado" },
      profesion: "Comerciante y rabino",
      conyuge: { id: "rachel-cohen-toledano", nombre: "Rachel Cohen", evidencia: "documentado" },
      padres: [
        { id: "abraham-toledano", nombre: "Abraham Toledano", evidencia: "probable" },
        { id: null, nombre: "Sara (apellido desconocido)", evidencia: "hipotesis" }
      ],
      hijos: [
        { id: "isaac-toledano", nombre: "Isaac Toledano", evidencia: "documentado" },
        { id: "miriam-toledano", nombre: "Miriam Toledano", evidencia: "documentado" }
      ],
      hermanos: [
        { id: "samuel-toledano", nombre: "Samuel Toledano", evidencia: "posible" }
      ],
      apellidos: ["Toledano", "de Toledo"],
      lugares: ["Toledo", "Lisboa", "Salónica"],
      foto: null,
      biografia: `David ben Abraham Toledano fue un comerciante y erudito sefardí originario de Toledo. Tras el decreto de expulsión de 1492, su familia se trasladó temporalmente a Portugal y, hacia 1497-1500, emigró al Imperio Otomano, estableciéndose en Salónica, entonces uno de los principales centros de refugio sefardí.

En Salónica se dedicó al comercio de textiles y especias, al tiempo que participó en la vida comunitaria de la sinagoga de los toledanos. Conservamos menciones suyas en registros de la comunidad y en un testamento de 1540.

Sus descendientes se extendieron por los Balcanes y, siglos más tarde, algunas ramas llegaron a América.`,
      historiaFamiliar: `El apellido Toledano indica origen geográfico en la ciudad de Toledo. Las familias sefardíes que portaban este apellido tras la expulsión solían mantener la memoria de su procedencia castellana. No debe asumirse que todos los Toledano del mundo sefardí descienden de un único tronco; el apellido pudo adoptarse de forma independiente por varias familias.`,
      infoSefardi: `Documentado como miembro de la comunidad sefardí de Salónica. El apellido y la trayectoria migratoria son coherentes con patrones bien conocidos de la diáspora sefardí post-1492.`,
      evidenciaDocumental: [
        { dato: "Nombre completo", nivel: "documentado", fuente: "Registro comunitario de Salónica, 1520", estrellas: 4 },
        { dato: "Fecha de nacimiento aproximada", nivel: "probable", fuente: "Estimación a partir de edad en documentos", estrellas: 2 },
        { dato: "Lugar de nacimiento (Toledo)", nivel: "probable", fuente: "Tradición familiar y apellido", estrellas: 2 },
        { dato: "Residencia en Salónica", nivel: "confirmado", fuente: "Acta de matrimonio de su hijo Isaac, 1535", estrellas: 5 },
        { dato: "Fallecimiento c. 1542", nivel: "documentado", fuente: "Inventario post-mortem, archivo otomano", estrellas: 4 },
        { dato: "Matrimonio con Rachel Cohen", nivel: "documentado", fuente: "Registro de ketubá, Salónica", estrellas: 5 }
      ],
      documentos: ["doc-ketuba-1535", "doc-testamento-1540", "doc-censo-salonica-1520"],
      fuentes: [
        { tipo: "Archivo", ref: "Archivo Histórico de la Comunidad Judía de Salónica (AHJS), leg. 12, fol. 45" },
        { tipo: "Libro", ref: "Benbassa, E. & Rodrigue, A. Sephardi Jewry. Univ. of California Press, 2000." }
      ],
      eventos: [
        { anio: "c. 1485", titulo: "Nacimiento", lugar: "Toledo", tipo: "nacimiento" },
        { anio: "1492", titulo: "Expulsión de Castilla", lugar: "Toledo → Lisboa", tipo: "migracion" },
        { anio: "c. 1498", titulo: "Emigración al Imperio Otomano", lugar: "Lisboa → Salónica", tipo: "migracion" },
        { anio: "c. 1510", titulo: "Matrimonio con Rachel Cohen", lugar: "Salónica", tipo: "matrimonio" },
        { anio: "1535", titulo: "Matrimonio de su hijo Isaac", lugar: "Salónica", tipo: "familia" },
        { anio: "c. 1542", titulo: "Fallecimiento", lugar: "Salónica", tipo: "defuncion" }
      ],
      privacidad: "publico"
    },
    {
      id: "rachel-cohen-toledano",
      nombre: "Rachel Cohen Toledano",
      variantes: ["Rachel Cohen", "Rahel bat Yehuda"],
      nacimiento: { fecha: "c. 1490", lugar: "Córdoba o Sevilla", evidencia: "hipotesis" },
      fallecimiento: { fecha: "después de 1545", lugar: "Salónica", evidencia: "documentado" },
      profesion: "Ama de casa / actividad comercial familiar",
      conyuge: { id: "david-ben-abraham-toledano", nombre: "David ben Abraham Toledano", evidencia: "documentado" },
      padres: [
        { id: null, nombre: "Yehuda Cohen", evidencia: "probable" }
      ],
      hijos: [
        { id: "isaac-toledano", nombre: "Isaac Toledano", evidencia: "documentado" },
        { id: "miriam-toledano", nombre: "Miriam Toledano", evidencia: "documentado" }
      ],
      hermanos: [],
      apellidos: ["Cohen", "Toledano"],
      lugares: ["Salónica"],
      foto: null,
      biografia: `Rachel Cohen aparece documentada en Salónica como esposa de David Toledano. El apellido Cohen indica posible origen sacerdotal, frecuente entre familias sefardíes. Su trayectoria exacta antes de 1510 no está plenamente documentada.`,
      historiaFamiliar: `La familia Cohen de Salónica se vinculó por matrimonio con los Toledano. Las menciones documentales son escasas respecto a su linaje materno.`,
      infoSefardi: `Integrante de la comunidad sefardí de Salónica. El nombre y el matrimonio están confirmados por ketubá.`,
      evidenciaDocumental: [
        { dato: "Matrimonio con David Toledano", nivel: "confirmado", fuente: "Ketubá de Salónica", estrellas: 5 },
        { dato: "Lugar de nacimiento", nivel: "hipotesis", fuente: "Tradición oral no documentada", estrellas: 1 }
      ],
      documentos: ["doc-ketuba-1535"],
      fuentes: [
        { tipo: "Archivo", ref: "AHJS, leg. 8, fol. 12" }
      ],
      eventos: [
        { anio: "c. 1490", titulo: "Nacimiento", lugar: "¿Andalucía?", tipo: "nacimiento" },
        { anio: "c. 1510", titulo: "Matrimonio", lugar: "Salónica", tipo: "matrimonio" },
        { anio: "después de 1545", titulo: "Última mención documental", lugar: "Salónica", tipo: "otro" }
      ],
      privacidad: "publico"
    },
    {
      id: "isaac-toledano",
      nombre: "Isaac Toledano",
      variantes: ["Isaac ben David Toledano", "Yitzhak Toledano"],
      nacimiento: { fecha: "c. 1512", lugar: "Salónica", evidencia: "documentado" },
      fallecimiento: { fecha: "c. 1580", lugar: "Salónica", evidencia: "probable" },
      profesion: "Comerciante",
      conyuge: { id: null, nombre: "Lea (apellido por confirmar)", evidencia: "posible" },
      padres: [
        { id: "david-ben-abraham-toledano", nombre: "David ben Abraham Toledano", evidencia: "documentado" },
        { id: "rachel-cohen-toledano", nombre: "Rachel Cohen", evidencia: "documentado" }
      ],
      hijos: [
        { id: "abraham-toledano-ii", nombre: "Abraham Toledano", evidencia: "documentado" }
      ],
      hermanos: [
        { id: "miriam-toledano", nombre: "Miriam Toledano", evidencia: "documentado" }
      ],
      apellidos: ["Toledano"],
      lugares: ["Salónica"],
      foto: null,
      biografia: `Isaac Toledano, hijo de David y Rachel, continuó la actividad comercial de la familia en Salónica. Su matrimonio y la existencia de al menos un hijo llamado Abraham están documentados en registros comunitarios.`,
      historiaFamiliar: `Representa la segunda generación de la rama Toledano en Salónica tras la expulsión.`,
      infoSefardi: `Miembro de la comunidad sefardí de Salónica.`,
      evidenciaDocumental: [
        { dato: "Filiación paterna", nivel: "confirmado", fuente: "Acta de matrimonio 1535", estrellas: 5 },
        { dato: "Nacimiento en Salónica", nivel: "documentado", fuente: "Mención en censo", estrellas: 4 }
      ],
      documentos: ["doc-ketuba-1535", "doc-censo-salonica-1520"],
      fuentes: [],
      eventos: [
        { anio: "c. 1512", titulo: "Nacimiento", lugar: "Salónica", tipo: "nacimiento" },
        { anio: "1535", titulo: "Matrimonio", lugar: "Salónica", tipo: "matrimonio" },
        { anio: "c. 1580", titulo: "Fallecimiento (estimado)", lugar: "Salónica", tipo: "defuncion" }
      ],
      privacidad: "publico"
    },
    {
      id: "miriam-toledano",
      nombre: "Miriam Toledano",
      variantes: ["Miriam bat David"],
      nacimiento: { fecha: "c. 1515", lugar: "Salónica", evidencia: "documentado" },
      fallecimiento: { fecha: "desconocido", lugar: "desconocido", evidencia: "investigacion" },
      profesion: "—",
      conyuge: { id: null, nombre: "No documentado", evidencia: "investigacion" },
      padres: [
        { id: "david-ben-abraham-toledano", nombre: "David ben Abraham Toledano", evidencia: "documentado" },
        { id: "rachel-cohen-toledano", nombre: "Rachel Cohen", evidencia: "documentado" }
      ],
      hijos: [],
      hermanos: [
        { id: "isaac-toledano", nombre: "Isaac Toledano", evidencia: "documentado" }
      ],
      apellidos: ["Toledano"],
      lugares: ["Salónica"],
      foto: null,
      biografia: `Miriam Toledano aparece mencionada como hija de David y Rachel en un registro de 1535. No se han localizado aún documentos posteriores que permitan reconstruir su vida adulta.`,
      historiaFamiliar: `Hija de la primera generación Toledano en Salónica.`,
      infoSefardi: `Documentada en contexto sefardí de Salónica.`,
      evidenciaDocumental: [
        { dato: "Existencia y filiación", nivel: "documentado", fuente: "Registro de 1535", estrellas: 4 }
      ],
      documentos: ["doc-ketuba-1535"],
      fuentes: [],
      eventos: [
        { anio: "c. 1515", titulo: "Nacimiento", lugar: "Salónica", tipo: "nacimiento" }
      ],
      privacidad: "publico"
    },
    {
      id: "abraham-toledano-ii",
      nombre: "Abraham Toledano",
      variantes: ["Abraham ben Isaac Toledano"],
      nacimiento: { fecha: "c. 1540", lugar: "Salónica", evidencia: "documentado" },
      fallecimiento: { fecha: "c. 1610", lugar: "Salónica o Esmirna", evidencia: "posible" },
      profesion: "Comerciante / posible rabino menor",
      conyuge: { id: null, nombre: "En investigación", evidencia: "investigacion" },
      padres: [
        { id: "isaac-toledano", nombre: "Isaac Toledano", evidencia: "documentado" }
      ],
      hijos: [],
      hermanos: [],
      apellidos: ["Toledano"],
      lugares: ["Salónica", "¿Esmirna?"],
      foto: null,
      biografia: `Abraham Toledano, nieto de David, está documentado en registros de finales del siglo XVI. Existe la hipótesis (aún no confirmada) de que una rama de la familia se trasladara a Esmirna a comienzos del siglo XVII.`,
      historiaFamiliar: `Tercera generación documentada de la rama Toledano de Salónica.`,
      infoSefardi: `Documentado en comunidad sefardí.`,
      evidenciaDocumental: [
        { dato: "Filiación", nivel: "documentado", fuente: "Registro familiar", estrellas: 4 },
        { dato: "Posible traslado a Esmirna", nivel: "hipotesis", fuente: "Onomástica y patrones migratorios", estrellas: 1 }
      ],
      documentos: [],
      fuentes: [],
      eventos: [
        { anio: "c. 1540", titulo: "Nacimiento", lugar: "Salónica", tipo: "nacimiento" }
      ],
      privacidad: "publico"
    }
  ],

  familias: [
    {
      id: "toledano",
      apellido: "Toledano",
      variantes: ["Toledano", "de Toledo", "Toledani", "Toledanos"],
      historia: `El apellido Toledano es de origen toponímico y hace referencia a la ciudad de Toledo (Castilla). Tras la expulsión de 1492, numerosas familias sefardíes que habían residido en Toledo o sus alrededores adoptaron o conservaron este apellido en la diáspora (Portugal, Imperio Otomano, Norte de África, Italia, etc.).

Importante: la coincidencia de apellido no implica automáticamente un único linaje común. Varias familias independientes pudieron adoptar el mismo gentilicio.`,
      primerasApariciones: "Documentado en Toledo antes de 1492; en Salónica desde principios del siglo XVI.",
      lugares: ["Toledo", "Lisboa", "Salónica", "Esmirna", "Estambul", "Ámsterdam", "Marruecos"],
      personas: ["david-ben-abraham-toledano", "isaac-toledano", "miriam-toledano", "abraham-toledano-ii"],
      nivelEvidencia: "documentado",
      bibliografia: [
        "Beider, A. A Dictionary of Jewish Surnames from the Maghreb, Gibraltar and Malta.",
        "Faiguenboim, G. et al. Dicionário Sefaradi de Sobrenomes."
      ]
    },
    {
      id: "cohen",
      apellido: "Cohen",
      variantes: ["Cohen", "Kohen", "Cohn", "Kahana", "Coen"],
      historia: `Cohen (del hebreo כֹּהֵן, "sacerdote") es uno de los apellidos judíos más extendidos. Indica tradicionalmente ascendencia de la casta sacerdotal. Entre sefardíes es frecuente y no implica por sí solo un linaje único.`,
      primerasApariciones: "Uso generalizado en la diáspora sefardí desde la Edad Media.",
      lugares: ["Toda la diáspora sefardí"],
      personas: ["rachel-cohen-toledano"],
      nivelEvidencia: "documentado",
      bibliografia: []
    }
  ],

  documentos: [
    {
      id: "doc-ketuba-1535",
      titulo: "Ketubá de Isaac Toledano y Lea (Salónica, 1535)",
      tipo: "Actas de matrimonio",
      fecha: "1535",
      lugar: "Salónica, Imperio Otomano",
      personas: ["isaac-toledano", "david-ben-abraham-toledano", "rachel-cohen-toledano"],
      archivo: "Archivo Histórico de la Comunidad Judía de Salónica (AHJS)",
      referencia: "AHJS, leg. 8, fol. 12-13",
      transcripcion: `[Transcripción parcial de demostración]\nEn el año 5295 de la creación del mundo... Isaac hijo de David Toledano contrajo matrimonio con Lea hija de... según la ley de Moisés e Israel...`,
      resumen: "Contrato matrimonial (ketubá) que menciona a Isaac Toledano, hijo de David y Rachel, y aporta evidencia de filiación y residencia en Salónica.",
      observaciones: "Documento de demostración. La imagen original no se reproduce por restricciones de derechos del archivo de procedencia.",
      familia: "toledano",
      fuenteOriginal: "AHJS",
      derechos: "Uso sujeto a las condiciones y derechos establecidos por el archivo de procedencia."
    },
    {
      id: "doc-testamento-1540",
      titulo: "Inventario y disposiciones testamentarias de David Toledano (c. 1540)",
      tipo: "Testamentos",
      fecha: "c. 1540",
      lugar: "Salónica",
      personas: ["david-ben-abraham-toledano"],
      archivo: "Archivos otomanos / colección comunitaria",
      referencia: "AHJS, leg. 15, fol. 3",
      transcripcion: `[Resumen de demostración]\nInventario de bienes de David Toledano: mercancías textiles, utensilios domésticos, libros... Disposiciones a favor de su esposa Rachel y de sus hijos.`,
      resumen: "Documento que permite situar el fallecimiento de David hacia 1540-1542 y confirma la composición familiar.",
      observaciones: "Demostración. Transcripción parcial.",
      familia: "toledano",
      fuenteOriginal: "AHJS",
      derechos: "Uso sujeto a las condiciones y derechos establecidos por el archivo de procedencia."
    },
    {
      id: "doc-censo-salonica-1520",
      titulo: "Padrón / censo de la comunidad de Salónica (fragmento, c. 1520)",
      tipo: "Censos",
      fecha: "c. 1520",
      lugar: "Salónica",
      personas: ["david-ben-abraham-toledano", "isaac-toledano"],
      archivo: "AHJS",
      referencia: "AHJS, leg. 3, fol. 22",
      transcripcion: `[Fragmento de demostración]\n... David Toledano, comerciante, con esposa e hijos...`,
      resumen: "Mención de David Toledano y su familia en un padrón comunitario de comienzos del siglo XVI.",
      observaciones: "Documento de demostración.",
      familia: "toledano",
      fuenteOriginal: "AHJS",
      derechos: "Uso sujeto a las condiciones y derechos establecidos por el archivo de procedencia."
    }
  ],

  lugares: [
    { id: "toledo", nombre: "Toledo", pais: "España (Castilla)", tipo: "ciudad historica", lat: 39.8628, lng: -4.0273 },
    { id: "salonica", nombre: "Salónica (Tesalónica)", pais: "Grecia / Imperio Otomano", tipo: "comunidad sefardi", lat: 40.6401, lng: 22.9444 },
    { id: "lisboa", nombre: "Lisboa", pais: "Portugal", tipo: "ciudad", lat: 38.7223, lng: -9.1393 },
    { id: "esmirna", nombre: "Esmirna (Izmir)", pais: "Turquía / Imperio Otomano", tipo: "comunidad sefardi", lat: 38.4192, lng: 27.1287 },
    { id: "amsterdam", nombre: "Ámsterdam", pais: "Países Bajos", tipo: "comunidad sefardi", lat: 52.3676, lng: 4.9041 }
  ],

  rutasMigracion: [
    { desde: "Toledo", hasta: "Lisboa", periodo: "1492-1497", descripcion: "Expulsión de Castilla y tránsito por Portugal" },
    { desde: "Lisboa", hasta: "Salónica", periodo: "1497-1500", descripcion: "Emigración al Imperio Otomano" },
    { desde: "Salónica", hasta: "Esmirna", periodo: "s. XVII", descripcion: "Movimientos internos en el Imperio Otomano (hipótesis para algunas ramas)" }
  ],

  cronologiaHistorica: [
    { anio: "1391", titulo: "Pogroms en Castilla y Aragón", tipo: "historico" },
    { anio: "1492", titulo: "Decreto de expulsión de los Reyes Católicos", tipo: "historico" },
    { anio: "1497", titulo: "Conversión forzosa en Portugal", tipo: "historico" },
    { anio: "1500-1520", titulo: "Asentamiento masivo sefardí en Salónica, Estambul, Esmirna", tipo: "migracion" },
    { anio: "1536", titulo: "Establecimiento de la Inquisición en Portugal", tipo: "historico" },
    { anio: "1590-1650", titulo: "Florecimiento de comunidades sefardíes en Ámsterdam y Livorno", tipo: "historico" }
  ],

  stats: {
    personas: 5,
    familias: 2,
    documentos: 3,
    fotografias: 0,
    fuentes: 4,
    contribucionesPendientes: 2,
    usuarios: 3
  }
};

// Helper functions
function getPersona(id) {
  return MS_DATA.personas.find(p => p.id === id) || null;
}

function getFamilia(id) {
  return MS_DATA.familias.find(f => f.id === id) || null;
}

function getDocumento(id) {
  return MS_DATA.documentos.find(d => d.id === id) || null;
}

function getEvidenciaBadge(nivel) {
  const map = {
    confirmado: 'badge-confirmado',
    documentado: 'badge-documentado',
    probable: 'badge-probable',
    posible: 'badge-posible',
    hipotesis: 'badge-hipotesis',
    investigacion: 'badge-investigacion'
  };
  return map[nivel] || 'badge-investigacion';
}

function getEvidenciaLabel(nivel) {
  const map = {
    confirmado: 'Confirmado',
    documentado: 'Documentado',
    probable: 'Probable',
    posible: 'Posible',
    hipotesis: 'Hipótesis',
    investigacion: 'En investigación'
  };
  return map[nivel] || nivel;
}

function starsHTML(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}
