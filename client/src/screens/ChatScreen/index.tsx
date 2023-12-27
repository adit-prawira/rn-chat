import {useEffect, useMemo, useRef, useState} from 'react';
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
  useTheme,
  useContrastText,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {LayoutChangeEvent} from 'react-native';
import {webSocket} from '@socket-io';
import {EmitEvent, MessageEvent, MessageType} from '@enums';
import {TMessage} from '@types';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import type {
  GestureResponderEvent,
  ScrollView as TScrollView,
} from 'react-native';
import {useSession} from 'atoms';
import {ChatBox, EventBox} from './components';

type TDimension = {
  width: number;
  height: number;
};

export function ChatScreen(): JSX.Element {
  const theme = useTheme();
  const {session, leave} = useSession();

  const scrollView = useRef<TScrollView>();

  const [chats, setChats] = useState<TMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [dimension, setDimension] = useState<TDimension>({width: 0, height: 0});

  const textAreaColor = useContrastText(theme.colors.dark[600]);

  const chatElements = useMemo(
    function () {
      return map<TMessage, JSX.Element>(
        chats,
        function (chat: TMessage): JSX.Element {
          const isChat = chat.type === MessageType.CHAT;
          if (isChat)
            return (
              <ChatBox chat={chat} sessionId={session.clientId} key={chat.id} />
            );
          return <EventBox chat={chat} key={chat.id} />;
        },
      );
    },
    [chats],
  );

  function handleLayoutChange(event: LayoutChangeEvent): void {
    setDimension({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }

  function handleTextChange(text: string): void {
    setMessage(text);
  }

  function handleSendMessage(_event: GestureResponderEvent): void {
    const hasMessage = !isEmpty(message.trim());
    if (hasMessage) {
      const clientId = session.clientId;
      const name = session.name;
      webSocket.emit(
        MessageEvent.CREATE_MESSAGE,
        {
          name,
          clientId,
          text: message,
        },
        function () {
          setMessage('');
        },
      );
    }
  }

  function handleLeaveRoom(): void {
    leave();
  }

  function handleScrollToEnd(_w: number, _h: number): void {
    scrollView?.current?.scrollToEnd({animated: true});
  }

  useEffect(
    function () {
      webSocket.emit(
        MessageEvent.FIND_MESSAGES,
        {},
        function (response: TMessage[]): void {
          setChats(response);
        },
      );
      webSocket.on(EmitEvent.MESSAGE, function (messages: TMessage[]) {
        setChats(messages);
      });
    },
    [webSocket],
  );

  return (
    <View
      onLayout={handleLayoutChange}
      backgroundColor={theme.colors.dark[200]}>
      <HStack
        w="100%"
        backgroundColor={theme.colors.dark[100]}
        padding={2}
        justifyContent="flex-end">
        <IconButton
          h="40px"
          w="40px"
          borderRadius="full"
          backgroundColor="#4aa171"
          icon={<Icon name="ios-exit-outline" size={20} color="white" />}
          onPress={handleLeaveRoom}
        />
      </HStack>
      <VStack alignItems="center" space={4} height="100%">
        <Center width="100%" height={`${dimension.height - 200}px`} padding={3}>
          <ScrollView
            width="100%"
            marginX={2}
            marginY={2}
            ref={scrollView}
            onContentSizeChange={handleScrollToEnd}>
            <VStack space={3}>{chatElements}</VStack>
          </ScrollView>
        </Center>

        <HStack space={2} padding={3} backgroundColor={theme.colors.dark[100]}>
          <Center w={`${dimension.width - 75}`}>
            <TextArea
              placeholder="Message"
              h="50px"
              autoCompleteType={false}
              autoCorrect={false}
              borderRadius="full"
              backgroundColor={theme.colors.dark[500]}
              placeholderTextColor={textAreaColor}
              onChangeText={handleTextChange}
              value={message}
              padding={3}
            />
          </Center>
          <Center h="50" w="50">
            <IconButton
              icon={<Icon name="send-outline" size={20} color="white" />}
              borderRadius="full"
              backgroundColor="#4aa171"
              variant="solid"
              width="50px"
              height="50px"
              onPress={handleSendMessage}
            />
          </Center>
        </HStack>
      </VStack>
    </View>
  );
}
