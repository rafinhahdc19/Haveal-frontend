import Layout from '@/components/layout'
import '@/styles/globals.css'
import { ChakraBaseProvider } from '@chakra-ui/react'
import theme from '../../chakra-theme'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (<ChakraBaseProvider theme={theme}><Elements stripe={stripePromise}><Layout> <Component {...pageProps} /></Layout></Elements></ChakraBaseProvider>)
}
