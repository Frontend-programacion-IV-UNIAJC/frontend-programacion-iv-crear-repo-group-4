// api.js
// Todo lo que habla con la API de imágenes de la NASA vive aquí.
// Convierte la respuesta a la MISMA forma de datos-de-prueba.js
// (id, titulo, descripcion, fecha, centro, keywords, miniatura),
// así que los componentes no cambian cuando lleguen los datos reales.
const API = "https://images-api.nasa.gov";

// Nombres completos de los centros de la NASA (para mostrar en el filtro).
const CENTROS = {
  JPL: "Jet Propulsion Laboratory",
  GSFC: "Goddard Space Flight Center",
  MSFC: "Marshall Space Flight Center",
  JSC: "Johnson Space Center",
  KSC: "Kennedy Space Center",
  ARC: "Ames Research Center",
  GRC: "Glenn Research Center",
  SSC: "Stennis Space Center",
  HQ: "NASA Headquarters",
};

// Si la sigla no está en la lista, devuelve la sigla tal cual.
export function nombreCentro(sigla) {
  return CENTROS[sigla] ?? sigla;
}

// Algunas descripciones de la NASA traen etiquetas HTML; las quitamos.
function limpiarTexto(texto) {
  if (typeof texto !== "string") return null;
  const limpio = texto.replace(/<[^>]*>/g, "").trim();
  return limpio || null;
}

// Convierte un item de la API a la forma plana que usan las tarjetas.
function normalizar(item) {
  const dato = item?.data?.[0] ?? {};
  const enlace = item?.links?.find((l) => l.rel === "preview") ?? item?.links?.[0];

  return {
    id: dato.nasa_id,
    titulo: dato.title || "Sin título",
    descripcion: limpiarTexto(dato.description),
    fecha: dato.date_created ?? null,
    centro: dato.center ?? null,
    keywords: Array.isArray(dato.keywords) ? dato.keywords : [],
    // links[0].href es la versión ligera (~thumb.jpg), no la original
    miniatura: enlace?.href ? enlace.href.replace(/^http:/, "https:") : null,
  };
}

// Busca imágenes. Devuelve { imagenes, total }.
// - Sin resultados: imagenes = [] (estado VACÍO, no es un error).
// - Si la petición falla: lanza un Error (estado ERROR).
export async function obtenerImagenes({
  q = "nebula",
  centro = "",
  pagina = 1,
  porPagina = 12,
  signal,
} = {}) {
  const params = new URLSearchParams({
    q,
    media_type: "image",
    page: String(pagina),
    page_size: String(porPagina),
  });
  if (centro) params.set("center", centro);

  const respuesta = await fetch(`${API}/search?${params}`, { signal });
  if (!respuesta.ok) {
    throw new Error(`La API respondió con el estado ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  const items = datos?.collection?.items ?? [];

  const imagenes = items
    .map(normalizar)
    .filter((imagen) => imagen.id)
    // Orden cronológico descendente (briefing 4.3), dentro de la página recibida
    .sort(
      (a, b) =>
        new Date(b.fecha ?? 0).getTime() - new Date(a.fecha ?? 0).getTime()
    );

  return {
    imagenes,
    total: datos?.collection?.metadata?.total_hits ?? imagenes.length,
  };
<<<<<<< HEAD
}
=======
}
 
>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
