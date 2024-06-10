import { Navigate } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';
import { useAuth } from '@/hooks/useAuth';

const SignInGuard: FC<PropsWithChildren> = ({children}) => {
     const { user } = useAuth();
     return user ? <Navigate to="/"/> : <>{children}</>;
}

export default SignInGuard