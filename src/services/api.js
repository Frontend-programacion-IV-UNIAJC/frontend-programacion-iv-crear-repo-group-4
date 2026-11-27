// api.js
// Todo lo que habla con la API de imágenes de la NASA vive aquí.
import { imagenesOrdenadas } from "../data/datos-de-prueba.js";

const API = "https://images-api.nasa.gov";

/**
 * Forma de cada imagen (la misma que datos-de-prueba.js).
 * @typedef {Object} Imagen
 * @property {string} id
 * @property {string} titulo
 * @property {string | null} descripcion
 * @property {string | null} fecha
 * @property {string | null} centro
 * @property {string[]} keywords
 * @property {string | null} miniatura
 */

// Nombres completos de los centros (opcional, para mostrar en el filtro).
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

/**
 * Si la sigla no está en la lista, devuelve la sigla tal cual.
 * @param {string} sigla
 * @returns {string}
 */
export function nombreCentro(sigla) {
  return /** @type {Record<string, string>} */ (CENTROS)[sigla] ?? sigla;
}

// Algunas descripciones de la NASA traen etiquetas HTML; las quitamos.
/** @param {unknown} texto */
function limpiarTexto(texto) {
  if (typeof texto !== "string") return null;
  const limpio = texto.replace(/<[^>]*>/g, "").trim();
  return limpio || null;
}

/**
 * Solo los ids "seguros" para una URL tienen página de detalle.
 * @param {unknown} id
 * @returns {boolean}
 */
function esIdSeguro(id) {
  return typeof id === "string" && /^[A-Za-z0-9._-]+$/.test(id);
}

export function adaptarImagen(item) {
  const dato = item?.data?.[0] ?? {};
  const enlace = item?.links?.find((/** @type {any} */ l) => l.rel === "preview") ?? item?.links?.[0];

  return {
    id: dato.nasa_id,
    titulo: dato.title || "Sin título",
    descripcion: limpiarTexto(dato.description),
    fecha: dato.date_created ?? null,
    centro: dato.center ?? null,
    keywords: Array.isArray(dato.keywords) ? dato.keywords : [],
    // La versión ligera (~thumb.jpg), no la original
    miniatura: enlace?.href ? enlace.href.replace(/^http:/, "https:") : null,
  };
}

/**
 * Devuelve { imagenes, total, deRespaldo }.
 * - Sin resultados: imagenes = [] (estado VACÍO, no es un error).
 * - Si la petición falla (red, servidor, más de 8 s): devuelve los datos
 *   de prueba y deRespaldo = true, para que la página no se rompa.
 * @param {{ q?: string, centro?: string, pagina?: number, porPagina?: number }} [opciones]
 * @returns {Promise<{ imagenes: Imagen[], total: number, deRespaldo: boolean }>}
 */
export async function obtenerImagenes({
  q = "nebula",
  centro = "",
  pagina = 1,
  porPagina = 12,
} = {}) {
  const params = new URLSearchParams({
    q,
    media_type: "image",
    page: String(pagina),
    page_size: String(porPagina),
  });
  if (centro) params.set("center", centro);

  try {
    // Red de seguridad 1: si no responde en 8 segundos, se corta
    const respuesta = await fetch(`${API}/search?${params}`, {
      signal: AbortSignal.timeout(8000),
    });

    // Red de seguridad 2: un 404 o un 500 también es un fallo
    if (!respuesta.ok) {
      throw new Error(`La API respondió con el estado ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const items = datos?.collection?.items ?? [];

    const imagenes = items
      .map(adaptarImagen)
      .filter((/** @type {Imagen} */ imagen) => esIdSeguro(imagen.id))
      .sort(
        (/** @type {Imagen} */ a, /** @type {Imagen} */ b) =>
          new Date(b.fecha ?? 0).getTime() - new Date(a.fecha ?? 0).getTime()
      );

    return {
      imagenes,
      total: datos?.collection?.metadata?.total_hits ?? imagenes.length,
      deRespaldo: false,
    };
  } catch (error) {
    // Red de seguridad 3: la página sigue funcionando con los datos de prueba
    console.error("La API no respondió, se usan los datos de prueba:", error);
    return {
      imagenes: /** @type {Imagen[]} */ (imagenesOrdenadas),
      total: imagenesOrdenadas.length,
      deRespaldo: true,
    };
  }
}