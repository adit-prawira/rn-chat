import React from 'react';

interface ShowProps {
  readonly when: boolean;
  readonly children: React.ReactNode;
}
export function Show({when, children}: ShowProps): JSX.Element {
  return when ? <>{children}</> : <></>;
}
