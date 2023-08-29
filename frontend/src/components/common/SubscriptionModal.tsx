import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography
} from "@material-tailwind/react";
import { ProCard } from "./ProCard";
import { FreeCard } from "./FreeCard";

type SubscriptionModal = {
    handleOpen: () => void;
    open: boolean;
}

export const SubscriptionModal: React.FC<SubscriptionModal> = ({ handleOpen, open }) => {
    return (
        <>
            <Dialog size="lg" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between py-5 md:py-10">
                    <Typography variant="h5" className="inline-block md:hidden" color="blue-gray">
                        Our Subscription Plans
                    </Typography>
                    <Typography variant="h3" className="hidden md:flex pl-[30%]" color="blue-gray">
                        Our Subscription Plans
                    </Typography>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="flex flex-col md:flex-row justify-center md:justify-evenly pr-2">
                    <div className="mb-6">
                        <ProCard />
                    </div>
                    <div className="mb-6">
                        <FreeCard />
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}