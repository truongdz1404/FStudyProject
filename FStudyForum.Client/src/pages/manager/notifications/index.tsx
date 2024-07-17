import React from "react";

import { CardBody } from "@material-tailwind/react";
import { UserRound, UsersRound } from "lucide-react";
import useSignalR from "@/hooks/useSignalR";
import { useAuth } from "@/hooks/useAuth";
const object = {
  ALL: "ALL",
  USER: "USER"
};
const Index = () => {
  const [selectedOption, setSelectedOption] = React.useState(object.ALL);
  const [messageAll, setMessageAll] = React.useState("");
  const [messageUser, setMessageUser] = React.useState("");
  const [receiver, setReceiver] = React.useState("");
  const { invokeMethod } = useSignalR();
  const { user } = useAuth();

  const sendToAll = () => {
    if (selectedOption === object.ALL) {
      invokeMethod("SendNotificationToAll", user?.username, messageAll);
    }
  };

  const sendToUser = () => {
    if (selectedOption === object.USER && receiver) {
      invokeMethod(
        "SendNotificationToUser",
        user?.username,
        receiver,
        messageUser
      );
    }
  };

  return (
    <>
      <CardBody className="bg-gray-800 w-full">
        <div className="p-8 lg:w-full max-w-full">
          <div className="bg-white rounded-t-lg p-8">
            <h2 className="text-center text-lg font-bold text-gray-900">
              {" "}
              NOTIFICATION
            </h2>
            <div>
              <div className="flex items-center justify-center space-x-4 mt-3">
                <button
                  type="button"
                  onClick={() => setSelectedOption(object.ALL)}
                  className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  <UsersRound />
                  Send to All
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOption(object.USER)}
                  className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  <UserRound />
                  Send to user
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
            <p className="text-center text-sm text-gray-500 font-light">
              {" "}
              Write down your notification{" "}
            </p>
            <form className="mt-6">
              <div className="relative mt-2">
                <textarea
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-10 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  onChange={
                    selectedOption === object.ALL
                      ? e => setMessageAll(e.target.value)
                      : e => setMessageUser(e.target.value)
                  }
                  disabled={selectedOption === object.USER && !receiver}
                  value={
                    selectedOption === object.ALL ? messageAll : messageUser
                  }
                />
              </div>
              {selectedOption === object.USER && (
                <div className="relative mt-3">
                  <input
                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Receiver"
                    onChange={e => setReceiver(e.target.value)}
                  />
                  <div className="absolute left-0 inset-y-0 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 ml-3 text-gray-400 p-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center mt-8">
                {" "}
                <button
                  type="button"
                  disabled={
                    (selectedOption === object.USER && !receiver) ||
                    (selectedOption === object.USER && !messageUser)
                  }
                  onClick={
                    selectedOption === object.ALL ? sendToAll : sendToUser
                  }
                  className="text-white py-2 px-4 uppercase rounded bg-deep-orange-300 hover:bg-deep-orange-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  {" "}
                  SEND{" "}
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </CardBody>
    </>
  );
};

export default Index;
