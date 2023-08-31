import Image from 'next/image'
import FormatCurrency from '@/functions/moneyconvert'
import Navbar from '@/components/navbar'
import axios from 'axios'
import Product from '@/components/products'
import { useState, useEffect } from 'react'
import { Skeleton, SkeletonCircle, SkeletonText, Box, Spinner  } from '@chakra-ui/react'

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_URL+"/products");
        if (response.data && response.data.length > 0) {
          setItems(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='md:mt-[10rem] mt-[8rem] ml-auto mr-auto '>
        {items.length <= 0 ? (
          <li className='flex justify-center'>
            <Spinner className='ml-auto mr-auto' color='blue.600' size='xl' />
          </li>
        ) : (
          <ul className='px-4 grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 justify-center gap-5 lg:max-w-7xl mr-auto ml-auto'>
            {items.map((item) => (
              <Product
                key={item.id}
                className="ml-auto mr-auto"
                slug={item.slug}
                title={item.nome}
                link={"/product/" + item.slug}
                desc={item.desc}
                value={FormatCurrency(item.value)}
                image={item.imgurl}
              />
            ))}
          </ul>
        )}
      </main>

    </>
  )
}
