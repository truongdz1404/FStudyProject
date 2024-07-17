export interface Notification {
     id: number;
     messageType: string;
     message: NotificationMessage;
     isRead: boolean;
     receiver?: string;
}

interface NotificationMessage {
     messageContent: string;
     sender: string;
}