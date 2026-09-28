import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'noir' | 'outline' | 'ghost' | 'champagne' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap text-xs font-sans-luxury uppercase tracking-[0.2em] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-30 cursor-pointer select-none';

    const variants = {
      default:
        'bg-noir text-white hover:bg-neutral-900 border border-noir',
      noir:
        'bg-noir text-white hover:bg-neutral-900 border border-noir',
      outline:
        'border border-black/20 bg-white text-noir hover:bg-noir hover:text-white hover:border-noir',
      ghost:
        'hover:bg-black/5 text-noir',
      champagne:
        'bg-noir text-white hover:bg-neutral-900 border border-champagne/60 hover:border-champagne',
      link:
        'text-noir underline-offset-4 hover:underline p-0 h-auto',
    };

    const sizes = {
      default: 'h-12 px-7 py-3 rounded-none',
      sm: 'h-9 px-4 text-[10px] rounded-none',
      lg: 'h-14 px-9 py-4 text-xs tracking-[0.25em] rounded-none',
      icon: 'h-10 w-10 p-0 rounded-none',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
