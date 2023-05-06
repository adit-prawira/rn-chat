import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './tab-navigator';

type TRootStackParam = {
  Main: undefined;
};
const RootStack = createNativeStackNavigator<TRootStackParam>();

export function RootNavigator(): JSX.Element {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
