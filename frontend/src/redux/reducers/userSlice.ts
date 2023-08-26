import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios';
import { AuthAPIResponse } from '../../utils/types/types';

type InitialState = {
    fullName: string | null;
    email: string | null;
    tier: "FREE" | "PRO";
    accessToken: string | null;
    signinError: string | null,
    signinLoading: boolean;
    signupError: string | null,
    signupLoading: boolean;
}

const initialState: InitialState = {
    fullName: null,
    email: null,
    tier: "FREE",
    accessToken: null,
    signinError: null,
    signinLoading: false,
    signupError: null,
    signupLoading: false
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
    },
    extraReducers: (builder) => {
        builder.addCase(userSignin.pending, (state) => {
            state.signinError = null;
            state.signinLoading = true;
        })
            .addCase(userSignin.fulfilled, (state, action: PayloadAction<AuthAPIResponse>) => {
                state.signinLoading = false;
                state.accessToken = action.payload.accessToken || null;
                state.fullName = action.payload.data.fullname || null;
                state.email = action.payload.data.email || null;
                state.tier = action.payload.data.tier || "FREE";
            })
            .addCase(userSignin.rejected, (state, action) => {
                state.signinLoading = false;
                state.signinError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(userSignup.pending, (state) => {
                state.signupError = null;
                state.signupLoading = true;
            })
            .addCase(userSignup.fulfilled, (state, action: PayloadAction<AuthAPIResponse>) => {
                state.signupLoading = false;
                state.accessToken = action.payload.accessToken || null;
                state.fullName = action.payload.data.fullname || null;
                state.email = action.payload.data.email || null;
                state.tier = action.payload.data.tier || "FREE";
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.signupLoading = false;
                state.signupError = action.error.message || 'Something went wrong, Try again';
            })
    },
})

export default userSlice.reducer
export const { signout } = userSlice.actions