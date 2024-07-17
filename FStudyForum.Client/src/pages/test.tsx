import { useAuth } from "@/hooks/useAuth";
import useSignalR from "@/hooks/useSignalR";
import { SendHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Notification } from "@/types/notification";
const Test = () => {
  const { on, off, invokeMethod } = useSignalR();
  const { user } = useAuth();
  const [messageAll, setMessageAll] = useState("");
  const [messageUser, setMessageUser] = useState("");
  const [receiver, setReceiver] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const sendToAll = () => {
    invokeMethod("SendNotificationToAll", user?.username, messageAll);
  };

  const sendToUser = () => {
    if (receiver) {
      invokeMethod(
        "SendNotificationToUser",
        user?.username,
        receiver,
        messageUser
      );
    }
  };

  const InvokeNotifications = useCallback(() => {
    invokeMethod("GetAllNotifications", user?.username);
  }, [invokeMethod, user?.username]);

  const markAsRead = (id: number) => {
    invokeMethod("MarkNotificationAsRead", id);
    setNotifications(
      notifications.map(noti =>
        noti.id === id ? { ...noti, isRead: true } : noti
      )
    );
  };

  const clearNotifications = () => {
    invokeMethod("ClearNotifications", user?.username);
    setNotifications([]);
  };

  const deleteNotification = (id: number) => {
    invokeMethod("DeleteNotification", id)
      .then(() => {
        setNotifications(notifications.filter(noti => noti.id !== id));
      })
      .catch(err => console.log("Error deleting notification: ", err));
  };

  useEffect(() => {
    InvokeNotifications();
    const handleAddNotification = (obj: Notification) => {
      setNotifications(prev => [...prev, obj]);
    };

    const handleGetAllNotifications = (obj: Notification[]) => {
      setNotifications(obj);
    };
    on("ReceiveAllNotification", handleGetAllNotifications);
    on("ReceiveNewestNotification", handleAddNotification);
    return () => {
      off("ReceiveAllNotification", handleGetAllNotifications);
      off("ReceiveNewestNotification", handleAddNotification);
    };
  }, [InvokeNotifications, off, on]);

  return (
    <>
      {/* Send to All */}
      <div className="flex items-center gap-x-2">
        <span>Send to All: </span>{" "}
        <input
          type="text"
          className="border-2 px-2"
          value={messageAll}
          onChange={e => setMessageAll(e.target.value)}
        />
        <button className="border-2 p-1" type="button" onClick={sendToAll}>
          <SendHorizontal className="w-4 h-4" />
        </button>
      </div>
      {/* Send to User */}
      <div>
        <span>Send to User: </span>
        <input
          type="text"
          className="border-2 px-2"
          value={messageUser}
          onChange={e => setMessageUser(e.target.value)}
          disabled={receiver === undefined || receiver === "" ? true : false}
        />
        <button
          className="border-2 p-1"
          type="button"
          onClick={sendToUser}
          disabled={receiver === undefined || receiver === "" ? true : false}
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </div>
      {/* Receiver */}
      <div>
        <span>Receiver: </span>
        <input
          type="text"
          className="border-2 px-2"
          value={receiver}
          onChange={e => setReceiver(e.target.value)}
        />
      </div>
      <div>
        <button
          className="border-2 p-1"
          type="button"
          onClick={clearNotifications}
        >
          CLEAR
        </button>
      </div>
      <div>
        <ul>
          {notifications.map(notification => (
            <li key={notification.id}>
              <div>
                {"Content: "}
                {notification.message.messageContent}
              </div>
              <div>
                {"Sender: "}
                {notification.message.sender}
              </div>
              <div>
                {"IsRead: "}
                {notification.isRead ? "yes" : "no"}
              </div>
              <div className="flex justify-evenly">
                <button
                  className="border-2 p-1"
                  type="button"
                  onClick={() => markAsRead(notification.id)}
                >
                  READ
                </button>
                <button
                  className="border-2 p-1"
                  type="button"
                  onClick={() => deleteNotification(notification.id)}
                >
                  DELETE
                </button>
              </div>
              <hr className="my-4" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Test;
