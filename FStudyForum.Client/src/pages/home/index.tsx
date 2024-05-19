import HomeService from "@/services/HomeService";
import React, { FC } from "react";

const Home: FC = () => {
    const [message, setMessage] = React.useState<string>("Dit me the gioi");
    React.useEffect(() => {
        const fetchMessage = async () => {
            setMessage((await HomeService.helloworld()));
        };
        fetchMessage();
    }, []);
    return (
        <>
            <h1 className="text-yellow-500">{message}</h1>
        </>
    );
};
export default Home;
