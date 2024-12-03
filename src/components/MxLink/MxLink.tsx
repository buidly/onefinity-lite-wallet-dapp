import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { WithClassnameType } from 'types';

interface MxLinkPropsType extends PropsWithChildren, WithClassnameType {
  to: string;
}

export const MxLink = ({
  'data-testid': dataTestId,
  children,
  className = 'inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 gradient-button text-white ml-2 mr-0',
  to
}: MxLinkPropsType) => {
  return (
    <Link data-testid={dataTestId} to={to} className={className}>
      {children}
    </Link>
  );
};
