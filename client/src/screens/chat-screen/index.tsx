import {useEffect, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextArea,
  Box,
  View,
  IconButton,
  HStack,
  VStack,
  Center,
  Divider,
  useTheme,
  useContrastText,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {LayoutChangeEvent} from 'react-native';
import {webSocket} from '@socket-io';
type TDimension = {
  width: number;
  height: number;
};
export function ChatScreen(): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const theme = useTheme();
  const textAreaColor = useContrastText(theme.colors.dark[600]);
  const [dimension, setDimension] = useState<TDimension>({width: 0, height: 0});
  function handleLayoutChange(event: LayoutChangeEvent): void {
    setDimension({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }
  useEffect(function () {
    webSocket.emit('find-messages', {}, function (response: any) {
      console.info('the value', response);
    });
  }, []);
  return (
    <View onLayout={handleLayoutChange}>
      <VStack alignItems="center" space={4} height="100%">
        <Center width="100%" height={`${dimension.height - 80}px`}>
          <ScrollView>
            <Text>Hey man</Text>
          </ScrollView>
        </Center>

        <HStack space={2} padding={2} backgroundColor={theme.colors.dark[600]}>
          <Center w={`${dimension.width - 75}`}>
            <TextArea
              placeholder="Message"
              h="50px"
              autoCompleteType={false}
              borderRadius="full"
              backgroundColor={theme.colors.dark[500]}
              placeholderTextColor={textAreaColor}
            />
          </Center>
          <Center h="50" w="50">
            <IconButton
              icon={<Icon name="send-outline" size={20} color="white" />}
              borderRadius="full"
              backgroundColor="#522bf0"
              variant="solid"
              width="50px"
              height="50px"
            />
          </Center>
        </HStack>
      </VStack>
    </View>
  );
}
