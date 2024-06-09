import { ResponseWith } from "@/types/response";
import api from "./api";
import { Payment } from "@/types/payment";
import axios from "axios";

const getPayMentQR = async () => {
    
    const response = await api.post<ResponseWith<any>>(
        "https://api.vietqr.io/v2/generate",
        {
            accountNo: 4271017225,
            accountName: "BUI DUC TRONG",
            acqId: 970415,
            amount: 10000,
            addInfo: "Donate Study",
            format: "text",
            template: "compact",
        }
    );
    return response;
};
const PaymentService = {
    getPayMentQR,
};
export default PaymentService;
