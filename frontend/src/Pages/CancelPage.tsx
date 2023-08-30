import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import paymentCancel from "../assets/images/failed.gif"
import { useNavigate } from "react-router-dom";

export const CancelPage = () => {
  const navigate = useNavigate()
  
  const navigateToHome = () => {
    navigate("/user/home", {
      replace: true
    });
  }

  return (
    <div className="flex justify-center mt-20">
      <Card className="max-w-[24rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={paymentCancel}
            alt="Payment Section"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            Payment Processing in Progress
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            We are currently processing your payment. Please wait a moment while we finalize the transaction. Your patience is greatly appreciated.
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-end">
          <Button
            className="flex items-center justify-center"
            fullWidth
            type='button'
            onClick={navigateToHome}
          >
            Back to store
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}