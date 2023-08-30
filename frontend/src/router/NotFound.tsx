import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import notfound from "../assets/images/404err.gif"
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };
  
    return (
        <div className="flex justify-center mt-16">
            <Card className="max-w-[24rem] overflow-hidden">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none"
                >
                    <img
                        src={notfound}
                        alt="404"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h4" color="blue-gray">
                        Page Not Found
                    </Typography>
                    <Typography variant="lead" color="gray" className="mt-3 font-normal">
                        We apologize, but the page you are looking for could not be found.
                    </Typography>
                </CardBody>
                <CardFooter className="flex items-center justify-end">
                    <Button
                        className="flex items-center justify-center"
                        fullWidth
                        type='button'
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}