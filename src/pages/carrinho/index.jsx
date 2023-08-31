import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import ItenCont from '@/components/itenscont'
import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Input,
  HStack,
  Box,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

import { Card, Stack, Heading, Text, Button, CardHeader, CardBody, CardFooter, Divider, ButtonGroup } from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import axios from 'axios'

const Index = () => {
  const calcularResultado = () => {
    let total = 0;

    dataArrays3.forEach((item) => {
      const { quantity, value } = item;
      const resultadoItem = quantity * value;
      total += resultadoItem;
    });

    return total;
  };
  const [Loading, setLoading] = useState(<div className='w-full justify-center flex p-4'><Stack className='mr-auto ml-auto' direction='row' spacing={4}> <Spinner size='xl' color='red.500' /> </Stack></div>)
  const [dataArrays, setdataar] = useState([])
  const [dataArrays2, setdataar2] = useState([])
  const [dataArrays3, setdataar3] = useState([])

  const updateLocalStorage = (slug, valor) => {

    const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];

    const existingCar = existingCars.find((car) => car.slug === slug);

    if (existingCar) {
      existingCar.quantity = valor;
    } else {
    }
    localStorage.setItem('user_car', JSON.stringify(existingCars));
    setdataar2(existingCars);
  };
  const DeleteProdLocalStorage = (slug) => {
    const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];
  
    const existingCarIndex = existingCars.findIndex((car) => car.slug === slug);
  
    if (existingCarIndex !== -1) {
      existingCars.splice(existingCarIndex, 1);
  

      localStorage.setItem('user_car', JSON.stringify(existingCars));
  
      const remainingItems = dataArrays3.filter((item) => item.slug !== slug);
      setdataar3(remainingItems);
      setdataar2(existingCars)
    }
    if(dataArrays3.length < 0){
      
    }else{
      setLoading(<div className='p-6'>
      <h1 className='text-xl font-medium text-center text-black'>
        Não existe nenhum item no carrinho!
      </h1>
    </div>);
    }
    
    
    
  };
  const CleanCar = () => {
    localStorage.removeItem('user_car');
    setdataar3([]);
    setdataar2([]);
    setLoading(<div className='p-6'>
    <h1 className='text-xl font-medium text-center text-black'>
      Não existe nenhum item no carrinho!
    </h1>
  </div>);
  }
  const updateLocalStorages = (slug, valor) => {
    const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];

    const existingCar = existingCars.find((car) => car.slug === slug);

    if (existingCar) {
      existingCar.quantity = valor;
    } else {

    }

    localStorage.setItem('user_car', JSON.stringify(existingCars));
    setdataar2(existingCars);
  };



  const formatCurrency = (value) => {
    const numberFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    return numberFormat.format(value);
  };
  
  
  useEffect(() => {
    const itenCa = localStorage.getItem('user_car');
    const itenCar = itenCa ? JSON.parse(itenCa) : [];
    setdataar2(itenCar)

    const getItemcarsda = async () => {
      if(itenCar != []){
        const itensfromdb = await axios.post(process.env.NEXT_PUBLIC_URL+"/getitemcar", {
            slugs:itenCar 
        }).then(function (response){
          setdataar(response.data.itens)
        }).catch(function (error){
          console.log(error)
        })
    }
    }
    getItemcarsda()
    
    

  },[])
  useEffect(() => {
  
    const arrayResultado = [];
    for (const item of dataArrays2) {
      const { slug, quantity } = item;

      const produtoEncontrado = dataArrays.find(produto => produto.slug === slug);

      if (produtoEncontrado) {
        const { slug, nome, desc, imgurl, value } = produtoEncontrado;

        const itemDataArrays2 = dataArrays2.find(item => item.slug === slug);
    
        const quantidadeItem = itemDataArrays2 ? itemDataArrays2.quantidade : 0;
    
        arrayResultado.push({ slug, nome, desc, imgurl, value, quantity });
        setdataar3(arrayResultado)
      }
    }

       
  }, [dataArrays, dataArrays2]);

  
  useEffect(() => {
    const loadingContent = dataArrays2.length > 0 ? null : (
      <div className='p-6'>
        <h1 className='text-xl font-medium text-center text-black'>
          Não existe nenhum item no carrinho!
        </h1>
      </div>
    );
    setLoading(loadingContent);
  }, [dataArrays2]);
  const resultadoFinal = calcularResultado();
  const listTo64 = btoa(encodeURIComponent(JSON.stringify(dataArrays2)))
  
  return (
    <>
        <header className='fixed w-full z-10 top-0'><Navbar></Navbar></header>
          <main className='md:mt-[11rem] w-full justify-center mt-[8rem]'>
            <div className=' flex gap-2 rounded-md justify-between mr-auto ml-auto md:max-w-7xl'>
              <div className='md:w-[70%] w-full'>
                <div className='w-[100%] md:mb-0 mb-[14rem] bg-white drop-shadow-md rounded-md'>
                  <div className='flex p-2 justify-between'>
                    <h2 className=' text-black font-medium mt-auto mb-auto'>Produtos</h2>
                    <Button onClick={() => CleanCar()} colorScheme='red' className='text-red-500 flex'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg><span>Apagar tudo</span>
                    </Button>
                    

                  </div>
                  
                  <Divider borderBottomColor={"blackAlpha.400"}></Divider>
                  {dataArrays3.length > 0 ? (
                    
                  dataArrays3.map((item) => {
                    return(
                      <div key={item.slug} className='flex p-4 border rounded m-2 border-gray-200'>
                        <div className='rounded '>
                          <Image 
                          className='rounded'            
                          width={"200"}
                          height={"200"}
                          src={item.imgurl}
                          alt='Foto do Produto'
                          borderRadius='lg' />
                          <div className='md:hidden block'>
                          <ButtonGroup paddingTop={2} spacing='2'>
                            <Button className=' flex text-right ' onClick={() => DeleteProdLocalStorage(item.slug)} colorScheme='red' variant='ghost' >
                              <p>Apagar</p>
                            </Button>
                          </ButtonGroup>
                          </div>
                        </div>
                        <div className='w-full' >
                          <div className='md:flex'>
                            
                            <Box style={{ wordBreak: 'break-word' }}>
                              <Text className='text-black md:text-2xl text-base font-medium mx-3' fontSize='xl' textDecor="none" noOfLines={2}>
                              {item.nome}
                            </Text>
                            </Box>
                            <div className='mx-4 ml-auto px-4 py-1 md:pt-2 pt-4'>
                              <ItenCont className="w-full" IFunction={updateLocalStorage} DFunction={updateLocalStorages} DValue={item.quantity} Slug={item.slug}></ItenCont>

                            </div></div>
                            <div className=' mt-4 px-4'>
                            <div className='bg-gray-50 w-full  md:p-2 p-1 md:mr-0 rounded'>
                              <Text textDecoration="none" color='blue.600' fontSize='xl'>
                                {formatCurrency(item.value)}
                              </Text>
                            </div>
                            <div className='hidden md:block'>
                            <ButtonGroup  paddingTop={2} spacing='2'>
                            <Button className=' flex text-right ' onClick={() => DeleteProdLocalStorage(item.slug)} colorScheme='red' variant='ghost' >
                              <p>Apagar</p>
                            </Button>
                            </ButtonGroup>
                            </div>
                          </div>
                        </div>
                      </div>)
                      })
                      ) : (
                        
                        
                        Loading
                        
                        
                        
                      )}
                      
                  
                </div>
                
              </div>
              <div className='md:w-[30%] w-full md:relative fixed bottom-0'>
                <div className='md:relative fixed w-full bottom-0 bg-white drop-shadow-md rounded-md right-0'>
                  <div className='md:block hidden'>
                <h2 className='p-4 text-black font-medium'>Resumo da compra</h2>
                <Divider borderBottomColor={"blackAlpha.400"}></Divider></div>
                <div className=' justify-between flex text-black md:p-4 p-1 px-4 '>
                  <p className=' font-light '>
                    Produto(s)
                  </p>
                  <Text className='font-light' textDecoration="none" color='blue.600' fontSize='lg'>
                  {formatCurrency(resultadoFinal)}
                  </Text>
                </div>
                <div className=' justify-between flex text-black md:p-4 px-4 '>
                  <p className=' font-medium md:text-xl text-lg'>
                    Total
                  </p>
                  <Text textDecoration="none" color='blue.600' fontSize='xl'>
                    {formatCurrency(resultadoFinal)}
                  </Text>
                </div>
                
                <div className='px-4 md:pt-4 md:my-0 my-2'>
                  <Button onClick={() => Router.push(`https://api.whatsapp.com/send?phone=77988689141&text=https://wolf-conceito-web-site.vercel.app/list/${listTo64}`)} className="md:p-0 p-4 w-full" variant="solid" colorScheme="blue" isDisabled={dataArrays3.length === 0} >
                    
                      <span className='flex break-words md:text-sm text-base'>Finalizar compra pelo whatsapp</span>
                    
                  </Button>
                </div>
                <div className='p-4 gap-2 md:block hidden text-black  mr-auto ml-auto'>
                  <p className='flex gap-2 my-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span className=''>Compra com seguraça</span>
                  </p>
                  <p className='flex gap-2 my-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg><span> Entrega para todo brasil</span>
                  </p>
                  <p className='flex my-6 gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span> Pagamento com Cartões, dinheiro ou pix</span>
                  </p>
                </div>
              </div>
              </div>
            </div>
          </main>
    </>
  )
}

export default Index