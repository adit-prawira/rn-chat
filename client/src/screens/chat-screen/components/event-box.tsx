import {HStack, Box, Text, useTheme, useContrastText} from 'native-base';
import {format} from 'date-fns';
import {TMessage} from '@types';

export interface EventBoxProps {
  chat: TMessage;
}

export function EventBox({chat}: EventBoxProps): JSX.Element {
  const theme = useTheme();
  const time = format(new Date(), 'HH:mm a');
  const textColor = useContrastText(theme.colors.dark[200]);
  return (
    <HStack width="100%">
      <Box
        width="100%"
        padding={3}
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Text fontSize="sm" color={textColor}>
          {chat.text} - {time}
        </Text>
      </Box>
    </HStack>
  );
}
