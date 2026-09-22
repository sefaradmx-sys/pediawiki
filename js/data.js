const MS_DATA = {
  personas: [],
  familias: [
    {id:'de-la-garza',apellido:'De la Garza',variantes:['de la Garza','Garza','Garça','de la Garza Falcón'],historia:'Casa del archivo. Lampazos, Monterrey, Mapimí, Saltillo. Faro: Blas de la Garza Falcón. El apellido no prueba origen sefardí por sí solo.',primerasApariciones:'Nuevo Reino de León y Coahuila, s. XVII–XVIII.',lugares:['Lampazos','Monterrey','Mapimí','Saltillo'],personas:[],nivelEvidencia:'en catalogacion',bibliografia:[]},
    {id:'saucedo',apellido:'Saucedo',variantes:['Saucedo','Sausedo'],historia:'Casa del archivo. Saltillo, Huachichil y semidesierto coahuilense.',primerasApariciones:'En catalogación.',lugares:['Saltillo','Huachichil','Coahuila'],personas:[],nivelEvidencia:'en catalogacion',bibliografia:[]},
    {id:'rodriguez',apellido:'Rodríguez',variantes:['Rodríguez','Rodriguez'],historia:'Casa del archivo. Cada rama se ficha con ancla de lugar y siglo. No se declara un solo tronco.',primerasApariciones:'En catalogación.',lugares:['Saltillo','Coahuila','Nuevo León'],personas:[],nivelEvidencia:'en catalogacion',bibliografia:[]},
    {id:'guajardo',apellido:'Guajardo',variantes:['Guajardo','Guaxardo'],historia:'Casa del archivo. José Luis García × Josefa Guaxardo, 1782.',primerasApariciones:'1782.',lugares:['Coahuila','Nuevo León'],personas:[],nivelEvidencia:'documentado',bibliografia:[]},
    {id:'ramos',apellido:'Ramos',variantes:['Ramos'],historia:'Casa del archivo. Joseph Miguel García × Francisca Xaviera Ramos, 1751.',primerasApariciones:'1751.',lugares:['Coahuila','Nuevo León'],personas:[],nivelEvidencia:'documentado',bibliografia:[]},
    {id:'garcia',apellido:'García',variantes:['García','Garcia'],historia:'Casa central del acervo. Saltillo y Huachichil hacia Garza Falcón. Incluye Peña, Castilleja, Vázquez y Gaona.',primerasApariciones:'Actas de Coahuila.',lugares:['Saltillo','Huachichil','Coahuila'],personas:[],nivelEvidencia:'documentado',bibliografia:[]},
    {id:'gaona',apellido:'Gaona',variantes:['Gaona'],historia:'Casa del acervo. Galeana, Rayón, Ciénaga del Toro.',primerasApariciones:'Expediente García-Gaona.',lugares:['Galeana','Rayón','Nuevo León'],personas:[],nivelEvidencia:'en catalogacion',bibliografia:[]},
    {id:'pena',apellido:'Peña',variantes:['Peña','Pena'],historia:'Casa García Peña. Actas de Jesús, Antonio, Emilio, María y censo de Jacoba Peña, 1930.',primerasApariciones:'s. XIX–XX.',lugares:['Saltillo','Coahuila'],personas:[],nivelEvidencia:'documentado',bibliografia:[]}
  ],
  documentos: [
    {id:'doc-ramos-1751',titulo:'Matrimonio Joseph Miguel García y Francisca Xaviera Ramos (1751)',tipo:'Actas de matrimonio',fecha:'1751',lugar:'Noreste novohispano',personas:[],archivo:'Sefarad-mx',referencia:'genealogia-garcia',transcripcion:'',resumen:'Abre la Casa Ramos.',observaciones:'Documento real.',familia:'ramos',fuenteOriginal:'Parroquia',derechos:'Sefarad-mx'},
    {id:'doc-guaxardo-1782',titulo:'Matrimonio José Luis García y Josefa Guaxardo (1782)',tipo:'Actas de matrimonio',fecha:'1782',lugar:'Noreste novohispano',personas:[],archivo:'Sefarad-mx',referencia:'genealogia-garcia',transcripcion:'',resumen:'Abre la Casa Guajardo.',observaciones:'Documento real.',familia:'guajardo',fuenteOriginal:'Parroquia',derechos:'Sefarad-mx'}
  ],
  lugares: [
    {id:'saltillo',nombre:'Saltillo',pais:'México (Coahuila)',tipo:'ciudad',lat:25.4232,lng:-101.0053},
    {id:'monterrey',nombre:'Monterrey',pais:'México (Nuevo León)',tipo:'ciudad',lat:25.6866,lng:-100.3161},
    {id:'lampazos',nombre:'Lampazos',pais:'México (Nuevo León)',tipo:'villa historica',lat:27.025,lng:-100.508},
    {id:'mapimi',nombre:'Mapimí',pais:'México (Durango)',tipo:'villa historica',lat:25.833,lng:-103.848},
    {id:'huachichil',nombre:'Huachichil',pais:'México (Coahuila)',tipo:'paraje',lat:25.21,lng:-100.78}
  ],
  rutasMigracion: [
    {desde:'Lampazos',hasta:'Monterrey',periodo:'s. XVII–XVIII',descripcion:'Tronco de la Garza Falcón'},
    {desde:'Huachichil',hasta:'Saltillo',periodo:'s. XIX–XX',descripcion:'Rama García'}
  ],
  cronologiaHistorica: [
    {anio:'1571',titulo:'Santo Oficio en México',tipo:'historico'},
    {anio:'s. XVII',titulo:'Población del Nuevo Reino de León y Coahuila',tipo:'historico'}
  ],
  stats:{personas:0,familias:8,documentos:2,fotografias:0,fuentes:0,contribucionesPendientes:0,usuarios:1}
};
function getPersona(id){return MS_DATA.personas.find(p=>p.id===id)||null;}
function getFamilia(id){return MS_DATA.familias.find(f=>f.id===id)||null;}
function getDocumento(id){return MS_DATA.documentos.find(d=>d.id===id)||null;}
function getEvidenciaBadge(nivel){var map={confirmado:{label:'Confirmado',cls:'bg-emerald-100 text-emerald-800'},documentado:{label:'Documentado',cls:'bg-sky-100 text-sky-800'},probable:{label:'Probable',cls:'bg-amber-100 text-amber-800'},hipotesis:{label:'Hipótesis',cls:'bg-slate-100 text-slate-700'},'en catalogacion':{label:'En catalogación',cls:'bg-sefarad-100 text-sefarad-800'}};return map[nivel]||{label:nivel||'Sin nivel',cls:'bg-slate-100 text-slate-700'};}
