type User = {
    email: string,
    fullname: string,
    tier: "FREE" | "PRO"
    tierExpires: Date | null
}

export type Store = {
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
    data: User
}

export type StoreApiResponse = {
    success: boolean,
    message: string,
    store: Store
}

export type UserApiResponse = {
    success: boolean,
    message: string,
    user: User
}

export type SubApiResponse = {
    success: boolean,
    message: string,
    data: {
        session: any
        verificationId: string
    }
}