import {HStack, Box, Text, useTheme, useContrastText} from 'native-base';
import {TMessage} from '@types';
import {format} from 'date-fns';

export interface ChatBoxProps {
  chat: TMessage;
  sessionId?: string;
}
export function ChatBox({chat, sessionId}: ChatBoxProps): JSX.Element {
  const theme = useTheme();
  const time = format(new Date(), 'HH:mm a');
  const friendMessageColor = useContrastText('#4aa171');
  const isCurrentClientMessage = chat.clientId === sessionId;
  const backgroundColor = isCurrentClientMessage
    ? theme.colors.dark[600]
    : '#4aa171';
  const borderBottomLeftRadius = isCurrentClientMessage ? undefined : 'none';
  const borderBottomRightRadius = isCurrentClientMessage ? 'none' : undefined;
  const chatPosition = isCurrentClientMessage ? 'flex-end' : 'flex-start';
  const nameColor = isCurrentClientMessage
    ? theme.colors.black[100]
    : chat.color;
  return (
    <HStack width="100%" justifyContent={chatPosition}>
      <Box
        borderRadius="2xl"
        backgroundColor={backgroundColor}
        minWidth="150px"
        maxWidth="300px"
        padding={3}
        borderBottomLeftRadius={borderBottomLeftRadius}
        borderBottomRightRadius={borderBottomRightRadius}
        shadow={3}>
        <Text fontSize="md" bold color={nameColor}>
          {chat.name}
        </Text>
        <Text color={friendMessageColor}>{chat.text}</Text>
        <Text color={theme.colors.dark[100]} italic textAlign="right">
          {time}
        </Text>
      </Box>
    </HStack>
  );
}
