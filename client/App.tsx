/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider as JotaiProvider} from 'jotai';
import {ThemeProvider, NavigationProvider} from '@theme';
import {RootNavigator} from '@navigators';

function App(): JSX.Element {
  return (
    <JotaiProvider>
      <ThemeProvider>
        <NavigationProvider>
          <RootNavigator />
        </NavigationProvider>
      </ThemeProvider>
    </JotaiProvider>
  );
}

export default App;
