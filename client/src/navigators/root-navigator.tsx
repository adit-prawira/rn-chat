import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './tab-navigator';
import {JoinScreen} from '@screens';
import {useSession} from '@atoms';
import isEmpty from 'lodash/isEmpty';
import {Show} from 'components/Show';

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
        <Show when={sessionActive}>
          <RootStack.Screen name="Main" component={TabNavigator} />
        </Show>
        <Show when={!sessionActive}>
          <RootStack.Screen name="Join Room" component={JoinScreen} />
        </Show>
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
