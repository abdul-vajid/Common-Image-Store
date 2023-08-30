import React, { useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Spinner,
} from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/storeHook";
import { setIsJustUnsubedFalse, unsubscribe } from "../../redux/reducers/userSlice";
import { axiosPrivate } from "../../app/config/apiConfig";
import { useErrorToast, useSuccessToast } from "../../app/hooks/toastHooks";

type TierSwitchAlert = {
    handleOpen: () => void
    open: boolean
}

export const TierSwitchAlert: React.FC<TierSwitchAlert> = ({ handleOpen, open }) => {
    const dispatch = useAppDispatch()
    const { accessToken } = useAppSelector(state => state.userReducer)
    const { unsubLoading, unsubError, isJustUnsubed } = useAppSelector(state => state.userReducer)
    const axiosInstance = axiosPrivate(accessToken)

    const handleUnsubscribe = () => {
        dispatch(unsubscribe(axiosInstance))
    }

    useEffect(() => {
        if (unsubError) useErrorToast({ message: unsubError ? unsubError : "Something went wrong. Try again later" })
    }, [unsubError])

    useEffect(() => {
        if (isJustUnsubed) {
            handleOpen()
            dispatch(setIsJustUnsubedFalse())
            useSuccessToast({ message: "You have unsubscribed from the Pro Tier access." })
        }
    }, [isJustUnsubed])

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    <Typography variant="h5" color="blue-gray">
                        Your Attention is Required!
                    </Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-16 w-16 text-red-500"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <Typography color="red" variant="h4" className="text-center">
                        Switch to Free Tier Confirmation!
                    </Typography>
                    <Typography className="text-center font-normal">
                        You're on the Pro tier. Switching to Free tier reduces image upload limits and access to certain features.
                    </Typography>
                    <Typography className="text-center font-normal">
                        Proceed to Free tier? click OK. If you have any concerns, you can cancel this action.
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={handleOpen}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleUnsubscribe}>
                        {
                            unsubLoading ? <Spinner></Spinner> :
                                "Ok, Got it"
                        }
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}