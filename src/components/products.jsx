import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button, Box, Text } from '@chakra-ui/react'


const Product = ({ title, desc, image, value, link, slug}) => {
    const updateLocalStorage = (slug) => {
        const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];
    
        const existingCar = existingCars.find((car) => car.slug === slug);
    
        if (existingCar) {
          existingCar.quantity = 1;
        } else {
          existingCars.push({ slug, quantity: 1 });
        }
    
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

          
            <div className='relative md:py-3 h-full'>
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
      <div className='md:visible md:h-auto h-0 invisible mr-auto ml-auto'>
      <Divider />
      <CardFooter >
        <ButtonGroup  spacing='2'>
          <Button className='focus:bg-green-500' _focus={"bg-green-500"} variant="solid" colorScheme="blue" onClick={() => updateLocalStorage(slug)}>
            Adicionar ao carrinho
          </Button>
        </ButtonGroup>
      </CardFooter>
      </div>
    </Card>
    
    </>
  )
}

export default Product