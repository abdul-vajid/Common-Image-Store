import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import bg from "../assets/images/landingImage.gif"
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate()
    const navigateToSignin = () => {
        navigate("/signin")
    }
    const navigateToSignup = () => {
        navigate("/signup")
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
            <div className="text-white w-screen flex flex-col items-center text-center p-8 md:mt-28">
                <Typography variant="h2" color="blue-gray" className='mb-4'>
                    Welcome to Common Image Store
                </Typography>
                <Typography variant="paragraph" color="black" className="text-lg mt-2 font-medium md:w-1/2 sm:w-4/5">
                    Welcome to our cloud store, where your images are securely stored and easily accessible from anywhere. Upload, organize, and share your memories with simplicity and peace of mind. Experience convenience and reliability like never before.
                </Typography>
                <div className="w-full md:w-2/6 flex gap-4 mt-5 md:mt-10">
                    <Button
                        className="flex items-center justify-center"
                        fullWidth
                        type='button'
                        onClick={navigateToSignup}
                    >
                        Sign up
                    </Button>
                    <Button
                        className="flex items-center justify-center"
                        fullWidth
                        type='button'
                        onClick={navigateToSignin}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
