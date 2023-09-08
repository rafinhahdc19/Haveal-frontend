import React from 'react'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import { Card, Stack, Heading, Text, Button, CardHeader, CardBody, CardFooter, Divider, ButtonGroup } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Router from 'next/router'
import AuthVerify from '@/components/verifyer'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Input,
  HStack,
  Skeleton,
  Spinner,
  Box,
} from '@chakra-ui/react'
import Link from 'next/link'
import axios from 'axios'
import Cookies from 'js-cookie'
import Copylink from '@/components/copylink'
import { useDisclosure } from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'




const Index = () => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const { slug } = router.query;
    const [loading, setLoading] = useState(true);
    const token = Cookies.get("jwt")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [ codeFind, setCodeFind ] = useState('')

    const addFindCode = async (e, token) => {
      e.preventDefault()
      console.log(token)
      const responseforfindcode = await axios.put(
        process.env.NEXT_PUBLIC_URL + "/order/rastreioupdate",
        { slug: slug, codigo: codeFind }, // Aqui é o corpo da requisição
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      ).then(function (data){
        Router.push('/perfil/compras?message='+encodeURIComponent("Código de rastreio adicionado"))
      }).catch(function (error){
        alert("não foi possivel adicionar código de rastreio")
      })
    }

    const deleteorder = async (slug) => {
      try {
        const response = await axios.delete(process.env.NEXT_PUBLIC_URL+"/order/delete", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: { slug: slug } // Passando o slug como parte dos dados
        });
    
        if (response) {
          setIsDeleting(false)
          Router.push("/perfil/compras");
        }
      } catch (error) {
        setIsDeleting(false)
        alert('Erro ao excluir pedido');
      }
    }

    const formatCurrency = (valueInCents) => {
    const valueInReal = valueInCents / 100; 

    const numberFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    return numberFormat.format(valueInReal);
  };
  const [dataArrays, setdataar] = useState([])

  useEffect(() => {
    if(slug && token){
    const item = axios.post(process.env.NEXT_PUBLIC_URL+"/getshop", {
      slug:slug
    },{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }).then(function (response) {
        setLoading(false)
      setdataar(response.data.itemsS)
    }).catch(function (response) {
        setLoading(false)
      setdataar([])
    })
    }
  },[slug, token]) 
  const routerFunc = () => {
    Router.push('/login?page=perfil')
}
  const itemToShow = dataArrays;
  return (
    <>
        <AuthVerify routerFunction={() => routerFunc()}>
      
        <header className='fixed w-full z-10 top-0'><Navbar></Navbar></header>
        {loading ? (

        <li className='flex justify-center'>
          <Spinner className='ml-auto mr-auto' color='blue.600' size='xl' />
        </li>
      ) : itemToShow && itemToShow.length > 0 ? (
        
        <main className='md:mt-[9rem] lg:max-w-6xl drop-shadow-sm rounded mt-[7rem] ml-auto mr-auto'>
          <div className='bg-white rounded w-full p-4 md:px-14 px-2 text-black'>
            <div className='md:flex'>
              <div className='w-full justify-center md:pl-10  px-2 mr-auto '>
              <h1 className='md:text-2xl text-center my-2 mb-4 text-lg'> Compra para: <span className=' font-medium '>{itemToShow[0].nome}</span></h1>
                <div className=''>
                    <div className=" my-2 justify-between md:flex"> 
                        <h1 className="">
                            Compra de <span className=' font-medium '>{itemToShow[0].itens.length}</span>  item(s)
                        </h1>
                        <h1 className="md:my-0 my-2">
                            id: <span className=' font-medium '>{itemToShow[0].id}</span>
                        </h1>
                    </div>
                    <div className='bg-gray-50 my-4 p-2 md:mr-0 rounded'>
                        <h1 className='pb-2 text-center font-medium text-2xl'>
                            Status
                        </h1>
                        <div className=" my-2 justify-between md:flex"> 
                            <h1 className="text-xl">
                                Status de pagamento: {itemToShow[0].status == "1" ? (
                                    <span className=" text-green-700 ">Pago</span>
                                ):(
                                    <span className=" text-red-700 ">Falhou</span>
                                )}
                            </h1>
                        </div>
                        <div className=" my-2 justify-between md:flex"> 
                            <h1 className="text-xl">
                            Status: {itemToShow[0].status == "0" ? (
                                    <span className="text-red-700">Falhou</span>
                                    ) : (
                                      itemToShow[0].statusInterno == "1" ? (
                                        <span className="text-green-700">Validado</span>
                                    ) : itemToShow[0].statusInterno == "2" ? (
                                        <span className="text-gray-700">Cancelado</span>
                                    ) : (
                                        <span className="text-yellow-700">Validando</span>
                                    )
                                    )} 
                            </h1>
                        </div>
                    </div>

                      {itemToShow[0].rastreio != "" && itemToShow[0].rastreio ? (
                        <div className="w-[100%] md:mr-auto md:ml-auto md:flex md:justify-center md:w-[40%] my-2 justify-between"> 
                        <h1 className="w-full text-center md:justify-center md:mr-auto md:ml-auto ">
                            <span className='text-center m-2 text-xl w-full'>Código de Rastreio:</span>
                            <div className='text-left my-2'>             
                              <Copylink textToCopy={itemToShow[0].rastreio}></Copylink>
                            </div>
                        </h1>
                      </div>
                      ):(
                        <>
                        <div className="w-[100%] md:mr-auto md:ml-auto md:flex md:justify-center md:w-[60%] my-2 justify-between"> 
                          <h1 className="w-full text-center md:justify-center md:mr-auto md:ml-auto ">
                              <span className='text-center m-2 text-xl w-full'>Adicionar código de Rastreio:</span>
                              <div className='text-left my-2'>             
                                <form onSubmit={(e) => addFindCode(e, token)} className='flex gap-2 w-full'>
                                  <Input value={codeFind} onChange={(e) => setCodeFind(e.target.value) } placeholder='Código de rastreio'></Input>
                                  <Button type='submit' colorScheme='blue'>Adicionar</Button>
                                </form>
                              </div>
                          </h1>
                        </div>
                        </>
                      )
                    }
                  <div className=" my-2 justify-between md:flex"> 
                    <div className='bg-gray-100 rounded'>
                      <div>
                        
                      </div>
                    </div>
                  </div>
                  
                  
                  <div className='md:py-4 md:pt-2'>
                    <p className='flex gap-2 my-2'>
                      <span>
                        Entrega para a Cidade: <span className=' font-medium '>{itemToShow[0].cidade}</span> no Estado: <span className=' font-medium '>{itemToShow[0].estado}</span> na Rua:{' '}
                        <span className=' font-medium '>{itemToShow[0].rua}</span> Numero: <span className=' font-medium '>{itemToShow[0].numero}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Divider></Divider>
            <div className='m-2'>
              <div>
                <h1 className='text-3xl my-4 font-medium'>Produtos:</h1>
                <div className='m-2'>
        <div className=' w-full'>
                <div className='w-[100%] md:mb-0 bg-white drop-shadow-md rounded-md'>
                  <div className='flex p-4 justify-between'>
                    <h2 className=' text-black font-medium mt-auto mb-auto'>Produtos</h2>
                    

                  </div>
                  
                  <Divider borderBottomColor={"blackAlpha.400"}></Divider>
                  {itemToShow[0].itens.length > 0 ? (
                    
                    itemToShow[0].itens.map((item) => {
                    return(
                      <div key={item.slug} className='flex w-full'>
                      <div  className='flex p-4 w-full border rounded m-2 border-gray-200'>
                        <div className='rounded '>
                          <Image 
                          className='rounded'            
                          width={"200"}
                          height={"200"}
                          src={item.imgurl}
                          alt='Foto do Produto'
                          borderRadius='lg' />
                          <div className='md:hidden block'>
                          </div>
                        </div>
                        <div className='w-full' >
                          <div className='md:flex'>
                            
                            <Box style={{ wordBreak: 'break-word' }}>
                              <Text className='text-black md:text-2xl text-sm font-medium mx-3' fontSize='xl' textDecor="none" noOfLines={2}>
                                {item.nome}
                            </Text>
                            </Box>
                            <div className='mx-4 ml-auto px-4 py-1 md:pt-2 pt-4'>
                              <p className='text-black'>
                                Quantidade: {item.quantity}
                              </p>

                            </div></div>
                            <div className=' mt-4 px-4'>
                            <div className='bg-gray-50 w-full  md:p-2 p-1 md:mr-0 rounded'>
                              <Text textDecoration="none" color='blue.600' fontSize='xl'>
                                {formatCurrency(item.value)}
                              </Text>

                            </div>
                          </div>
                        </div>
                        
                      </div></div>)
                      })
                      ) : (
                        
                        
                        <li className='flex justify-center'>
                            <Spinner className='ml-auto mr-auto' color='blue.600' size='xl' />
                        </li>
                        
                        
                        
                      )}
                      <div className='bg-gray-50 md:text-4xl text-center text-2xl my-4 md: p-4 md:mr-0 rounded'>
                    <Text textDecoration='none' color='blue.600'>
                      Valor total: {formatCurrency(itemToShow[0].value)}
                    </Text>
                  </div>
                  
                </div>
                
              </div>
                </div>
              </div>
            </div>
            <div className='mr-auto'>
                      
                          <Button colorScheme='red' onClick={onOpen}>
                            {isDeleting ? <Spinner color='red.100' /> : 'Deletar order'}
                          </Button>

                          <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                          >
                            <AlertDialogOverlay>
                              <AlertDialogContent>
                                <AlertDialogHeader textColor={"black"} fontSize='lg' fontWeight='bold'>
                                  Deletar order
                                </AlertDialogHeader>

                                <AlertDialogBody textColor={"black"} >
                                  Tem certeza que quer apagar?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                  <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                  </Button>
                                  <Button colorScheme='red' onClick={() => { onClose(); deleteorder(itemToShow[0].slug); setIsDeleting(true); }} ml={3}>
                                    Delete
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialogOverlay>
                          </AlertDialog>
                      </div>
          </div>
          
        </main>
      ) : (
        <main className='md:mt-[9rem] lg:max-w-6xl drop-shadow-sm rounded mt-[7rem] ml-auto mr-auto'>
            <div>Os dados do produto não foram encontrados.</div>
        </main>
      )}
      </AuthVerify>
    </>
  )
}

export default Index