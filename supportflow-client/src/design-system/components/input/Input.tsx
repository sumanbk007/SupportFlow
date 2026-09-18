import { forwardRef, useId, useState } from "react";

import clsx from "clsx";

import type { InputProps } from "./input.types";

import "./input.scss";

import { Icon } from "../icon/Icon";
import { Label } from "../label/Label";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,

      variant = "text",
      inputSize = "md",

      loading = false,
      clearable = false,

      leftIcon,
      rightIcon,

      onClear,

      type,
      value,
      defaultValue,

      disabled,

      id,
      className,
      required,

      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = variant === "password";

    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type || variant;

    const isControlled = value !== undefined;

    const handleClear = () => {
      onClear?.();
    };

    return (
      <div className="ds-input-wrapper">
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}

        <div
          className={clsx(
            "ds-input-container",
            `ds-input-container--${inputSize}`,
            {
              "ds-input-container--error": error,
              "ds-input-container--disabled": disabled || loading,
            },
          )}
        >
          {leftIcon && <span className="ds-input-icon">{leftIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={isControlled ? value : undefined}
            defaultValue={!isControlled ? defaultValue : undefined}
            disabled={disabled || loading}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={clsx("ds-input", className)}
            {...props}
          />

          {loading && (
            <span className="ds-input-icon">
              <Icon name="Loader" />
            </span>
          )}

          {clearable && value && !disabled && !loading && (
            <button
              type="button"
              className="ds-input-icon"
              onClick={handleClear}
              aria-label="Clear input"
            >
              <Icon name="X" />
            </button>
          )}

          {isPassword && (
            <button
              type="button"
              className="ds-input-icon right-input-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
            >
              <Icon name={showPassword ? "Eye" : "EyeOff"} className="mr-2" />
            </button>
          )}

          {rightIcon && !loading && !isPassword && !clearable && (
            <span className="ds-input-icon right-input-icon">{rightIcon}</span>
          )}
        </div>

        {error ? (
          <span id={`${inputId}-error`} className="ds-input-error">
            {error}
          </span>
        ) : helperText ? (
          <span className="ds-input-helper">{helperText}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
