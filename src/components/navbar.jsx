import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import  Router  from 'next/router'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [usedCar, setusedCar] = useState("block");
  const [search, setsearch] = useState("");
  
    const routerFunc = (e) => {
      e.preventDefault();
      Router.push('/search/'+search)
    }
    return (
      <div>
        <nav className="w-full bg-[#FFF] drop-shadow-lg fixed top-0 left-0 right-0 z-10">
          <div className="justify-between px-1  mx-auto w-full lg:max-w-7xl md:items-center md:flex md:px-1">
            <div className='w-full'>
                
              <div className="flex items-center justify-between pb-1 md:py-3 md:block">
                
                <div className=' flex  w-full '>
                    <div>
                        <Link  href="/">
                            <Image src={"/logo 3.png"} className={'md:w-[70px] object-contain md:h-[70px] w-[65px] h-[65px]'} alt='logo' width={'70'} height={'70'} />
                        </Link>
                    </div>
                <div className='w-[100%] mt-auto  mb-auto md:ml-6 ml-2'>
                <form  onSubmit={(e) => routerFunc(e) }>
                    <div className='flex border rounded-md border-gray-300 p-1 pl-3'>
                    
                        <Input type={"text"} onChange={(e) => setsearch(e.target.value)} className='w-full ' variant='unstyled' placeholder='Buscar' color={'black'} />
                        <Link type='submit' href={search !== "" ? "/search/" + search : ""} style={{ pointerEvents: search !== "" ? "auto" : "none" }}>
                          <Button padding={4} colorScheme="blue" isDisabled={search === ""}>
                            
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                              </svg>
                            
                          </Button>
                        </Link>
                
                        
                    </div></form>
                </div>
                </div>
                <div className="md:hidden">
                <button
                    onClick={() => setNavbar(!navbar)}
                    type='button'
                    className='inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100  ease-in-out duration-300 focus:outline-none  '
                    aria-label='Menu'
                    aria-expanded='false'
                    >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-7 h-7'
                    >
                        <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                        />
                    </svg>
                </button>
                </div>
              </div>
            </div>
            
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? 'p-12 md:p-0 block' : 'hidden'
                }`}
              >
                <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                  <li className="pb-3 text-base text-black py-3 px-6 text-center  border-b-2 md:border-b-0  hover:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                    <Link className='flex' href="/perfil" onClick={() => setNavbar(!navbar)}>
                        
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>


                    <span className='mt-auto mb-auto ml-3'>Perfil</span>

                    </Link>
                  </li>
                  <li className="pb-3 text-base text-black py-3 px-6 text-center  border-b-2 md:border-b-0  hover:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                    <Link className='flex' href="/carrinho" onClick={() => setNavbar(!navbar)}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg><div className={usedCar+' bg-red-500 h-2 rounded-full  w-2'}></div><span className='mt-auto mb-auto ml-3 block md:hidden'>Carrinho</span>

                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className=''>
                <div >
                    <ul className='flex font-medium text-md text-center ml-auto mr-auto lg:max-w-7xl  text-black overflow-auto gap-8 px-10 md:pb-2 ' >
                        <li className='hover:bg-slate-300 duration-200 ease-in-out rounded p-2 cursor-pointer'>
                          <Link href='/search/camisa'>
                            Camisa
                          </Link>
                        </li>
                        <li className='hover:bg-slate-300 duration-200 ease-in-out rounded p-2 cursor-pointer'>
                        <Link href='/search/Calca'>
                            Calça
                          </Link>
                        </li>
                        <li className='hover:bg-slate-300 duration-200 ease-in-out rounded p-2 cursor-pointer'>
                        <Link href='/search/Tenis'>
                            Tênis
                          </Link>
                        </li>
                        <li className='hover:bg-slate-300 duration-200 ease-in-out rounded p-2 cursor-pointer'>
                        <Link href='/search/Chuteira'>
                            Chuteira
                          </Link>
                        </li>
                        <li className='hover:bg-slate-300 duration-200 ease-in-out rounded p-2 cursor-pointer'>
                        <Link href='/search/Chinelo'>
                            Chinelo
                          </Link>
                        </li>
                    </ul>
                </div>
          </div>
        </nav>
      </div>
      )
}

export default Navbar