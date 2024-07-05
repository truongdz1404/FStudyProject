import React from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
    const [showHistory, setShowHistory] = React.useState(false);
    const navigate = useNavigate();
    

    React.useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        setSearchHistory(savedHistory);
    }, []);

    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            const newHistory = [searchTerm.trim(), ...searchHistory.filter(term => term !== searchTerm.trim())].slice(0, 6);
            setSearchHistory(newHistory);
            localStorage.setItem("searchHistory", JSON.stringify(newHistory));
            navigate(`/search/posts?keyword=${searchTerm.trim()}`);
            setSearchTerm("");
        }
    };

    const handleHistoryClick = (term: string) => {
        setSearchTerm(term);
        navigate(`/search/posts?keyword=${term}`);
        setShowHistory(false);
    };

    const handleClearHistoryItem = (term: string) => {
        const updatedHistory = searchHistory.filter(item => item !== term);
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    };

    return (
        <div className="relative w-full">
            <div className="my-auto flex-1 mt-2.5">
                <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    className={`focus:outline-none bg-transparent w-full pr-4 ${searchTerm ? 'w-full' : 'w-64'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    onFocus={() => setShowHistory(true)}
                    onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                />
            </div>
            {showHistory && searchHistory.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-lg w-full mt-4 z-10 shadow-lg ">
                    {searchHistory.map((term, index) => (
                        <div onMouseDown={() => handleHistoryClick(term)} key={index} className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-200 w-full">
                            <div className="flex items-center w-full">
                                <span className="text-gray-400 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="m13.558 14.442-4.183-4.183V4h1.25v5.741l3.817 3.817-.884.884ZM20 10a10 10 0 1 0-10 10 10.011 10.011 0 0 0 10-10Zm-1.25 0A8.75 8.75 0 1 1 10 1.25 8.76 8.76 0 0 1 18.75 10Z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span>{term}</span>
                            </div>
                            <button onMouseDown={(e) => {
                                e.stopPropagation();
                                handleClearHistoryItem(term);
                            }}
                                className="text-gray-500 hover:text-red-500 focus:outline-none action flex gap-x-2">
                                <svg fill="currentColor" height="16" icon-name="clear-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18.75A8.75 8.75 0 1 1 18.75 10 8.76 8.76 0 0 1 10 18.75Zm3.567-11.433L10.884 10l2.683 2.683-.884.884L10 10.884l-2.683 2.683-.884-.884L9.116 10 6.433 7.317l.884-.884L10 9.116l2.683-2.683.884.884Z"></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
