export interface Payment {
    username: string;
    fullname: string;
    description: string;
    amount: number;
}
export interface PaymentResponse {
    success: boolean;
    paymentMethod?: string;
    orderDescription?: string;
    orderId?: string;
    transactionId?: string;
    token?: string;
    vnPayResponseCode?: string;
    amount?: number;
}
export interface Donation{
    amount: number;
    message: string;
    username: string;
}