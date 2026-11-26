'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useMounted } from '@/lib/use-media-query';

/** Sun/Moon theme toggle (next-themes). Mount-guarded to avoid hydration mismatch. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted && isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink transition-colors hover:border-royal hover:text-royal',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2',
        'dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-peri dark:hover:text-peri',
        className,
      )}
    >
      {!mounted ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : isDark ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
