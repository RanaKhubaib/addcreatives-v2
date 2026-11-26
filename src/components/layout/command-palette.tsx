'use client';

import { Command } from 'cmdk';
import {
  FileText,
  Home,
  Info,
  MessageCircle,
  Moon,
  Newspaper,
  Palette,
  Search,
  Sun,
  Briefcase,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { services } from '@/data/services';
import { siteConfig } from '@/data/site-config';
import { useLenis } from '@/components/effects/lenis-provider';

const PAGES = [
  { label: 'Home', href: '/', Icon: Home },
  { label: 'Services', href: '/services', Icon: Briefcase },
  { label: 'Work', href: '/work', Icon: FileText },
  { label: 'About', href: '/about', Icon: Info },
  { label: 'Journal', href: '/journal', Icon: Newspaper },
  { label: 'Contact', href: '/contact', Icon: MessageCircle },
] as const;

/**
 * Command palette (cmdk). Opens on Cmd/Ctrl+K, from the nav search button
 * (via the `ac:open-command-palette` window event), closes on Escape or
 * selection. Lists pages, all 7 services, and actions (toggle theme,
 * chat on WhatsApp). Pauses Lenis smooth scroll while open.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { setPaused } = useLenis();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('ac:open-command-palette', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('ac:open-command-palette', onOpenEvent);
    };
  }, []);

  useEffect(() => {
    setPaused(open);
  }, [open, setPaused]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search pages, services and actions"
    >
      <Command
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-2xl dark:border-white/10 dark:bg-ink dark:text-white"
        loop
      >
        <div className="flex items-center gap-2 border-b border-ink/10 px-4 dark:border-white/10">
          <Search className="h-4 w-4 shrink-0 text-ink/40 dark:text-white/40" />
          <Command.Input
            placeholder="Search pages, services, actions…"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-ink/40 dark:placeholder:text-white/40"
          />
          <kbd className="shrink-0 rounded-md border border-ink/10 bg-ink/5 px-1.5 py-0.5 text-[11px] font-semibold text-ink/50 dark:border-white/15 dark:bg-white/10 dark:text-white/50">
            ESC
          </kbd>
        </div>
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Pages">
            {PAGES.map(({ label, href, Icon }) => (
              <Command.Item key={href} value={label} onSelect={() => go(href)}>
                <Icon className="h-4 w-4 text-royal dark:text-peri" />
                {label}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Services">
            {services.map((service) => (
              <Command.Item
                key={service.slug}
                value={`${service.title} ${service.short}`}
                onSelect={() => go(`/services/${service.slug}`)}
              >
                <Palette className="h-4 w-4 text-royal dark:text-peri" />
                {service.title}
                <span className="ml-auto hidden truncate text-xs text-ink/40 sm:block dark:text-white/40">
                  {service.short}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Actions">
            <Command.Item
              value="Toggle theme"
              onSelect={() => {
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
                setOpen(false);
              }}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4 text-royal dark:text-peri" />
              ) : (
                <Moon className="h-4 w-4 text-royal dark:text-peri" />
              )}
              Toggle theme
            </Command.Item>
            <Command.Item
              value="Chat on WhatsApp"
              onSelect={() => {
                setOpen(false);
                window.open(siteConfig.whatsappUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <MessageCircle className="h-4 w-4 text-royal dark:text-peri" />
              Chat on WhatsApp
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </Command.Dialog>
  );
}
