import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Clapperboard,
  MessagesSquare,
  PanelsTopLeft,
  Search,
  Shapes,
  type LucideIcon,
} from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  PanelsTopLeft,
  Search,
  MessagesSquare,
  Shapes,
  ChartNoAxesCombined,
  Clapperboard,
};

interface ServiceIconProps {
  name: string;
  className?: string;
}

export function ServiceIcon({ name, className = "" }: ServiceIconProps) {
  const Icon = serviceIcons[name] ?? ArrowUpRight;
  return <Icon aria-hidden="true" className={className} size={22} />;
}
