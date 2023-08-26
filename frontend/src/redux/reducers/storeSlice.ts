import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios';
import { StoreApiResponse, Store } from '../../utils/types/types';

type InitialState = {
    store: Store;
    uploadError: string | null,
    uploadLoading: boolean;
    fetchError: string | null,
    fetchLoading: boolean;
}

const initialState: InitialState = {
    store: {
        _id: null,
        lastUpload: null,
        images: []
    },
    uploadError: null,
    uploadLoading: false,
    fetchError: null,
    fetchLoading: false
}

type PostOptions = {
    axiosInstance: AxiosInstance,
    files: File[]
}


export const fetchStore = createAsyncThunk('store/get', async (axiosInstance: AxiosInstance) => {
    const axios = axiosInstance;
    try {
        const response = await axios.get("/store");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const uploadToStore = createAsyncThunk('store/post', async (options: PostOptions) => {
    const axios = options.axiosInstance;
    const formData = new FormData();
    options.files.forEach((file) => {
        formData.append('images', file);
    });
    try {
        const response = await axios.post("/store/upload", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        console.log("response.data uploadToStore", response.data)
        return response.data;
    } catch (error: any) {
        console.log("error inside uploadToStore catch", error)
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStore.pending, (state) => {
            state.fetchError = null;
            state.fetchLoading = true;
        })
            .addCase(fetchStore.fulfilled, (state, action: PayloadAction<StoreApiResponse>) => {
                state.fetchLoading = false;
                state.store = action.payload.store
            })
            .addCase(fetchStore.rejected, (state, action) => {
                state.fetchLoading = false;
                state.fetchError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(uploadToStore.pending, (state) => {
                state.uploadError = null;
                state.uploadLoading = true;
            })
            .addCase(uploadToStore.fulfilled, (state, action: PayloadAction<StoreApiResponse>) => {
                state.uploadLoading = false;
                state.store = action.payload.store
            })
            .addCase(uploadToStore.rejected, (state, action) => {
                state.uploadLoading = false;
                state.uploadError = action.error.message || 'Something went wrong, Try again';
            })
    },
})

export default storeSlice.reducer