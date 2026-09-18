import clsx from 'clsx';
import './button.scss';

import { Spinner } from '../spinner/Spinner';
import type { ButtonProps } from './button.types';

export const Button = ({
  children,

  variant = 'primary',
  size = 'md',

  loading = false,
  loadingText,

  disabled = false,

  fullWidth = false,
  iconOnly = false,

  leftIcon,
  rightIcon,

  className,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={clsx(
        'ds-button',
        `ds-button--${variant}`,
        `ds-button--${size}`,
        {
          'ds-button--loading': loading,
          'ds-button--full-width': fullWidth,
          'ds-button--icon-only': iconOnly,
        },
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* LEFT ICON OR LOADER */}
      {loading ? (
        <span className="ds-button__icon">
          <Spinner />
        </span>
      ) : (
        leftIcon && (
          <span className="ds-button__icon">
            {leftIcon}
          </span>
        )
      )}

      {/* TEXT */}
      <span
        className={clsx('ds-button__text', {
          'ds-button__text--loading': loading,
        })}
      >
        {loading && loadingText
          ? loadingText
          : children}
      </span>

      {/* RIGHT ICON */}
      {!loading && rightIcon && (
        <span className="ds-button__icon">
          {rightIcon}
        </span>
      )}
    </button>
  );
};