import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Card,
} from "@material-tailwind/react";

type ImageCardWithModal = {
    imageUrl: string,
    fileName: string
}

export const ImageCardWithModal: React.FC<ImageCardWithModal> = ({ imageUrl, fileName }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <>
            <Card
                className="h-56 w-auto cursor-pointer object-cover object-center overflow-hidden transition-opacity hover:opacity-90"
                onClick={handleOpen}
            >
                <img
                    alt="nature"
                    className="h-full w-full object-cover object-center"
                    src={imageUrl} />
            </Card>
            <Dialog size="lg" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    <div className="flex items-center gap-3">
                        <div className="-mt-px flex flex-col">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                            >
                                Uploaded by you
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button color="green" onClick={handleDownload} size="sm">
                            Free Download
                        </Button>
                    </div>
                </DialogHeader>
                <DialogBody divider={true} className="p-0">
                    <img
                        alt="nature"
                        className="h-2/4 w-full object-cover object-center"
                        src={imageUrl}
                    />
                </DialogBody>
                <DialogFooter>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-light"
                    >
                        Common Image Store ©️
                    </Typography>
                </DialogFooter>
            </Dialog>
        </>
    );
}