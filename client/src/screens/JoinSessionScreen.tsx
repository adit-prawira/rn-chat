import {
  ScrollView,
  Text,
  useTheme,
  Center,
  useContrastText,
  Input,
  VStack,
  HStack,
  IconButton,
  View,
} from 'native-base';
import {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useSession} from '@atoms';

type TDimension = {
  width: number;
  height: number;
};

import Icon from 'react-native-vector-icons/FontAwesome';

export function JoinScreen(): JSX.Element {
  const theme = useTheme();
  const {join} = useSession();
  const [name, setName] = useState<string>('');
  const [dimension, setDimension] = useState<TDimension>({width: 0, height: 0});
  const headingColor = useContrastText(theme.colors.dark[200]);
  const inputColor = useContrastText(theme.colors.dark[200]);

  function handleLayoutChange(event: LayoutChangeEvent): void {
    setDimension({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }

  function handleChangeText(text: string): void {
    setName(text);
  }

  function handleJoinRoom(): void {
    join(name);
    setName('');
  }

  return (
    <ScrollView backgroundColor={theme.colors.dark[200]} paddingTop="60%">
      <View onLayout={handleLayoutChange}>
        <VStack space={1}>
          <HStack padding={3}>
            <Text fontSize="xl" color={headingColor} bold>
              Enter your name
            </Text>
          </HStack>
          <HStack space={2} padding={3}>
            <Center w={`${dimension.width - 75}`}>
              <Input
                placeholder="What is your name?"
                h="50px"
                color={inputColor}
                onChangeText={handleChangeText}
              />
            </Center>
            <Center h="50" w="50">
              <IconButton
                icon={<Icon name="group" size={20} color="white" />}
                backgroundColor="#4aa171"
                variant="solid"
                width="50px"
                height="50px"
                onPress={handleJoinRoom}
              />
            </Center>
          </HStack>
        </VStack>
      </View>
    </ScrollView>
  );
}
