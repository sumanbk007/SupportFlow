export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type'
  > {
  label?: string;
  error?: string;
  helperText?: string;

  checked?: boolean;
  defaultChecked?: boolean;

  indeterminate?: boolean;

  disabled?: boolean;
}