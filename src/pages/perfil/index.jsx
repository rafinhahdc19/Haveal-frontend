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
    Input
  } from '@chakra-ui/react'
  import Link from "next/link"

  import { useDisclosure } from "@chakra-ui/react"
  import { useRef } from "react"
import AuthVerify from "@/components/verifyer"
import Router from "next/router"
const Perfil = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    function tabs(){
        return(
            <>
                <div className="w-full min-h-full">
                    
                    <Link href="/perfil/compras">
                        <Button className="w-full my-2" variant='outline'  colorScheme='blue'>Compras</Button>
                    </Link>
                    <Link href="/perfil/compras">
                        <Button className="w-full my-2" variant='outline'  colorScheme='blue'>Suporte</Button>
                    </Link>
                </div>
            </>
        )
    }
    const routerFunc = () => {
        Router.push('/login')
    }
    return(
        <>
        <AuthVerify routerFunction={() => routerFunc()}>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='md:mt-[9rem] w-full justify-center mt-[8rem]'>
                <div className="md:hidden flex justify-center pb-4 bg-white drop-shadow-md">
                    <div className=" mr-auto ml-auto justify-center">
                        <Button className="mr-auto" ref={btnRef} colorScheme='teal' onClick={onOpen}>
                            Abrir menu
                        </Button>
                    </div>
                
                    <Drawer
                        isOpen={isOpen}
                        placement='left'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                        <DrawerCloseButton className="text-black" />
                        <DrawerHeader><p className="text-black">Perfil</p></DrawerHeader>

                        <DrawerBody>
                            {tabs()}
                        </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="w-[20%] p-4 drop-shadow-md min-h-full h-[79vh] md:block hidden bg-white">
                    <h1 className="text-black text-3xl my-2">
                        Perfil
                    </h1>
                    {tabs()}
                </div>
                
            </main>
            </AuthVerify>
        </>
        
    )
}

export default Perfil