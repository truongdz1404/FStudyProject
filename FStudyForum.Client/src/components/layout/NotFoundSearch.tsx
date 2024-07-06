import { FC } from "react";

type NotFoundProps = {
    keyword: string;
};
const NotFoundSearch: FC<NotFoundProps> = ({ keyword }) => {
    return (
        <>
            <div className="w-full flex flex-col item-center">
                <div className="rounded-lg w-full py-6 flex">
                    <img src="http://bit.ly/3Lbxusd" alt="Not Found" className="w-14 h-15 mr-3 ml-2" />
                    <div>
                        <h3 className="font-bold mb-1">Hm... we couldn’t find any results for</h3>
                        <h3 className="font-bold mb-1">"{keyword}"</h3>
                        <p className="text-gray-600 text-sm">Double-check your spelling or try different keywords to adjust your search</p>
                    </div>
                </div>
                <hr className="my-1 border-blue-gray-50 w-full" />
            </div>
        </>
    )
}

export default NotFoundSearch;