import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        default: 'h-9 px-4 py-2',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
};

const Button = ({ className, variant, size, ref, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
