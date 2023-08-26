import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button, Box, Text } from '@chakra-ui/react'


const Product = ({ title, desc, image, value, link, slug}) => {
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
      
      
  return (
    <>
      <Card className='mr-auto ml-auto' maxW='sm'>
      <CardBody >
        <Link href={link} className="no-underline  " >
          <Image
            width={"480"}
            height={"480"}
            src={image}
            alt='Foto do Produto'
            borderRadius='lg'
            className='rounded-sm'
          />

          
            <div className='relative py-3 h-full'>
              <div className='mb-auto'>
               <Box style={{ wordBreak: 'break-word' }}>
                <Text fontSize='xl' textDecor="none" noOfLines={6}>
                  {title}
                </Text>
                </Box>
                <Box style={{ wordBreak: 'break-word' }}>
                  <Text fontSize="base" my="2" noOfLines={2} >
                    {desc}
                  </Text>
                </Box>
                <Text textDecoration="none" color='blue.600' fontSize='lg'>
                  {value}
                </Text>
              </div>
            </div>
          

        </Link>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button className='focus:bg-green-500' _focus={"bg-green-500"} variant="solid" colorScheme="blue" onClick={() => updateLocalStorage(slug)}>
            Adicionar ao carrinho
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
    </>
  )
}

export default Product