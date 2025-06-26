import React from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Simple classnames helper
const cx = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  const buttonClasses = cx(
    "btn",
    `btn-${variant}`,
    size !== "md" && `btn-${size}`,
    fullWidth && "w-full",
    loading && "opacity-75 cursor-wait",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {loading ? (
        <span className="inline-block animate-spin mr-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      ) : icon && iconPosition === "left" ? (
        <span className="mr-2 inline-flex">{icon}</span>
      ) : null}

      <span>{children}</span>

      {icon && iconPosition === "right" && !loading && (
        <span className="ml-2 inline-flex">{icon}</span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled || loading}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={buttonClasses}
        aria-disabled={disabled || loading}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}

// Export variant styles for use in other components
export const buttonVariants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
} as const;

// Export size styles for use in other components
export const buttonSizes = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
} as const;
