/**
 * Prefixes asset paths with basePath when deploying to GitHub Pages.
 * Use for all image src, icon href, and similar asset URLs.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetPath(path: string): string {
  if (!basePath) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${p}`;
}
