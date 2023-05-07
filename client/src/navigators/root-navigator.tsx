import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './tab-navigator';
import {JoinSessionScreen} from '@screens';
import {useSession} from '@atoms';
import isEmpty from 'lodash/isEmpty';

type TRootStackParam = {
  Main: undefined;
  ['Join Room']: undefined;
};
const RootStack = createNativeStackNavigator<TRootStackParam>();

export function RootNavigator(): JSX.Element {
  const {session} = useSession();
  const activeSession = !isEmpty(session.clientId);
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        {activeSession ? (
          <RootStack.Screen name="Main" component={TabNavigator} />
        ) : (
          <RootStack.Screen name="Join Room" component={JoinSessionScreen} />
        )}
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
