import Layout from '@/components/layout'
import '@/styles/globals.css'
import { ChakraBaseProvider } from '@chakra-ui/react'
import theme from '../../chakra-theme'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (<SessionProvider session={session}><ChakraBaseProvider theme={theme}><Layout> <Component {...pageProps} /> </Layout></ChakraBaseProvider></SessionProvider>)
}
