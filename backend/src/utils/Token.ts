import JWT, { SignOptions, VerifyOptions } from "jsonwebtoken";

interface TokenPayload {
    email: string;
    _id: string;
}

interface TokenDependencies {
    secret: string;
    signOptions?: SignOptions;
    verifyOptions?: VerifyOptions;
}

export class Token {
    private dependencies: TokenDependencies;

    constructor(dependencies: TokenDependencies) {
        this.dependencies = dependencies;
    }

    generate = (payload: TokenPayload) => {
        const token = JWT.sign(payload, this.dependencies.secret, {
            ...this.dependencies.signOptions,
        });

        return token;
    };

    verify = (token: string) => {
        try {
            const decoded = JWT.verify(token, this.dependencies.secret, {
                ...this.dependencies.verifyOptions,
            }) as TokenPayload;

            return decoded;
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new Error("Token has expired");
            } else if (error.name === "JsonWebTokenError") {
                throw new Error("Invalid token");
            } else {
                throw error;
            }
        }
    };
}
