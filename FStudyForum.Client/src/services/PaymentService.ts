import { ResponseWith } from "@/types/response";
import api from "./api";
import { ApiResponse, Donation, Payment, QRCode } from "@/types/donate";
import axios from "axios";


const generatePaymentUrl = async (payment: Payment) => {
  const response = await api.post<ResponseWith<Payment>>(
    "/Payment/generate-payment-url", payment
  );
  return response.data;
};
const isExistTid = async (tid: string) => {
  const response = await api.get<ResponseWith<boolean>>(`/donate/isExistTid/${tid}`);
  return response.data.data;
}
const saveUserDonate = async (donate: Donation) => {
  const response = await api.post<ResponseWith<Donation>>("/donate/save-user-donate", donate);
  return response.data.data;
}
const generateQRUrl = async (amountByUser: string, addInfoByUser:string) => {
  const response = await api.get<ResponseWith<QRCode>>(`/donate/generate/${amountByUser}/${addInfoByUser}`);
  return response.data;
}
const paymentResponseQR = async (apiGet: string, apiKey: string) => {
  const response = await axios.get<ResponseWith<ApiResponse>>(apiGet, {
    headers: {
      Authorization: `apikey ${apiKey}`,
      "Content-Type": "application/json"
    }
  });
  return response.data.data
}
const PaymentService = {
  generatePaymentUrl,
  saveUserDonate,
  generateQRUrl,
  paymentResponseQR,
  isExistTid
};
export default PaymentService;
