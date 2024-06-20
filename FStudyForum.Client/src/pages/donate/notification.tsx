import {
  Alert,
  Button,
  Card
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";

const Notification = () => {
  const location = useLocation();
  const { paymentResponse } = location.state || {};
  return (
    <>
      <div>
        {paymentResponse ? (
          <div>
            <Alert color="green">Payment Success.</Alert>
          </div>
        ) : (
          <Alert color="red">No payment data available.</Alert>
        )}
      </div>
      <Card color="transparent" shadow={false}>
        <Link to="/home">
        <Button className="mt-6" fullWidth >
          OK
        </Button>
        </Link>
      </Card>
    </>
  );
};
export default Notification;
