import React from 'react';

import {NavigationContainer, DarkTheme} from '@react-navigation/native';
export interface NavigationProviderProps {
  readonly children: React.ReactNode;
}
export function NavigationProvider({
  children,
}: NavigationProviderProps): JSX.Element {
  return (
    <NavigationContainer theme={DarkTheme}>{children}</NavigationContainer>
  );
}
