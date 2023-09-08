import Image from 'next/image'
import FormatCurrency from '@/functions/moneyconvert'
import Navbar from '@/components/navbar'
import axios from 'axios'
import Product from '@/components/products'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Skeleton, SkeletonCircle, SkeletonText, Box, Spinner, Button  } from '@chakra-ui/react'
import Router from 'next/router'

export default function Home() {
  const [items, setItems] = useState([]);
  const [pag, setPag] = useState(0);
  const [fim, setfim] = useState(false)
  const [notfound, setnotfound] = useState(false)
  const [ search2, setsearch2 ] = useState('')
  const itemsPerPage = 24;
  const router = useRouter();
  const search =
  typeof router.query.search === 'object'
    ? router.query.search.join(' ') 
    : router.query.search || '';
  
  const fetchData = async (offset, limit, search) => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_URL + "/products", {
        params: {
          limit,
          offset,
          search,
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
  useEffect(() => {
    console.log(search)
    if(search == ''){
        Router.push('/')
    }
    console.log(search2,"o um:", search)
    
    if (!fim || search2 != search) {
    
      const offset = pag * itemsPerPage;
      const limit = itemsPerPage;
  
      fetchData(offset, limit, search)
        .then((data) => {
          if (data && data.length > 0) {
            setnotfound(false)
            const lastItems = items.slice(-data.length);
            const newItems = data.slice();
  
            if (
              JSON.stringify(lastItems) === JSON.stringify(newItems)
              
            ) { 
            } else if(search2 != search){
                
                setItems(newItems);
                setsearch2(search)
                
            } else {
              
              setItems([...items, ...newItems]);
              setsearch2(search)
            }
          }else if(items.length <= 0){
            setsearch2(search)
            setnotfound(true)
            setfim(true);
          } else {
            setnotfound(true)
            setsearch2(search)
            setfim(true);
          }
  
          if (data && data.length < itemsPerPage) {
            setfim(true);
          }
        });
    }
  }, [pag, search]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='md:mt-[10rem] mt-[8rem] ml-auto mr-auto '>
      {notfound ? (
          <p className="text-center text-black font-medium text-2xl p-4">Nenhum item encontrado</p>
        ) : items.length <= 0 ? (
          <li className='flex justify-center'>
            <Spinner className='ml-auto mr-auto' color='blue.600' size='xl' />
          </li>
        ) : (
          <div>
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
            <div className="text-center my-4">
              <Button colorScheme='teal' variant='outline' onClick={loadMoreItems}>Carregar Mais</Button>
            </div>
          </div>
        )}

      </main>
    </>
  )
}
