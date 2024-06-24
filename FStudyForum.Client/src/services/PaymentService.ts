import { ResponseWith } from "@/types/response";
import api from "./api";
import { Donation, Payment, PaymentResponse } from "@/types/donate";

const getPayMentQR = async () => {
  const response = await api.get<ResponseWith<Payment>>("QRcode/generate");
  return response.data.data;
};
const generatePaymentUrl = async (payment: Payment) => {
  const response = await api.post<ResponseWith<Payment>>(
    "/Payment/generate-payment-url", payment
  );
  return response.data;
};
const paymentResponse= async(query: string) => {
  const response = await api.get<ResponseWith<PaymentResponse>>(`/Payment/payment-response${query}`);
  return response.data.data;
}
const saveUserDonate = async (donate: Donation) => {
  const response = await api.post<ResponseWith<Donation>>("/Payment/save-user-donate", donate);
  return response.data.data;
}
const PaymentService = {
  getPayMentQR,
  generatePaymentUrl,
  paymentResponse,
  saveUserDonate
};
export default PaymentService;
