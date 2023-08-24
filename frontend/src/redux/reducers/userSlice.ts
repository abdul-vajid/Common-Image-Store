import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios';


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


export const userSignin = createAsyncThunk('user/signin', async (axiosInstance: AxiosInstance) => {
    const axios = axiosInstance;
    try {
        const response = await axios.get("/signin");
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const userSignup = createAsyncThunk('user/signup', async (axiosInstance: AxiosInstance) => {
    const axios = axiosInstance;
    try {
        const response = await axios.get("/signup");
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signout: state => {
            state = initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userSignin.pending, (state) => {
            state.signinError = null;
            state.signinLoading = true;
        })
            .addCase(userSignin.fulfilled, (state, action: PayloadAction<Partial<typeof initialState>>) => {
                state.signinLoading = false;
                state.fullName = action.payload.fullName || null;
                state.email = action.payload.email || null;
                state.accessToken = action.payload.accessToken || null;
                state.tier = action.payload.tier || "FREE";
            })
            .addCase(userSignin.rejected, (state, action) => {
                state.signinLoading = false;
                state.signinError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(userSignup.pending, (state) => {
                state.signupError = null;
                state.signupLoading = true;
            })
            .addCase(userSignup.fulfilled, (state, action: PayloadAction<Partial<typeof initialState>>) => {
                state.signupLoading = false;
                state.fullName = action.payload.fullName || null;
                state.email = action.payload.email || null;
                state.accessToken = action.payload.accessToken || null;
                state.tier = action.payload.tier || "FREE";
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.signupLoading = false;
                state.signupError = action.error.message || 'Something went wrong, Try again';
            })
    },
})

export default userSlice.reducer
export const { signout } = userSlice.actions