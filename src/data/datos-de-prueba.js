// datos-de-prueba.js
// Seis imágenes falsas con los MISMOS campos que vamos a sacar de la API de la NASA.
// Si la forma de los datos no cambia, los componentes tampoco cambian
// cuando lleguen los datos reales.
//
// Campos (los nombres entre paréntesis son los de la API):
//   id          (nasa_id)
//   titulo      (title)
//   descripcion (description)
//   fecha       (date_created, formato ISO)
//   centro      (center)
//   keywords    (keywords, un arreglo)
//   miniatura   (links[0].href, la versión ligera ~thumb.jpg)
//
// Los ids y las imágenes son inventados: sirven solo para probar.
// Tres casos están pensados para probar la sección 4.4 del briefing:
//   - Orion no trae miniatura  -> imagen de reserva (fallback)
//   - Tarantula no trae centro -> "No especificado"
//   - Helix no trae keywords   -> se oculta el contenedor de etiquetas
<<<<<<< HEAD
<<<<<<< HEAD

=======
 
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
=======

>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
export const imagenes = [
  {
    id: "prueba-0001",
    titulo: "Carina nebula pillars",
    descripcion:
      "Pilares de gas y polvo en la nebulosa de Carina, donde nacen nuevas estrellas. La imagen combina varias exposiciones tomadas con luz visible e infrarroja para revelar estructuras que normalmente quedan ocultas tras el polvo interestelar. Los astrónomos usan este tipo de imágenes para estudiar cómo se forman y evolucionan las nubes moleculares.",
    fecha: "2026-09-13T00:00:00Z",
    centro: "JPL",
    keywords: ["Nebula", "Hubble", "Gas"],
<<<<<<< HEAD
<<<<<<< HEAD
    miniatura: "img/muestras/carina.jpg",
=======
    miniatura: "img/muestras/carina.svg",
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
=======
    miniatura: "img/muestras/carina.jpg",
>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
  },
  {
    id: "prueba-0002",
    titulo: "Orion nebula",
    descripcion:
      "La nebulosa de Orión, una de las regiones de formación estelar más cercanas a la Tierra y visible incluso a simple vista en el cielo nocturno.",
    fecha: "2026-08-11T00:00:00Z",
    centro: "GSFC",
    keywords: ["Deepspace", "Gas"],
<<<<<<< HEAD
<<<<<<< HEAD
    miniatura: "img/muestras/orion.jpg", 
=======
    miniatura: null, // sin miniatura: prueba de la imagen de reserva
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
=======
    miniatura: "img/muestras/orion.jpg", 
>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
  },
  {
    id: "prueba-0003",
    titulo: "Tarantula nebula",
    descripcion:
      "La nebulosa de la Tarántula, en la Gran Nube de Magallanes, es la región de formación estelar más activa del grupo local de galaxias.",
    fecha: "2026-05-04T00:00:00Z",
    centro: null, // sin centro: prueba de "No especificado"
    keywords: ["Stars", "Dust"],
<<<<<<< HEAD
<<<<<<< HEAD
    miniatura: "img/muestras/tarantula.jpg",
=======
    miniatura: "img/muestras/tarantula.svg",
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
=======
    miniatura: "img/muestras/tarantula.jpg",
>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
  },
  {
    id: "prueba-0004",
    titulo: "Helix nebula",
    descripcion:
      "La nebulosa de la Hélice, una nebulosa planetaria formada por las capas de gas que expulsó una estrella moribunda.",
    fecha: "2026-03-22T00:00:00Z",
    centro: "MSFC",
    keywords: [], // sin keywords: prueba de ocultar las etiquetas
<<<<<<< HEAD
<<<<<<< HEAD
    miniatura: "img/muestras/helix.jpg",
=======
    miniatura: "img/muestras/helix.svg",
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
=======
    miniatura: "img/muestras/helix.jpg",
>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
  },
  {
    id: "prueba-0005",
    titulo: "Crab nebula remnant",
    descripcion:
      "Restos de la supernova registrada en el año 1054, con un púlsar en su centro que gira unas treinta veces por segundo.",
    fecha: "2026-02-18T00:00:00Z",
    centro: "MSFC",
    keywords: ["Supernova", "Chandra"],
<<<<<<< HEAD
<<<<<<< HEAD
    miniatura: "img/muestras/cangrejo.jpg",
=======
    miniatura: "img/muestras/cangrejo.svg",
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
=======
    miniatura: "img/muestras/cangrejo.jpg",
>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
  },
  {
    id: "prueba-0006",
    titulo: "Eagle nebula star-forming region",
    descripcion:
      "La nebulosa del Águila contiene los famosos Pilares de la Creación, columnas de gas frío donde se están formando estrellas.",
    fecha: "2025-12-05T00:00:00Z",
    centro: "JPL",
    keywords: ["Nebula", "Webb", "Infrared"],
<<<<<<< HEAD
<<<<<<< HEAD
    miniatura: "img/muestras/aguila.jpg",
  },
];

=======
    miniatura: "img/muestras/aguila.svg",
  },
];
 
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
=======
    miniatura: "img/muestras/aguila.jpg",
  },
];

>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
// Orden por defecto: cronológico descendente (briefing 4.3).
// [...imagenes] copia el arreglo para no alterar el original.
export const imagenesOrdenadas = [...imagenes].sort(
  (a, b) => new Date(b.fecha) - new Date(a.fecha)
);
<<<<<<< HEAD
<<<<<<< HEAD

=======
 
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
=======

>>>>>>> c86d4b36c4dae1145794bbc832297014c0531412
// Lista para el filtro de centros, calculada a partir de los datos.
// new Set() quita los repetidos; el filtro con typeof descarta los null
// de una forma que TypeScript entiende (así la lista es string[], sin null).
/** @type {string[]} */
export const centros = [
  ...new Set(
    imagenes
      .map((i) => i.centro)
      .filter((c) => typeof c === "string")
  ),
<<<<<<< HEAD
];
=======
];
 
>>>>>>> 65dcfecfa08f3da0fd8f4178561dc7ac290b9bd5
