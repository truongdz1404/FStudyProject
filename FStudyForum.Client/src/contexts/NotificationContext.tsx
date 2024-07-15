// NotificationContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface NotificationContextType {
     hasNotify: boolean;
     setHasNotify: (hasNotify: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
export const useNotification = () => {
     const context = useContext(NotificationContext);
     if (context === undefined) {
       throw new Error('useNotification must be used within a NotificationProvider');
     }
     return context;
   };

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const [hasNotify, setHasNotify] = useState<boolean>(false);

     return (
          <NotificationContext.Provider value={{ hasNotify, setHasNotify }}>
               {children}
          </NotificationContext.Provider>
     );
};