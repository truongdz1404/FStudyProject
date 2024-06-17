import ContentLayout from "@/components/layout/ContentLayout";
import PaymentService from "@/services/PaymentService";
import { useEffect, useState } from "react";
import WebSocketComponent from "../websocket";

const Post = () => {
  const[qrcode, setQrcode] = useState<string>("");
  useEffect(() => {
    const getPaymentQR = async () => {
      const payment = await PaymentService.getPayMentQR();
      setQrcode(payment.data.qrCode);
    };
    getPaymentQR();
  }, []);
  return (
    <ContentLayout>
      <img src={qrcode} alt="QR Code" />
      <h1 className="cursor-pointer text-orange-500">
        Post
      </h1>
      <WebSocketComponent />
    </ContentLayout>
  );
};
export default Post;
