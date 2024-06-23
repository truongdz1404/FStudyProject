import { useAuth } from "@/hooks/useAuth";
import PaymentService from "@/services/PaymentService";
import { AxiosError } from "axios";
import { Navigate, useLocation } from 'react-router-dom';
import { PaymentResponse } from "@/types/donate";
import React from "react";

const Payment = () => {
    const { user } = useAuth();
    const [error, setError] = React.useState("");
    const location = useLocation();
    const [paymentResponse, setPaymentResponse] = React.useState<PaymentResponse | null>(null);    
    React.useEffect(() => {
        const fetchPaymentResponse = async () => {
          const query = location.search;
          if (query) {
            try {
              const response = await PaymentService.paymentResponse(query);
              await PaymentService.saveUserDonate({
                username: user?.username || '',
                amount: response.amount || 0,
                message: response.orderDescription || ''
              })
                setPaymentResponse(response);              
            } catch (e) {
              const error = e as AxiosError;
              setError((error?.response?.data as { message: string })?.message || error.message);
            }
          }
        };
        fetchPaymentResponse();
      }, [location.search]);
      if(error) {
        return <div className="text-red-500">{error}</div>;
      }
      if (paymentResponse != null) {
        return <Navigate to="/donate/success" state={{ paymentResponse }} />;
    }
    return (
      <>
      </>
    )
}
export default Payment;