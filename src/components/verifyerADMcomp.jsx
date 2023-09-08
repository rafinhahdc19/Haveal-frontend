import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthVerifyadmcomp = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const token = Cookies.get('jwt');

    useEffect(() => {
        const req = async (token) => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_URL+'/getuseradm/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setIsVerified(true);
                } else {
                    setIsVerified(false);
                }
            } catch (error) {
                setIsVerified(false);
            }
        }

        if (token) {
            req(token);
        } else {
            setIsVerified(false);
        }
    }, []);
    
    return isVerified ? children : null;
};

export default AuthVerifyadmcomp;
