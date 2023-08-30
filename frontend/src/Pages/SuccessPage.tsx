import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import pyamentProcessing from "../assets/images/credit-card-processing.gif"
import pyamentDone from "../assets/images/payment-done.gif"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHook";
import { axiosPrivate } from "../app/config/apiConfig";
import { verifyPayment } from "../redux/reducers/userSlice";
import { useNavigate, useParams } from "react-router-dom";

export const SuccessPage = () => {
  const { accessToken, verificationId, isPaymentVerified, verifyPaymentError, paymentSession } = useAppSelector(state => state.userReducer)
  const axiosInstance = axiosPrivate(accessToken)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    if (verificationId === id && paymentSession) {
      dispatch(verifyPayment({ axiosInstance, id: paymentSession.id }))
    } else {
      navigate("/user/home", {
        replace: true
      });
    }
  }, [])

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
            src={isPaymentVerified ? pyamentDone : pyamentProcessing}
            alt="Payment Section"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            {
              isPaymentVerified ? "Payment successfull" :
                verifyPaymentError ? "Payment failed" : "Payment Processing in Progress"
            }
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            {
              isPaymentVerified ? "Welcome to PRO tier! Enjoy seamless cloud access. Thank you for choosing our service!" :
                verifyPaymentError ? verifyPaymentError : " We are currently processing your payment. Please wait a moment while we finalize the transaction. Your patience is greatly appreciated."
            }</Typography>
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