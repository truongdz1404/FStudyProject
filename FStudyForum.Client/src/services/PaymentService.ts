import { ResponseWith } from "@/types/response";
import api from "./api";
import { ApiResponse, CreateDonation, Donation, Payment, QRCode, UpdateDonation } from "@/types/donate";
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
const saveUserDonate = async (donate: CreateDonation) => {
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
const getDonateByUser = async (username: string) => {
  const response = await api.get<ResponseWith<Donation>>(`/donate/getDonateByUsername/${username}`)
  return response.data.data
}
const checkDonate = async (id: number, username: string, message: string, amount: number) => {
  const response = await api.get<ResponseWith<boolean>>(`/donate/checkDonate/${id}/${username}/${message}/${amount}`);
  return response.data.data;
}
const updateDonate = async (donate: UpdateDonation, id: number) => {
  const response = await api.put<ResponseWith<Donation>>(`/donate/updateDonate/${id}`, donate);
  return response.data.data;
}
const PaymentService = {
  generatePaymentUrl,
  saveUserDonate,
  generateQRUrl,
  paymentResponseQR,
  isExistTid,
  getDonateByUser,
  checkDonate,
  updateDonate
};
export default PaymentService;
