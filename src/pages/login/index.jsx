import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input, Button, ButtonGroup, Divider } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import Cookies from 'js-cookie';
import { Spinner } from '@chakra-ui/react'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter();
    const { page } = router.query;
    const [red, setred] = useState("")
    useEffect(() => {
        if(page == "buy"){
            setred("?page=buy")
        }else if(page == "perfil"){
            setred("?page=perfil")
        }else{
            setred("?page=perfil")
        }
    })
    
    if(Cookies.get('jwt')){
        if(page == "buy"){
            Router.push("/buy")
        }else if(page == "perfil"){
            Router.push("/perfil")
        }else{
            Router.push("/")
        }
        
    }
    const [ userInfo, setuserinfo ] = useState({ email: "", senha: "" })
    const [ errouser, seterrouser ] = useState({ msg: "" })
    const [ susse, setsusse ] = useState({ msg: "" })
    const [ loading, setloading ] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        const response = await axios.post(process.env.NEXT_PUBLIC_URL+'/login',{
            "email": userInfo.email,
            "senha": userInfo.senha
        }).then(function (response) {
            setloading(false)
            if (response.data.user.jwt){
                Cookies.set('jwt', response.data.user.jwt, { expires: 12 });
            }else{
                Cookies.set('jwt', response.data.user[0].jwt, { expires: 12 });
            }
            seterrouser({msg: ""})
            setsusse({msg: "Sucesso"})
            if(page == "buy"){
                router.push("/buy")
            }else if(page == "perfil"){
                router.push("/perfil")
            }else{
                router.push("/perfil")
            }
        }).catch(function (error) {
            setloading(false)
            if (error.response) {
                seterrouser({msg: error.response.data})
                setsusse({msg: ""})
            } else if (error.request) {
                seterrouser({msg: "erro na comunicação com o server, tente por outro metodo"})
                setsusse({msg: ""})
            } else if(error.response != undefined){
              seterrouser({msg: "erro na autenticacao, tente por outro metodo"})
              setsusse({msg: ""})
            }else{
                
            }
          });
    };
  return (
    <>
        <header className='p-4'>
            <div className='text-black'>
                <Link className='flex items-center' href={'/'}><Image src={"/logo 3.png"} width="50" height="50" alt="Logo Haveal"></Image><span className=' text-3xl'>Haveal</span></Link>
            </div>
        </header>
        <main>
            <div className='flex justify-center items-center'>
                <div className='lg:w-[40%] md:w-[60%] w-[90%] '>
                    <div className='flex justify-center items-center'>
                        <div>
                    {errouser.msg != "" &&(
                            <div className=' bg-red-100 boder rounded-lg border boder-gray-500 border-red-200 p-4 my-2'>
                                <p className='text-red-700' >{errouser.msg}</p>
                            </div>
                        )}
                        {susse.msg != "" &&(
                            <div className=' bg-blue-100 boder rounded-lg border boder-gray-500 border-blue-200 p-4 my-2'>
                                <p className='text-blue-700' >{susse.msg}</p>
                            </div>
                        )}
                        <div className=' bg-gray-50 boder rounded-lg border boder-gray-500 border-gray-200 p-4'>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <h1 className='text-black text-center text-3xl font-medium p-2'>Login</h1>
                                <Input onChange={({ target }) =>
                                 setuserinfo({ ...userInfo, email: target.value })} value={userInfo.email} required className="my-4 text-black" borderColor='gray.500'  _placeholder={{ opacity: 1, color: 'gray.500' }} type="email" placeholder="Email" size='lg'/>
                                <Input onChange={({ target }) =>
                                 setuserinfo({ ...userInfo, senha: target.value })} value={userInfo.senha} required className="my-4 text-black" borderColor='gray.500'  _placeholder={{ opacity: 1, color: 'gray.500' }} type="password" placeholder="Senha" size='lg'/>
                                <Button as="button" isDisabled={loading}  type="submit" className="w-full my-4" colorScheme='teal' size='lg'>
                                {loading ? (
                                    <Spinner size='md' />
                                    ) : (
                                    "Entrar"
                                )}
                                </Button>
                            </form>
                        </div>
                        </div>
                    </div>
                    <div className='flex p-4 items-center'>
                        <div className='border-b border-gray-500 w-full'></div>
                            <h1 className='text-black mx-2'>OU</h1>
                        <div className='border-b border-gray-500 w-full'></div>
                    </div>
                    {/*login com o google*/}
                    <p className='text-black text-center m-4'>Não tem uma conta? Então <Link className=' text-sky-700 ' href={"/register"+red}>Registre-se</Link></p>
                </div>
            </div>
        </main>
    </>
  )
}
export default Login

