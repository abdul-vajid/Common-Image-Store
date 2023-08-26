import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const CheckIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3 w-3"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
    );
}

export const ProCard: React.FC = () => {
    return (
        <Card color="deep-purple" variant="gradient" className="w-full max-w-[20rem] px-8 pt-5 pb-4 md:px-8 md:pt-8 md:pb-8">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-4 md:mb-8 rounded-none border-b border-white/10 pb-4 md:pb-8 md:text-center flex md:inline-block justify-between md:justify-center"
            >
                <Typography
                    variant="lead"
                    color="white"
                    className="font-normal uppercase hidden md:inline-block"
                >
                    PRO TIER
                </Typography>
                <Typography
                    variant="small"
                    color="white"
                    className="font-normal uppercase inline-block md:hidden"
                >
                    PRO TIER
                </Typography>
                <Typography
                    variant="h1"
                    color="white"
                    className="mt-0 md:mt-6 flex justify-center gap-1 text-3xl md:text-7xl font-normal"
                >
                    <span className="mt-2 text-xl md:text-4xl">$</span>5{" "}
                    <span className="self-end text-xl md:text-4xl">/mo</span>
                </Typography>
            </CardHeader>
            <CardBody className="p-0">
                <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">Upload multiple images</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">No time based limits</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">Unlimited Storage</Typography>
                    </li>
                </ul>
            </CardBody>
            <CardFooter className="mt-6 md:mt-12 p-0">
                <Button
                    size="lg"
                    color="white"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    ripple={false}
                    fullWidth={true}
                >
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    );
}