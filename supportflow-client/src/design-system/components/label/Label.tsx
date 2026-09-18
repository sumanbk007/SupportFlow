import clsx from 'clsx';

import './label.scss';

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = ({
  children,
  required,
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      className={clsx(
        'ds-label',
        className
      )}
      {...props}
    >
      {children}

      {required && (
        <span className="ds-label-required">
          *
        </span>
      )}
    </label>
  );
};