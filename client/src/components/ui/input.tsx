import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, rightIcon, leftIcon, ...props }, ref) => {
    return (
      <div className="form-control">
        {label && (
          <label className="label">
            <span className="label-text font-medium">{label}</span>
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {leftIcon}
            </div>
          )}

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {rightIcon}
            </div>
          )}

          <input
            ref={ref}
            className={clsx('input input-bordered w-full', {
              'pl-10': leftIcon,
              'pr-10': rightIcon,
            })}
            {...props}
          />
        </div>
      </div>
    );
  }
);
