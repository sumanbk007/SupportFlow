import type {
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export type InputVariant =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'phone';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size'
  > {
  label?: string;

  error?: string;

  helperText?: string;

  variant?: InputVariant;

  inputSize?: InputSize;

  loading?: boolean;

  clearable?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  onClear?: () => void;
}