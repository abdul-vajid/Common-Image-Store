import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Card,
} from "@material-tailwind/react";

export const ImageCardWithModal = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <Card
                className="h-56 w-auto cursor-pointer object-cover object-center overflow-hidden transition-opacity hover:opacity-90"
                onClick={handleOpen}
            >
                <img
                    alt="nature"
                    className="h-full w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
                />
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
                                Date and time
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button color="green" size="sm">
                            Free Download
                        </Button>
                    </div>
                </DialogHeader>
                <DialogBody divider={true} className="p-0">
                    <img
                        alt="nature"
                        className="h-2/4 w-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
                    />
                </DialogBody>
                <DialogFooter>
                </DialogFooter>
            </Dialog>
        </>
    );
}