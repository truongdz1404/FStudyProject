export interface Payment {
    code: string;
    desc: string;
    data: {
        qrCode: string;
        qrDataURL: string;
    };
}