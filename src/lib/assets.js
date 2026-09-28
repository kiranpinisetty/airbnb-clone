const assetModules = import.meta.glob('/src/assets/**/*', {
  eager: true,
  import: 'default',
});

const assetMap = {};
for (const [path, url] of Object.entries(assetModules)) {
  const cleanKey = path.replace(/^\/?(src\/)?assets\//, '');
  assetMap[cleanKey] = url;
}

// Neutral 1x1 transparent SVG fallback
const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"/>';

/**
 * Get the bundled URL for an asset located in `src/assets/`.
 * @param {string} key - e.g. "avatars/host.jpeg" or "chips/comfort.png"
 * @returns {string} URL of the bundled asset or fallback
 */
export function getAsset(key) {
  if (!key) return FALLBACK_IMAGE;

  const cleanKey = String(key)
    .replace(/^\/?(src\/)?assets\//, '')
    .replace(/^\/+/, '');

  if (Object.prototype.hasOwnProperty.call(assetMap, cleanKey)) {
    return assetMap[cleanKey];
  }

  if (import.meta.env?.DEV) {
    console.warn(
      `[getAsset] Asset not found for key: "${key}" (normalized: "${cleanKey}")`
    );
  }

  return FALLBACK_IMAGE;
}

export default getAsset;
