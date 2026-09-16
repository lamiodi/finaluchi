import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'champagne' | 'atelier' | 'solstice';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center px-2 py-0.5 text-[9px] font-mono-luxury uppercase tracking-widest transition-colors rounded-xs select-none';

  const variants = {
    default:
      'bg-noir text-white border border-noir',
    secondary:
      'bg-oyster text-noir border border-border',
    outline:
      'text-noir border border-noir/30 bg-transparent',
    champagne:
      'bg-noir/10 text-noir border border-noir/30',
    atelier:
      'bg-status-atelier/15 text-status-atelier border border-status-atelier/30',
    solstice:
      'bg-cloth-sunstone-amber/15 text-cloth-sunstone-amber border border-cloth-sunstone-amber/30',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
