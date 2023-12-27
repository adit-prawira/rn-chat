import {atom, useAtom} from 'jotai';
import {webSocket} from '@socket-io';
import {MessageEvent} from '@enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

export type Session = {
  name: string;
  clientId: string;
};
export type TSessionStore = {
  name?: string;
  clientId?: string;
};

export const SessionAtom = atom<TSessionStore>({
  name: undefined,
  clientId: undefined,
});

export type TSessionReturnValue = {
  session: TSessionStore;
  join: (name: string) => void;
  leave: () => void;
};

export function useSession(): TSessionReturnValue {
  const [session, setSession] = useAtom(SessionAtom);

  function join(name: string): void {
    webSocket.emit(
      MessageEvent.JOIN_ROOM,
      {name},
      async function (response: Session) {
        setSession(response);
        await AsyncStorage.setItem('@session', JSON.stringify(response));
      },
    );
  }

  function leave(): void {
    webSocket.emit(
      MessageEvent.LEAVE_ROOM,
      {clientId: session.clientId},
      async function () {
        setSession({name: undefined, clientId: undefined});
        await AsyncStorage.removeItem('@session');
      },
    );
  }

  useEffect(function () {
    async function getSession(): Promise<void> {
      const existingSession = await AsyncStorage.getItem('@session');
      if (existingSession) {
        setSession(JSON.parse(existingSession));
      }
    }
    getSession();
  }, []);

  return {
    session,
    join,
    leave,
  };
}
