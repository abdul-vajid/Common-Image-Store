import React, { useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input
} from "@material-tailwind/react";
import { useAppSelector } from "../../app/hooks/storeHook";

type UploadModal = {
    handleOpen: () => void;
    open: boolean;
}

export const UploadModal: React.FC<UploadModal> = ({ handleOpen, open }) => {
    const [imageData, setImageData] = useState<string[] | null>(null);
    const { tier } = useAppSelector(state => state.userReducer)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImageData((prevImageData) => {
                        const newImageData = [e.target?.result as string, ...(prevImageData || [])];
                        return newImageData;
                    });
                    //   handleImageUpload(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };




    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        color={
                            tier === "PRO" ? "deep-purple" : "gray"
                        }
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            {
                                tier === "PRO" ? "PRO Tier Feature" : "You're on FREE tier"
                            }
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-row overflow-x-scroll gap-4">
                        {
                            imageData ? imageData.map((image, index) => (
                                <img key={index}
                                    className="h-auto w-2/6 rounded-lg object-cover object-center shadow-sm shadow-blue-gray-900/50"
                                    src={image}
                                    alt="nature image"
                                />)) : <Typography variant="h5" color="gray">
                                No files chosen
                            </Typography>

                        }
                    </CardBody>
                    <CardFooter className="pt-0 flex flex-col gap-5">
                        <Input label="Image" onChange={handleFileChange} type="file" size="lg" crossOrigin={undefined} />
                        <Button variant="gradient"
                            color={
                                tier === "PRO" ? "deep-purple" : "gray"
                            }
                            className="flex justify-center items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                            </svg>
                            Upload Files
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}