import React from 'react';
import {extendTheme, NativeBaseProvider} from 'native-base';

export interface ThemeProviderProps {
  children: React.ReactNode;
}
export function ThemeProvider({children}: ThemeProviderProps): JSX.Element {
  const theme = extendTheme({
    config: {
      initialColorMode: 'light',
    },
  });
  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
}
