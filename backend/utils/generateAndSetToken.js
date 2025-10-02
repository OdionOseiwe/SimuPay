import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign(
        { userId },                    // payload
        process.env.JWT_SECRET,        // secret key
        { expiresIn: "1d" }            // token lifetime
    );

    res.cookie("user-token", token, {
        httpOnly: true,                 // protect from XSS
        secure: true,
        sameSite: "strict",             // protect from CSRF
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
    });
    return token;
}
