import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import axios from "axios";
import { setCookie } from "nookies";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENTIDGOOGLE,
            clientSecret: process.env.CLIENTSECRETIDGOOGLE,
        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials, res }) {
            const response = await axios.post('https://haveal-backend.vercel.app/login/provider', {
                "nome": user.name,
                "email": user.email
            });
            if (response.data.user[0].jwt && response.data.user[0].nome && response.data.user[0].email) {
                user = {
                    id: response.data.user[0].id,
                    name: response.data.user[0].nome,
                    email: response.data.user[0].email,
                    jwt: response.data.user[0].jwt
                };
                setCookie({ res }, "jwt", JSON.stringify(user), {
                    maxAge: 2 * 24 * 60 * 60,
                    path: "/",
                    httpOnly: true,
                });
                return user;
            } else {
                return null;
            }
        },
    },
});
