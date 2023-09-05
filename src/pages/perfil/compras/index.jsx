import Navbar from "@/components/navbar"
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Spinner,
    Input
  } from '@chakra-ui/react'
  import Link from "next/link"

  import { useDisclosure } from "@chakra-ui/react"
  import { useEffect, useRef, useState } from "react"
import AuthVerify from "@/components/verifyer"
import Router from "next/router"
import Cookies from "js-cookie"
import axios from "axios"
import { Text } from "@chakra-ui/react"
import FormatCurrency from "@/functions/moneyconvert"
const Perfil = () => {
    const token = Cookies.get('jwt');

    const [items, setItems] = useState([]);
    const [pag, setPag] = useState(0);
    const [fim, setfim] = useState(false)
    const [notfound, setnotfound] = useState(false)
    const itemsPerPage = 24;
    const [user, setuser] = useState({})
    const fetchData = async (offset, limit) => {
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_URL + "/getshops", {
            params: {
              limit,
              offset,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          console.error("Erro ao buscar dados: ", error);
          return [];
        }
      };
      const loadMoreItems = async () => {
        setPag(pag + 1);
      };
    
    let verified = false
    const logOut = () => {
        Cookies.remove('jwt')
        Router.push('/login')
    }
    
    const routerFunc = () => {
        Router.push('/login?page=perfil')
    }
    useEffect(() => {
        if (!fim) {
          const offset = pag * itemsPerPage;
          const limit = itemsPerPage;
      
          fetchData(offset, limit)
            .then((data) => {
            const datas = data.itemsS
              if (datas.length > 0) {
                setnotfound(false)
                const lastItems = items.slice(-datas.length);
                const newItems = datas.slice();
      
                if (
                  JSON.stringify(lastItems) === JSON.stringify(newItems)
                ) { 
                } else {
                  setItems([...items, ...newItems]);
                }
              }else if(items.length <= 0){
                setnotfound(true)
                setfim(true);
              } else {
                setnotfound(true)
                setfim(true);
              }
      
              if (datas.length < itemsPerPage) {
                setfim(true);
              }
            });
        }
      }, [pag]);
    useEffect(() => {
        if(!verified){
            const getuser = async () => {
                const response = await axios.get(process.env.NEXT_PUBLIC_URL+'/getuser', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }).then(function (data){
                    setuser(data.data.user)
                    verified = true
                }).catch(function (error){
                    console.log(error)
                })
            }
            getuser()
        }
        
    }, [])
    return(
        <>
        <AuthVerify routerFunction={() => routerFunc()}>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='md:mt-[9rem] w-full justify-center mt-[7rem]'>
                <div className=" bg-white border rounded border-gray-300">
                <div className="text-black text-center p-4 justify-center flex">
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[6rem] h-[6rem]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h1 className="text-2xl">
                            Olá, {user.nome}
                        </h1>
                    </div>
                </div>
                <div className="flex  w-auto justify-center items-center " >
                    <div className="overflow-auto flex">
                    <div className="text-center md:mx-8 mx-6 my-4 ">
                        
                        <button onClick={() => Router.push("/perfil/compras")} className=" ml-auto mr-auto bg-sky-100 hover:bg-sky-200  rounded-full text-blue-600 ease-in-out duration-200 md:p-6 p-4 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>

                        </button>
                        <p className="text-black text-center">Compras</p>
                    </div>
                    <div className=" text-center md:mx-8 mx-6 my-4">
                        <button className=" ml-auto mr-auto bg-sky-100 hover:bg-sky-200  rounded-full text-blue-600 ease-in-out duration-200 md:p-6 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>


                        </button>
                        <p className="text-black text-center">Suporte</p>
                    </div>
                    <div className=" text-center md:mx-8 mx-6 my-4">
                        <button onClick={() => logOut()} className=" ml-auto mr-auto bg-sky-100 hover:bg-sky-200  rounded-full text-blue-600 ease-in-out duration-200 md:p-6 p-4 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>



                        </button>
                        <p className="text-black text-center">Log out</p>
                    </div>
                    
                    </div>
                </div>
                </div>
                {notfound ? (
                    <p className="text-center text-black font-medium text-2xl p-4">Nenhum item encontrado</p>
                    ) : items.length <= 0 ? (
                    <li className='flex m-4 justify-center'>
                        <Spinner className='ml-auto mr-auto' color='blue.600' size='xl' />
                    </li>
                    ) : (
                    <div>
                        {items.map((item) => (
                            <div key={item.id} className=" bg-white border rounded p-4 text-black border-gray-300">
                            <div>
                                <div className=" my-2 justify-between md:flex"> 
                                    <h1 className="">
                                        Compra de {item.itens.length}  item(s)
                                    </h1>
                                    <h1 className="md:my-0 my-2">
                                        id: {item.id}
                                    </h1>
                                </div>
                                <div className=" my-2 justify-between md:flex"> 
                                    <h1 className="">
                                        Status de pagamento: {item.status == "1" ? (
                                            <span className=" text-green-700 ">Pago</span>
                                        ):(
                                            <span className=" text-red-700 ">Falhou</span>
                                        )}
                                    </h1>
                                </div>
                                <div className=" my-2 justify-between md:flex"> 
                                    <h1 className="">
                                        Status: 
                                    </h1>
                                </div>
                                <div className='bg-gray-100 w-full my-2 md:p-2 p-1 md:mr-0 rounded'>
                                    <Text textDecoration="none" color='blue.600' fontSize='xl'>
                                        {FormatCurrency(item.value)}
                                    </Text>
                                </div>
                                <div className=" my-2 justify-between md:flex"> 
                                    <Button onClick={() => Router.push("/order/"+item.slug)} className="w-full" colorScheme='teal' variant='outline'>
                                        Mais
                                    </Button>
                                </div>
                            </div>
                        </div>
                        ))}
                        <div className="text-center my-4">
                        <Button colorScheme='teal' variant='outline' onClick={loadMoreItems}>Carregar Mais</Button>
                        </div>
                    </div>
                    )}
            </main>
            </AuthVerify>
        </>
        
    )
}

export default Perfil