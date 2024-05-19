export type Response = {
    status: string;
    message: object;
    data: T;
};

export type ResponseWith<T> = {
    status: string;
    message: object;
    data: T;
};
