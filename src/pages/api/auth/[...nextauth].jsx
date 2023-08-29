import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios";
import Cookies from 'js-cookie';

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
                    Cookies.set('jwt', response.data.jwt, { expires: 30 });
                    return user;
                } else {
                    return null;
                }
                
            
        },
    },
});
