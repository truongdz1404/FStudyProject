import { useAuth } from "@/hooks/useAuth";
import useSignalR from "@/hooks/useSignalR";
import React from "react";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { Notification } from "@/types/notification";
import { Card } from "@material-tailwind/react";
import { useNotification } from "@/contexts/NotificationContext";

const NotificationBox: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const { setHasNotify } = useNotification();     
  const [selectedNotification, setSelectedNotification] =
    React.useState<Notification | null>(null);
  const { on, off, invokeMethod } = useSignalR();
  const { user } = useAuth();

  const handleSelectNotification = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const MarkAsRead = (id: number) => {
    invokeMethod("MarkNotificationAsRead", id);
    setNotifications(
      notifications.map(noti =>
        noti.id === id ? { ...noti, isRead: true } : noti
      )
    );
  };

  const MarkAllAsRead = () => {
     invokeMethod("MarkAllNotificationsAsRead", user?.username);
  }

  const ClearNotifications = () => {
     invokeMethod("ClearNotifications", user?.username);
     setNotifications([]);
   };

  const toggleOptions = () => setShowOptions(!showOptions);

  const InvokeNotifications = React.useCallback(() => {
    invokeMethod("GetAllNotifications", user?.username);
  }, [invokeMethod, user?.username]);

  const DeleteNotification = (id: number) => {
    invokeMethod("DeleteNotification", id)
      .then(() => {
        setNotifications(notifications.filter(noti => noti.id !== id));
      })
      .catch(err => console.log("Error deleting notification: ", err));
  };

  React.useEffect(() => {
    if (isOpen) {
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
    }
  }, [InvokeNotifications, isOpen, off, on, setHasNotify]);

  React.useEffect(() => {
     setHasNotify(notifications.length > 0);
  }, [notifications.length, setHasNotify]);

  if (!isOpen) return null;

  return (
    <>
      <Card className="absolute top-0 right-0 mt-12 mr-4 w-80 bg-white shadow-lg rounded-lg mx-4 bg-blue-gray-50/50 max-h-[320px] h-80 overflow-y-auto scrollbar">
        <div className="flex justify-between items-center p-4 bg-blue-gray-600">
          <h2 className="text-black font-bold ">NOTIFICATION</h2>
          <EllipsisVertical className="text-black hover:cursor-pointer" onClick={toggleOptions} />
          {showOptions && (
            <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg z-50 hover:cursor-pointer">
              <ul>
                <li className="hover:bg-gray-100">
                  <button className="block px-4 py-2 text-xs text-gray-700 w-full text-left font-bold" onClick={ClearNotifications}>
                    CLEAR ALL NOTIFICATION
                  </button>
                </li>
                <li className="hover:bg-gray-100">
                  <button className="block px-4 py-2 text-xs text-gray-700 w-full text-left font-bold" onClick={MarkAllAsRead}>
                    MARK ALL AS READ
                  </button>
                </li>
                {/* Thêm các options khác tại đây */}
              </ul>
            </div>
          )}
        </div>
        {selectedNotification ? (
          <div>
            {/* Hiển thị chi tiết của selectedNotification ở đây */}
            <h4 className="text-gray-900">Sender: ADMIN</h4>
            <hr className="border-4 bg-black " />
            <h5 className="text-gray-900 float-start">RECEIVER: </h5>
            <p>{selectedNotification.receiver}</p>
            <hr className="border-4 bg-black " />
            <h5 className="text-gray-900 float-start">CONTENT: </h5>
            <p>{selectedNotification.message.messageContent}</p>
            {/* Nút để quay lại danh sách notifications */}
            <div className="flex justify-evenly">
              <button
                className=" p-2 bg-blue-gray-300 rounded-md"
                onClick={() => setSelectedNotification(null)}
              >
                Back
              </button>
              <button
                className=" p-2 rounded-md bg-red-400"
                onClick={() => {
                  DeleteNotification(selectedNotification.id);
                  setSelectedNotification(null);
                }}
              >
                Delete
              </button>
              <button
                className=" p-2 rounded-md bg-blue-gray-300"
                onClick={() => {
                  MarkAsRead(selectedNotification.id);
                  setSelectedNotification(null);
                }}
              >
                READ
              </button>
            </div>
          </div>
        ) : notifications.length > 0 ? (
          <>
            {notifications.map(notification => (
              <React.Fragment key={notification.id}>
                <div
                  className={`flex justify-between items-center space-y-5 hover:cursor-pointer ${
                    notification.isRead
                      ? "bg-gray-100 hover:bg-gray-50"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => handleSelectNotification(notification)}
                >
                  <p
                    className={`text-sm line-clamp-1 ${
                      notification.isRead ? "text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {notification.message.messageContent}
                  </p>
                  <Trash2
                    className="h-4 w-4 ml-2 hover:cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      DeleteNotification(notification.id);
                    }}
                  />
                </div>
                <hr />
              </React.Fragment>
            ))}
          </>
        ) : (
          <p>No notifications</p>
        )}
      </Card>
    </>
  );
};

export default NotificationBox;
