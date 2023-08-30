import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios';
import { AuthAPIResponse, SubApiResponse, UserApiResponse } from '../../utils/types/types';

type InitialState = {
    fullName: string | null;
    email: string | null;
    tier: "FREE" | "PRO";
    tierExpires: Date | null
    accessToken: string | null;
    signinError: string | null,
    signinLoading: boolean;
    signupError: string | null;
    signupLoading: boolean;
    isJustSign: boolean;
    unsubError: string | null,
    unsubLoading: boolean;
    isJustUnsubed: boolean;
    subError: string | null,
    subLoading: boolean;
    isJustSubed: boolean;
    verifyPaymentError: string | null,
    verifyPaymentLoading: boolean;
    isPaymentVerified: boolean;
    paymentSession: any;
    verificationId: string | null;
}

const initialState: InitialState = {
    fullName: null,
    email: null,
    tier: "FREE",
    tierExpires: null,
    accessToken: null,
    signinError: null,
    signinLoading: false,
    signupError: null,
    signupLoading: false,
    isJustSign: false,
    unsubError: null,
    unsubLoading: false,
    isJustUnsubed: false,
    subError: null,
    subLoading: false,
    isJustSubed: false,
    verifyPaymentError: null,
    verifyPaymentLoading: false,
    isPaymentVerified: false,
    paymentSession: null,
    verificationId: null
}

type SigninOptions = {
    axiosInstance: AxiosInstance,
    email: string,
    password: string
}

type SignupOptions = {
    axiosInstance: AxiosInstance,
    fullname: string,
    email: string,
    password: string
}

type TierOptions = {
    axiosInstance: AxiosInstance,
    id: string
}


export const userSignin = createAsyncThunk('user/signin', async (options: SigninOptions) => {
    const axios = options.axiosInstance;
    try {
        const response = await axios.post("/auth/signin", { email: options.email, password: options.password });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const userSignup = createAsyncThunk('user/signup', async (options: SignupOptions) => {
    const axios = options.axiosInstance;
    try {
        const response = await axios.post("/auth/signup", {
            email: options.email,
            fullname: options.fullname,
            password: options.password
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const unsubscribe = createAsyncThunk('tier/unsubscribe', async (axiosInstance: AxiosInstance) => {
    const axios = axiosInstance;
    try {
        const response = await axios.put("/subscription");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
});

export const subscribe = createAsyncThunk('tier/subscribe', async (options: TierOptions) => {
    const axios = options.axiosInstance;
    try {
        const response = await axios.post("/subscription", {
            priceId: options.id
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
});

export const verifyPayment = createAsyncThunk('payment/verify', async (options: TierOptions) => {
    const axios = options.axiosInstance;
    try {
        const response = await axios.post("/subscription/verify-payment", {
            sessionId: options.id
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signout: state => {
            state.accessToken = null;
            state.email = null;
            state.fullName = null;
            state.tier = "FREE"
        },
        setIsJustSignFalse: state => {
            state.isJustSign = false;
        },
        setIsJustUnsubedFalse: state => {
            state.isJustUnsubed = false;
        },
        setIsJustSubedFalse: state => {
            state.isJustSubed = false;
        },
        setAllErrorsEmpty: state => {
            state.subError = null
            state.unsubError = null
            state.signinError = null
            state.signupError = null
            state.verifyPaymentError = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userSignin.pending, (state) => {
            state.signinError = null;
            state.signinLoading = true;
            state.isJustSign = false;
        })
            .addCase(userSignin.fulfilled, (state, action: PayloadAction<AuthAPIResponse>) => {
                state.signinLoading = false;
                state.isJustSign = true;
                state.accessToken = action.payload.accessToken || null;
                state.fullName = action.payload.data.fullname || null;
                state.email = action.payload.data.email || null;
                state.tier = action.payload.data.tier || "FREE";
            })
            .addCase(userSignin.rejected, (state, action) => {
                state.isJustSign = false;
                state.signinLoading = false;
                state.signinError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(userSignup.pending, (state) => {
                state.isJustSign = false;
                state.signupError = null;
                state.signupLoading = true;
            })
            .addCase(userSignup.fulfilled, (state, action: PayloadAction<AuthAPIResponse>) => {
                state.isJustSign = true;
                state.signupLoading = false;
                state.accessToken = action.payload.accessToken || null;
                state.fullName = action.payload.data.fullname || null;
                state.email = action.payload.data.email || null;
                state.tier = action.payload.data.tier || "FREE";
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.signupLoading = false;
                state.isJustSign = false;
                state.signupError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(unsubscribe.pending, (state) => {
                state.unsubError = null;
                state.unsubLoading = true;
                state.isJustUnsubed = false;
            })
            .addCase(unsubscribe.fulfilled, (state, action: PayloadAction<UserApiResponse>) => {
                state.unsubLoading = false;
                state.isJustUnsubed = true;
                state.fullName = action.payload.user.fullname
                state.email = action.payload.user.email
                state.tier = action.payload.user.tier
                state.tierExpires = action.payload.user.tierExpires
            })
            .addCase(unsubscribe.rejected, (state, action) => {
                state.unsubLoading = false;
                state.isJustUnsubed = false;
                state.unsubError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(subscribe.pending, (state) => {
                state.subError = null;
                state.subLoading = true;
                state.isJustSubed = false;
                state.paymentSession = null;
                state.verificationId = null;
            })
            .addCase(subscribe.fulfilled, (state, action: PayloadAction<SubApiResponse>) => {
                state.isJustSubed = true;
                state.subLoading = false;
                state.paymentSession = action.payload.data.session;
                state.verificationId = action.payload.data.verificationId;
            })
            .addCase(subscribe.rejected, (state, action) => {
                state.subLoading = false;
                state.isJustSubed = false;
                state.subError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(verifyPayment.pending, (state) => {
                state.verifyPaymentError = null;
                state.verifyPaymentLoading = true;
                state.isPaymentVerified = false;
            })
            .addCase(verifyPayment.fulfilled, (state, action: PayloadAction<UserApiResponse>) => {
                state.isPaymentVerified = true;
                state.verifyPaymentLoading = false;
                state.paymentSession = null
                state.verificationId = null
                state.paymentSession = null;
                state.verificationId = null;
                state.fullName = action.payload.user.fullname
                state.email = action.payload.user.email
                state.tier = action.payload.user.tier
                state.tierExpires = action.payload.user.tierExpires
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.paymentSession = null;
                state.verificationId = null;
                state.verifyPaymentLoading = false;
                state.isPaymentVerified = false;
                state.verifyPaymentError = action.error.message || 'Something went wrong, Try again';
            });

    },
})

export default userSlice.reducer
export const { signout, setIsJustSignFalse, setIsJustSubedFalse, setIsJustUnsubedFalse, setAllErrorsEmpty } = userSlice.actions