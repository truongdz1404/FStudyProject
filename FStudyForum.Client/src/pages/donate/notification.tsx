import { Button, Card } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import Thumbnail from "@/assets/images/check.png";
import Error from "@/assets/images/close.png";
import { cn } from "@/helpers/utils";
import { ArrowLeft } from "lucide-react";
const Notification = () => {
  const location = useLocation();
  const { paymentResponse } = location.state || {};
  const formatToVND = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };
  return (
    <>
      <div>
        {paymentResponse && Number(paymentResponse.vnPayResponseCode) !== 24 ? (
          <div>
            <img src={Thumbnail} alt="payment" className="w-[20%] ml-[55%]" />
            <div className={cn("font-bold", "ml-[50%]", "mt-[5%]")}>
              Thank You Very Much!
            </div>
            <div className={cn("ml-[35%]")}>
              You have just successfully amount:{" "}
              {formatToVND(paymentResponse.amount)}
            </div>
          </div>
        ) : (
          <div>
            <img src={Error} alt="payment" className="w-[20%] ml-[54%]" />
            <div className={cn("font-bold", "ml-[54%]", "mt-[5%]")}>
              Payment error!
            </div>
            <div className={cn("ml-[43%]")}>
              Payment failed. Please try again!
            </div>
          </div>
        )}
      </div>

      <Card color="transparent" shadow={false}>
        <Link to="/home">
          <Button className="mt-6 ml-[56%] bg-orange-500 w-[15%]" fullWidth>
            OK
          </Button>
        </Link>
      </Card>
    </>
  );
};
export default Notification;
