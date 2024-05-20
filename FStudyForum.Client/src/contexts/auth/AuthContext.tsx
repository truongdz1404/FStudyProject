import { Dispatch, FC, PropsWithChildren } from "react";
import { AuthState } from "./types";
import React from "react";
import { PayloadAction, initialize, reducer } from "./reduce";
import UserService from "@/services/UserService";

export interface AuthContextType extends AuthState {
    dispatch: Dispatch<PayloadAction<AuthState>>;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

export const AuthContext = React.createContext<AuthContextType>({
    ...initialState,
    dispatch: () => null,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        (async () => {
            try {
                const user = await UserService.getProfile();
                dispatch(initialize({ isAuthenticated: true, user: user }));
            } catch {
                dispatch(initialize({ isAuthenticated: false, user: null }));
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
