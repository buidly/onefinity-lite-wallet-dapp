import type { PropsWithChildren, MouseEvent } from 'react';
import { WithClassnameType } from 'types';

interface ButtonType extends WithClassnameType, PropsWithChildren {
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  dataTestId?: string;
  dataCy?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  id,
  className = 'inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-white mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed gradient-button',
  ...otherProps
}: ButtonType) => {
  return (
    <button
      className={className}
      data-testid={otherProps['data-testid']}
      disabled={disabled}
      id={id}
      onClick={onClick}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
};
