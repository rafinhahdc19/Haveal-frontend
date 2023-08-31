import React from 'react'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import { Card, Stack, Heading, Text, Button, CardHeader, CardBody, CardFooter, Divider, ButtonGroup } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Input,
  HStack,
  Skeleton
} from '@chakra-ui/react'
import Link from 'next/link'
import axios from 'axios'


const Index = () => {
  const router = useRouter();
  const id = router.query.id;
  
  const updateLocalStorage = (slug) => {
    // Verifica se já existe uma lista de carros no LocalStorage
    const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];

    // Verifica se o slug do carro já está na lista
    const existingCar = existingCars.find((car) => car.slug === slug);

    if (existingCar) {
      // Se o carro já está na lista, incrementa a quantidade
      existingCar.quantity = 1;
    } else {
      // Caso contrário, adiciona um novo elemento à lista
      existingCars.push({ slug, quantity: 1 });
    }

    // Atualiza o LocalStorage com a lista atualizada
    localStorage.setItem('user_car', JSON.stringify(existingCars));
    
  };

  const formatCurrency = (value) => {
    const numberFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    return numberFormat.format(value);
  };
  const [dataArrays, setdataar] = useState([])
  const slugs = id

  useEffect(() => {
    const item = axios.post(process.env.NEXT_PUBLIC_URL+"/product", {
      slug:slugs
    }).then(function (response) {
      setdataar(response.data)
    }).catch(function (response) {
      setdataar([])
    })
  },[]) 
  const itemToShow = dataArrays.find(item => item.slug === id);
  const itemToBuy = [{
    slug: id,
    quantity: 1,
  }];
  const listTo64 = btoa(encodeURIComponent(JSON.stringify(itemToBuy)))
  return (
    <>

      
        <header className='fixed w-full z-10 top-0'><Navbar></Navbar></header>
        {itemToShow && (
        <main className='md:mt-[9rem] lg:max-w-6xl drop-shadow-sm rounded mt-[8rem] ml-auto mr-auto'>
          <div className='bg-white rounded w-full p-10 md:px-14 px-2 text-black'>
          
            <div className='md:flex'>
            <div className='md:w-[40%] rounded '>
            <Image
            width={"600"}
            height={"600"}
            src={itemToShow.imgurl}
            alt='Foto do Produto'
            borderRadius='lg'
            className='rounded'
            />
            </div> 
            <div className='md:w-[60%] justify-center md:pl-10  px-2 mr-auto '>
              <div className='md:w-[90%]'>
              <h1 className='font-medium text-2xl'>{itemToShow.title}</h1>
              <div className='bg-gray-50 my-4 md:p-4 md:mr-0 rounded'>
                <Text textDecoration="none" color='blue.600' fontSize='4xl'>
                  {formatCurrency(itemToShow.value)}
                </Text>
              </div>
              <div className='md:p-4'>
                <p className='flex gap-2 my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg><span> Entrega para todo o Brasil</span>
                </p>
                <p className='flex my-2 gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span> Pagamento com Cartões, dinheiro ou pix</span>
                </p>
              </div>
              <div className='md:p-4 justify-center md:justify-normal my-4 w-full'>
              
                <ul className='grid mr-auto ml-auto w-full gap-4 grid-cols-1'>
                  <li>
                  
                    <button onClick={() => updateLocalStorage(itemToShow.slug)} className='w-full focus:bg-green-500 bg-blue-500 hover:bg-blue-600 duration-200 ease-in-out font-medium mr-auto ml-auto text-white rounded-md p-2'>
                      Adicionar ao carrinho
                    </button>
                  </li>
                  <li>
                  <Link href={"/list/"+listTo64}>
                    <button className='w-full bg-blue-100 hover:bg-blue-50 text-blue-700 duration-200 font-medium mr-auto ml-auto ease-in-out rounded-md p-2'>
                      Comprar agora por Whatsapp
                    </button>
                    </Link>
                  </li>
              </ul>
              
              </div>
              </div>
              
            </div> 
            </div>
            <Divider></Divider>
            <div className='m-2'>
              <div>
                <h1 className='text-3xl my-4 font-medium'>Descrição do produto:</h1>
                <h1 className='text-2xl text-black/75 my-4 font-light'>{itemToShow.desc}</h1>
              </div>
            </div>
          </div>
          
        </main>
        )}
    </>
  )
}

export default Index