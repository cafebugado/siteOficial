import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2';

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
    secondary: 'bg-cb-purple/10 text-cb-purple hover:bg-cb-purple/20 dark:bg-cb-purple/20 dark:hover:bg-cb-purple/30 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'border-2 border-cb-purple text-cb-purple hover:bg-cb-purple/10 dark:border-cb-purple-dark dark:text-cb-purple-dark dark:hover:bg-cb-purple-dark/10 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-cb-purple hover:bg-cb-purple/10 dark:text-cb-purple-dark dark:hover:bg-cb-purple-dark/10 disabled:opacity-50 disabled:cursor-not-allowed',
    danger: 'bg-cb-red text-white hover:bg-cb-red/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Carregando...
        </>
      ) : children}
    </button>
  );
}
