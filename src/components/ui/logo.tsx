import { cn } from '@/lib/utils';

export type LogoVariant = 'light' | 'dark';
export type LogoSize = 'sm' | 'md' | 'lg';

const sizes: Record<LogoSize, { mark: number; text: string }> = {
  sm: { mark: 28, text: 'text-lg' },
  md: { mark: 36, text: 'text-2xl' },
  lg: { mark: 44, text: 'text-3xl' },
};

export interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}

/**
 * ADD Creatives logo recreation: rounded-square cursor mark inside a
 * circle ring, plus wordmark "ADD" (royal) + "CREATIVES" (near-black / white).
 *
 * TODO: replace with real logo file: drop logo.svg in public/ and swap
 * <LogoSvg/> for <Image src="/logo.svg" alt="ADD Creatives" />.
 */
export function Logo({ variant = 'light', size = 'md', className }: LogoProps) {
  const { mark, text } = sizes[size];
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoSvg size={mark} />
      <span
        className={cn(
          'font-display font-extrabold tracking-tight whitespace-nowrap',
          text,
        )}
      >
        <span className="text-royal">ADD</span>{' '}
        <span className={variant === 'dark' ? 'text-white' : 'text-ink'}>
          CREATIVES
        </span>
      </span>
    </span>
  );
}

/** The mark only — circle ring + rounded-square cursor icon. */
export function LogoSvg({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="ADD Creatives logo mark"
    >
      {/* Outer circle ring */}
      <circle cx="24" cy="24" r="22" stroke="#0B4DA2" strokeWidth="2.5" />
      {/* Rounded-square tile */}
      <rect x="13" y="13" width="22" height="22" rx="6" fill="#0B4DA2" />
      {/* Cursor arrow */}
      <path
        d="M19.5 18.5v11l2.7-2.9 1.9 4.2 2.4-1.1-1.9-4.1h4.9l-10-7.1Z"
        fill="#fff"
      />
    </svg>
  );
}
