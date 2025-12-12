import { ReactNode, AnchorHTMLAttributes } from 'react';

export type LinkButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type LinkButtonSize = 'sm' | 'md' | 'lg';

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
  external?: boolean;
}

export default function LinkButton({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  external = false,
  className = '',
  href,
  ...props
}: LinkButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 no-underline';

  const variantClasses: Record<LinkButtonVariant, string> = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-cb-purple/10 text-cb-purple hover:bg-cb-purple/20 dark:bg-cb-purple/20 dark:hover:bg-cb-purple/30',
    outline: 'border-2 border-cb-purple text-cb-purple hover:bg-cb-purple/10 dark:border-cb-purple-dark dark:text-cb-purple-dark dark:hover:bg-cb-purple-dark/10',
    ghost: 'text-cb-purple hover:bg-cb-purple/10 dark:text-cb-purple-dark dark:hover:bg-cb-purple-dark/10',
    danger: 'bg-cb-red text-white hover:bg-cb-red/90 hover:shadow-lg',
  };

  const sizeClasses: Record<LinkButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
}
