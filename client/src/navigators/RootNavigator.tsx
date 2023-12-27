import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {JoinScreen} from '@screens';
import {useSession} from '@atoms';
import isEmpty from 'lodash/isEmpty';

type TRootStackParam = {
  Main: undefined;
  ['Join Room']: undefined;
};
const RootStack = createNativeStackNavigator<TRootStackParam>();

export function RootNavigator(): JSX.Element {
  const {session} = useSession();
  const sessionActive = !isEmpty(session.clientId);

  return (
    <RootStack.Navigator>
      <RootStack.Group>
        {sessionActive ? (
          <RootStack.Screen name="Main" component={TabNavigator} />
        ) : (
          <RootStack.Screen name="Join Room" component={JoinScreen} />
        )}
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
