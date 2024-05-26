import { AuthState } from "./types";

export interface PayloadAction<T> {
    type: AuthActionType;
    payload: T;
}

export enum AuthActionType {
    INITIALIZE = "INITIALIZE",
    SIGN_IN = "SIGN_IN",
    SIGN_OUT = "SIGN_OUT",
}

const reducerHandlers = {
    INITIALIZE(state: AuthState, action: PayloadAction<AuthState>): AuthState {
        const { isAuthenticated, user } = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    SIGN_IN(state: AuthState, action: PayloadAction<AuthState>): AuthState {
        const { user } = action.payload;
        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    SIGN_OUT(state: AuthState) {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    },
};

export function reducer(state: AuthState, action: PayloadAction<AuthState>) {
    if (!reducerHandlers[action.type]) return state;
    return reducerHandlers[action.type](state, action);
}

export function initialize(payload: AuthState): PayloadAction<AuthState> {
    return {
        type: AuthActionType.INITIALIZE,
        payload,
    };
}

export function signIn(payload: AuthState): PayloadAction<AuthState> {
    return {
        type: AuthActionType.SIGN_IN,
        payload,
    };
}

export function signOut(): PayloadAction<AuthState> {
    //TODO: Call API sign out
    return {
        type: AuthActionType.SIGN_OUT,
        payload: { user: null },
    };
}
