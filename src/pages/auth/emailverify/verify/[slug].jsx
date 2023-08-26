import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';

const EmailVerify = () => {
  const [loading, setloading] = useState(true);
  const [errInfo, seterrinfo] = useState({ msg: '' });
  const router = useRouter();

  const verifyUser = async (slug) => {
    try {
      const response = await axios.post('https://haveal-backend.vercel.app/auth/verify/user', {
        slug: slug,
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      if (error.response) {
        
        seterrinfo({ msg: error.response.data.error });
      } else if (error.request) {
        seterrinfo({ msg: error.response.data.error });
      } else {
        seterrinfo({ msg: 'erro desconhecido na verificação' });
      }
    }
  };

  useEffect(() => {

    if (router.query.slug) {
      verifyUser(router.query.slug);
    }
  }, [router.query.slug]); 

  return (
    <>
      <div className='flex justify-center m-4 items-center'>
        {loading ? (
          <Spinner color='blue.600' size='md' />
        ) : (
          errInfo.msg !== '' ? (
            <div className='bg-red-100 border rounded-lg  border-red-200 p-4 my-2'>
              <p className='text-red-700'>{errInfo.msg}</p>
            </div>
          ) : (
            <div className='bg-blue-100 border rounded-lg  border-blue-200 p-4 my-2'>
              <p className='text-blue-700'>Conta verificada</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default EmailVerify;
