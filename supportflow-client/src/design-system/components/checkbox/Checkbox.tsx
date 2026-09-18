import { forwardRef, useId, useEffect, useRef } from "react";

import clsx from "clsx";

import type { CheckboxProps } from "./checkbox.types";

import "./checkbox.scss";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,

      checked,
      defaultChecked,

      indeterminate = false,

      disabled,

      id,

      className,

      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const internalRef = useRef<HTMLInputElement | null>(null);

    const setRef = (node: HTMLInputElement) => {
      internalRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className="ds-checkbox-wrapper">
        <label
          htmlFor={inputId}
          className={clsx(
            "ds-checkbox",
            {
              "ds-checkbox--disabled": disabled,
              "ds-checkbox--error": error,
            },
            className,
          )}
        >
          <input
            ref={setRef}
            id={inputId}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            className="ds-checkbox-input"
            {...props}
          />

          <span className="ds-checkbox-box" />

          {label && <span className="ds-checkbox-label">{label}</span>}
        </label>

        {error ? (
          <span className="ds-checkbox-error">{error}</span>
        ) : helperText ? (
          <span className="ds-checkbox-helper">{helperText}</span>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
