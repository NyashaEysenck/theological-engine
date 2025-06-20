import React, { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
  external?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  to,
  external,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-primary-900 text-white hover:bg-primary-800 focus:ring-primary-600 shadow-card hover:shadow-card-hover',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-card hover:shadow-card-hover',
    outline: 'border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white focus:ring-primary-600',
    ghost: 'text-primary-900 hover:bg-primary-50 focus:ring-primary-600',
    link: 'text-primary-900 hover:text-primary-700 underline-offset-4 hover:underline focus:ring-primary-600 p-0',
  };
  
  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };
  
  const buttonStyles = clsx(
    baseStyles,
    variantStyles[variant],
    variant !== 'link' && sizeStyles[size],
    fullWidth ? 'w-full' : '',
    disabled || isLoading ? 'opacity-70 cursor-not-allowed' : '',
    className
  );

  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );
  
  if (to) {
    return external ? (
      <a 
        href={to} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={buttonStyles}
      >
        {content}
      </a>
    ) : (
      <Link to={to} className={buttonStyles}>
        {content}
      </Link>
    );
  }
  
  return (
    <button 
      className={buttonStyles} 
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;