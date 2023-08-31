import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import axios from "axios";
import Cookies from "js-cookie";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENTIDGOOGLE,
            clientSecret: process.env.CLIENTSECRETIDGOOGLE,
        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
    },
});
