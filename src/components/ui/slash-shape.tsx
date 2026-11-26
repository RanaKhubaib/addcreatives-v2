interface SlashShapeProps {
  className?: string;
}

export function SlashShape({ className = "" }: SlashShapeProps) {
  return <span aria-hidden="true" className={`slash-shape ${className}`.trim()} />;
}
