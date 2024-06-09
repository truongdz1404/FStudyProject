import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PublicRouteProps {
    children: React.ReactNode;
    restricted: boolean;
    [key: string]: unknown;
}

const PublicRoute = ({children, restricted}: PublicRouteProps) => {
    const token = Cookies.get("FStudyForum-Access-Token");
    console.log(token, restricted);
    return token && restricted ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;