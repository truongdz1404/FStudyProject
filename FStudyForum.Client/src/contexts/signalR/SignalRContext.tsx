import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";
import * as signalR from "@microsoft/signalr";

const URL = import.meta.env.VITE_BASE_URL;

type MessageHandler<T extends unknown[]> = (...args: T) => void;

interface SignalRContextType {
  connection: signalR.HubConnection | null;
  connectionState: signalR.HubConnectionState;
  sendMessage: <T extends unknown[]>(
    methodName: string,
    ...args: T
  ) => Promise<void>;
  invokeMethod: <T extends unknown[], R>(
    methodName: string,
    ...args: T
  ) => Promise<R | null>;
  on: <T extends unknown[]>(
    methodName: string,
    newMethod: MessageHandler<T>
  ) => void;
  off: <T extends unknown[]>(
    methodName: string,
    method: MessageHandler<T>
  ) => void;
}

export const SignalRContext = createContext<SignalRContextType | undefined>(
  undefined
);

interface SignalRProviderProps {
  hubName: string;
  children: React.ReactNode;
  accessTokenFactory?: () => string | Promise<string>;
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({
  hubName,
  children,
  accessTokenFactory
}) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [connectionState, setConnectionState] =
    useState<signalR.HubConnectionState>(
      signalR.HubConnectionState.Disconnected
    );

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${URL}/${hubName}`, { accessTokenFactory })
      .withAutomaticReconnect([1000, 2000, 5000, 10000, 20000, 30000])
      .build();

    setConnection(newConnection);

    const startConnection = async () => {
      try {
        await newConnection.start();
        setConnectionState(newConnection.state);
      } catch (err) {
        console.error("SignalR Connection Error: ", err);
      }
    };

    startConnection();

    newConnection.onclose(() =>
      setConnectionState(signalR.HubConnectionState.Disconnected)
    );
    newConnection.onreconnecting(() =>
      setConnectionState(signalR.HubConnectionState.Reconnecting)
    );
    newConnection.onreconnected(() =>
      setConnectionState(signalR.HubConnectionState.Connected)
    );

    return () => {
      newConnection.stop();
    };
  }, [hubName, accessTokenFactory]);

  const sendMessage = useCallback(
    async <T extends unknown[]>(methodName: string, ...args: T) => {
      if (
        connection &&
        connection.state === signalR.HubConnectionState.Connected
      ) {
        await connection.send(methodName, ...args);
      } else {
        console.error(
          "Cannot send message - connection is not in Connected state"
        );
      }
    },
    [connection]
  );

  const invokeMethod = useCallback(
    async <T extends unknown[], R>(
      methodName: string,
      ...args: T
    ): Promise<R | null> => {
      if (
        connection &&
        connection.state === signalR.HubConnectionState.Connected
      ) {
        try {
          const result: R = await connection.invoke<R>(methodName, ...args);
          return result;
        } catch (error) {
          console.error("Error invoking method:", methodName, error);
          return null;
        }
      } else {
        console.error(
          "Cannot invoke method - connection is not in Connected state"
        );
        return null;
      }
    },
    [connection]
  );

  const on = useCallback(
    <T extends unknown[]>(methodName: string, newMethod: MessageHandler<T>) => {
      connection?.on(methodName, newMethod);
    },
    [connection]
  );

  const off = useCallback(
    <T extends unknown[]>(methodName: string, method: MessageHandler<T>) => {
      connection?.off(methodName, method);
    },
    [connection]
  );

  const contextValue = useMemo(
    () => ({
      connection,
      connectionState,
      sendMessage,
      invokeMethod,
      on,
      off
    }),
    [connection, connectionState, sendMessage, invokeMethod, on, off]
  );

  return (
    <SignalRContext.Provider value={contextValue}>
      {children}
    </SignalRContext.Provider>
  );
};
