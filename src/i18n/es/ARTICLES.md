# Traducción de artículos del blog (es)

Lea primero [GLOSSARY.md](./GLOSSARY.md): mismo público (LatAm, usted, técnico-comercial) y mismas reglas de terminología.

Origen: `src/content/articles/<slug>.json`. Destino: `src/i18n/es/articles/<slug>.json` (mismo nombre de archivo; el slug/URL NO se traduce).

Formato del archivo destino, en este orden:

```json
{
  "sourceHash": "",
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "tags": ["..."],
  "metaTitle": "...",
  "metaDescription": "...",
  "metaKeywords": "..."
}
```

Incluya `excerpt`, `metaTitle`, `metaDescription`, `metaKeywords` solo si el original los tiene no vacíos. `tags`: misma cantidad y orden.

Reglas para `content` (Markdown):

- Conserve exactamente la estructura: mismo número de encabezados `##` y `###` en el mismo orden, mismas listas, tablas, citas `>` y párrafos.
- No cambie ninguna URL: rutas de imágenes `![...](/images/...)` y enlaces `[...](/categories/...)`, `[...](/contact)`, etc. quedan idénticas; traduzca solo el texto visible y el texto alternativo de las imágenes.
- No cambie comentarios HTML `<!-- ... -->` ni etiquetas HTML si las hay.
- La sección de preguntas frecuentes debe titularse con `## Preguntas frecuentes ...` (p. ej. "## Preguntas frecuentes sobre cajas combinadoras FV"); cada pregunta sigue siendo un `###`.
- Mantenga cifras, normas (IEC, EN 15276, UL, TÜV), modelos, unidades y precios tal cual (USD, FOB).
- Optimice títulos y encabezados para cómo busca un comprador latinoamericano (p. ej. "caja combinadora fotovoltaica precio"), sin añadir ni quitar información.
- metaTitle ≤ ~65 caracteres terminando en "| Soltree" si el original lo tiene; metaDescription ≤ ~160 caracteres.
- JSON válido en UTF-8 con 2 espacios de sangría; escape correctamente comillas y saltos de línea (`\n`).

`node scripts/i18n-status.mjs es` verifica que encabezados, imágenes y enlaces coincidan con el original.
