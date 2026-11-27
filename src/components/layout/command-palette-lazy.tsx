'use client';

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';

type PaletteComponent = ComponentType;

/**
 * Tiny trigger for the command palette (cmdk). The real palette — and
 * the whole cmdk library — are NOT in first-load JS: this wrapper owns
 * the Cmd/Ctrl+K listener and only dynamically imports the palette on
 * the first open request, then re-dispatches the open event so the
 * freshly mounted palette opens. Once loaded, the palette's own
 * listener takes over and this wrapper stays out of the way.
 *
 * No smooth-scroll library is involved here (native scroll only).
 */
export function CommandPaletteLazy() {
  const [Palette, setPalette] = useState<PaletteComponent | null>(null);
  const loadingRef = useRef(false);
  const loadedRef = useRef(false);

  const load = useCallback(() => {
    if (loadedRef.current || loadingRef.current) return;
    loadingRef.current = true;
    import('@/components/layout/command-palette')
      .then((module) => {
        loadedRef.current = true;
        setPalette(() => module.CommandPalette);
      })
      .catch(() => {
        // Import failed (offline, etc.) — allow a later retry.
        loadingRef.current = false;
      });
  }, []);

  // Once the palette has mounted, re-dispatch the open event so it opens
  // (child effects run before parent effects, so its listener is already
  // registered by the time this fires).
  useEffect(() => {
    if (Palette) {
      window.dispatchEvent(new Event('ac:open-command-palette'));
    }
  }, [Palette]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        if (loadedRef.current) return; // Palette's own listener handles it.
        event.preventDefault();
        load();
      }
    };
    const onOpenEvent = () => load();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('ac:open-command-palette', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('ac:open-command-palette', onOpenEvent);
    };
  }, [load]);

  if (!Palette) return null;
  return <Palette />;
}
