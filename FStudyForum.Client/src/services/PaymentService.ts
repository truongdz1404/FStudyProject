import { ResponseWith } from "@/types/response";
import api from "./api";
import { Payment } from "@/types/payment";

const getPayMentQR = async () => {
    const response = await api.get<ResponseWith<Payment>>("QRcode/generate")
    return response.data.data;
};

const PaymentService = {
  getPayMentQR
}
export default PaymentService
