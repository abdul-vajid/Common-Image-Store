type Data = {
    email: string,
    fullname: string,
    tier: "FREE" | "PRO"
}

export type Store ={
    images: Image[],
    lastUpload: Date | null,
    _id: String | null
}

export type Image = {
    url: string,
    public_id: string,
    signature: string,
}

export type AuthAPIResponse = {
    success: boolean,
    message: string,
    accessToken: string,
    data: Data
}

export type StoreApiResponse = {
    success: boolean,
    message: string,
    store: Store
}