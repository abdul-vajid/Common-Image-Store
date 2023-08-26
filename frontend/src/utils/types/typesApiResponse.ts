type Data = {
    email: string,
    fullname: string,
    tier: "FREE" | "PRO"
}

export type AuthAPIResponse = {
    success: boolean,
    message: string,
    accessToken: string,
    data: Data
}