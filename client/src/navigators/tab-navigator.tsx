import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorValue} from 'react-native/types';
import {ChatScreen, PhoneScreen} from '../screens';

type TTabParam = {
  Chat: undefined;
  Phone: undefined;
};
const Tab = createBottomTabNavigator<TTabParam>();

export function TabNavigator(): JSX.Element {
  const navigation = useNavigation();

  useLayoutEffect(function () {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={function ({route}) {
        return {
          tabBarActiveTintColor: '#4aa171',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon({focused}) {
            const isCustomerScreen = route.name === 'Chat';
            const iconColor: ColorValue = focused ? '#4aa171' : 'gray';
            if (isCustomerScreen) {
              return <Icon name="chat" color={iconColor} size={25} />;
            }
            return <Icon name="phone" color={iconColor} size={25} />;
          },
        };
      }}>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Phone" component={PhoneScreen} />
    </Tab.Navigator>
  );
}
