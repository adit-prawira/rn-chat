import React from 'react';

interface ShowProps {
  readonly when: boolean;
  readonly children: React.ReactNode;
}
export function Show({children, when}: ShowProps): JSX.Element {
  return when ? <>{children}</> : <></>;
}
