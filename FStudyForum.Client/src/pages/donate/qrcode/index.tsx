import { cn } from "@/helpers/utils";
import { useAuth } from "@/hooks/useAuth";
import PaymentService from "@/services/PaymentService";
import { Donation } from "@/types/donate";
import { Alert, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface TransactionState {
  amountByUser: string;
  addInfoByUser: string;
}
const QRCodeLink = () => {
  const location = useLocation();
  const state = location.state as TransactionState;
  const [error, setError] = React.useState("");
  const [donate, setDonate] = React.useState<Donation | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["qr-code-url"],
    queryFn: async () => {
      const response = await PaymentService.generateQRUrl(
        state.amountByUser,
        state.addInfoByUser
      );
      return response;
    }
  });
  React.useEffect(() => {
    const paymentResponse = async () => {
      try {
        const result = await PaymentService.paymentResponseQR(
          import.meta.env.VTTE_API_DONATION_URL,
          import.meta.env.VITE_API_DONATION_KEY
        );

        let lastRecord = null;
        if (result.records.length > 0) {
          lastRecord = result.records[result.records.length - 1];
        }
        const isExist = await PaymentService.isExistTid(`${lastRecord?.tid}`);
        if (isExist) {
          const response = await PaymentService.saveUserDonate({
            username: user?.username || "",
            amount: lastRecord?.amount || 0,
            message: lastRecord?.description || "",
            tid: lastRecord?.tid || ""
          });
          setDonate(response);
        }
      } catch (e) {
        const error = e as AxiosError;
        setError(
          (error?.response?.data as { message: string })?.message ||
            error.message
        );
      }
    };
    const intervalId = setInterval(paymentResponse, 50000);
    return () => clearInterval(intervalId);
  }, [user?.username]);
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (donate !== null) {
    navigate("/donate/transaction", { state: { donate } });
  }
  if (isLoading) {
    return <Spinner className="w-4 h-4 mx-auto" />;
  }
  return (
    <div>
      <div className="flex gap-[10%]">
        <div className={cn("w-[60%]")}>
          <h2 className={cn("font-bold mt-[5%]", "mx-auto")}>
            HOẶC QUÉT MÃ QR SAU ĐỂ TỰ ĐỘNG ĐIỀN THÔNG TIN
          </h2>
          <img className="mt-[5%]" src={data?.data.qrDataURL} alt="not found" />
        </div>
        <div className="w-full mx-auto bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Tài khoản tiếp nhận nạp</h2>
          <div className="mb-2">
            <span className="text-gray-600">Chủ tài khoản</span>
            <div className="text-xl text-red-600 font-bold">
              LE NHAT MINH KHOI
            </div>
          </div>
          <div className="mb-2">
            <span className="text-gray-600">Số tài khoản</span>
            <div className="text-xl text-red-600 font-bold">50041234567890</div>
          </div>
          <div className="mb-2">
            <span className="text-gray-600">Ngân hàng</span>
            <div className="text-xl text-blue-500 font-bold">MB Bank</div>
          </div>
        </div>
      </div>
      <Alert className="mt-[5%]" color="blue">
        Sau khi chuyển tiền thành công, vui lòng chờ ít nhất 1 phút để hệ thống
        xử lý.
      </Alert>
    </div>
  );
};
export default QRCodeLink;
