import { cn } from "@/helpers/utils";
import { useAuth } from "@/hooks/useAuth";
import PaymentService from "@/services/PaymentService";
import { CreateDonation } from "@/types/donate";
import { Alert, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface TransactionState {
  amountByUser: string;
  addInfoByUser: string;
  amount: number;
  id: number;
  message: string;
}

const QRCodeLink = () => {
  const location = useLocation();
  const state = location.state as TransactionState;
  const [donate, setDonate] = useState<CreateDonation | null>(null);
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

  useEffect(() => {
    const paymentResponse = async () => {
      try {
        const result = await PaymentService.paymentResponseQR(
          import.meta.env.VTTE_API_DONATION_URL,
          import.meta.env.VITE_API_DONATION_KEY
        );
        const isDonate = await PaymentService.checkDonate(
          state.id,
          `${user?.username}`,
          state.message,
          state.amount
        );
        if (isDonate) {
          result.records.forEach(async record => {
            if (record?.description.split(" ")[0] === state.addInfoByUser) {
              const response = await PaymentService.updateDonate(
                {
                  username: `${user?.username}`,
                  amount: record?.amount || 0,
                  message: `${record?.description}`,
                  tid: `${record?.tid}`
                },
                state.id
              );
              setDonate(response);
            }
          });
        }
      } catch (e) {
        const error = e as AxiosError;
        console.error(
          (error?.response?.data as { message: string })?.message ||
            error.message
        );
      }
    };

    const intervalId = setInterval(paymentResponse, 5000);
    return () => clearInterval(intervalId);
  }, [
    state.id,
    state.addInfoByUser,
    state.amount,
    user?.username,
    state.message
  ]);

  useEffect(() => {
    if (donate !== null) {
      navigate("/donate/transaction", { state: { donate } });
    }
  }, [donate, navigate]);

  if (isLoading) {
    return <Spinner className="w-4 h-4 mx-auto" />;
  }

  return (
    <div>
      <div className="flex gap-[10%]">
        <div className={cn("w-[60%]")}>
          <h2 className={cn("font-semibold mt-[5%]", "mx-auto")}>
            HOẶC QUÉT MÃ QR SAU ĐỂ TỰ ĐỘNG ĐIỀN THÔNG TIN
          </h2>
          <img className="mt-[5%]" src={data?.data.qrDataURL} alt="not found" />
        </div>
        <div className="max-w-sm mx-auto bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Tài khoản tiếp nhận nạp FSTUDY
          </h2>
          <div className="mb-2">
            <span className="text-gray-600">Chủ tài khoản</span>
            <div className="text-2xl text-red-600 font-semibold">
              LE NHAT MINH KHOI
            </div>
          </div>
          <div className="mb-2">
            <span className="text-gray-600">Số tài khoản</span>
            <div className="text-2xl text-red-600 font-semibold">
              50041234567890
            </div>
          </div>
          <div className="mb-2">
            <span className="text-gray-600">Ngân hàng</span>
            <div className="text-2xl text-blue-500 font-semibold">MB Bank</div>
          </div>
          <div className="mb-2">
            <span className="text-gray-600">Nội dung</span>
            <div className="text-2xl text-blue-500 font-semibold">
              {state.addInfoByUser}
            </div>
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
