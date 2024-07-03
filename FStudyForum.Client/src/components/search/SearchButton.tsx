import { useLocation, useNavigate } from "react-router-dom";


const useQuery = () => {
    return  new URLSearchParams(useLocation().search);
};


const SearchButton = () => {

    const query = useQuery();
    const pathSegments = location.pathname.split('/');
    const type = pathSegments[pathSegments.length - 1];
    const keyword = query.get('keyword');
    const navigate = useNavigate();

    const handleClick = (type: string) => {
        navigate(`/search/${type}?keyword=${keyword}`);
    };
    const SearchMenu = [
        {
            type: 'posts',
            title: 'Posts'
        },
        {
            type: 'topics',
            title: 'Topics'
        },
        {
            type: 'comments',
            title: 'Comments'
        },
        {
            type: 'people',
            title: 'People'
        },
    ]

    return (
        <>
            {SearchMenu.map(search => (
                <button
                    key={search.type}
                    onClick={() => {
                        if(type != search.type)
                        return handleClick(search.type)} } 
                    className={`mb-2 font-bold relative flex gap-x-1 justify-center items-center  px-5 p-2 text-sm text-black-800
                    ${type == search.type ? 'bg-blue-200' : 'bg-white'} rounded-full`}>
                    {search.title}
                </button>
            ))}
        </>
    )
}


export default SearchButton;