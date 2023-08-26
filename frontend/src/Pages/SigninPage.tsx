import React, { useEffect } from 'react'
import grid from "../assets/images/grid.jpg"
import {
    Card,
    Input,
    Button,
    Typography,
    Spinner
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import { signinSchema } from '../utils/validations/signinSchema';
import { useAppDispatch, useAppSelector } from '../app/hooks/storeHook';
import { userSignin } from '../redux/reducers/userSlice';
import axiosInstance from '../app/config/apiConfig';
import { useErrorToast } from '../app/hooks/toastHooks';

export const SigninPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { signinError, signinLoading } = useAppSelector(state => state.userReducer)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        validationSchema: signinSchema,

        onSubmit: (values) => {
            dispatch(userSignin({
                axiosInstance,
                email: values.email,
                password: values.password
            }))
        },
    })

    useEffect(() => {
        if (signinError) useErrorToast({ message: signinError })
    }, [signinError])

    return (
        <div>
            <div className='absolute h-full w-full flex flex-row gap-5 bg-white'>
                <div className='h-full w-2/5 hidden md:flex justify-end pl-24 items-center text-center'>
                    <img src={grid} alt="Grid View" className='h-2/4' />
                </div>
                <div className='h-full w-full md:w-3/5 flex justify-center items-center'>
                    <Card color="transparent" shadow={false} className=''>
                        <Typography variant="h4" color="blue-gray">
                            Sign In
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Enter your details to sign in.
                        </Typography>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col gap-6">
                                <div>
                                    <Input
                                        size="lg"
                                        label="Email"
                                        name='email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        crossOrigin={undefined}
                                    />
                                    {
                                        formik.errors.email && <Typography
                                            variant="small"
                                            color="gray"
                                            className="mt-4 flex items-center gap-1 font-normal"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="-mt-px h-4 w-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {formik.errors.email || "Invalid email"}
                                        </Typography>
                                    }
                                </div>
                                <div>
                                    <Input
                                        size="lg"
                                        label="Password"
                                        name='password'
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        crossOrigin={undefined}
                                    />
                                    {
                                        formik.errors.password && <Typography
                                            variant="small"
                                            color="gray"
                                            className="mt-4 flex items-center gap-1 font-normal"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="-mt-px h-4 w-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {formik.errors.password || "Invalid password"}
                                        </Typography>
                                    }
                                </div>
                            </div>
                            <Button
                                className="mt-6 flex items-center gap-5 justify-center"
                                fullWidth
                                type='button'
                                onClick={formik.submitForm}
                            >
                                {signinLoading ?
                                    <Spinner></Spinner> :
                                    "Sign In"}
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                <Link to={"/signup"}>
                                    Don't have an account?{" "}
                                    <span className="font-medium text-gray-900">
                                        Sign Up
                                    </span>
                                </Link>
                            </Typography>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}