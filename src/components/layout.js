import { Chicle } from 'next/font/google'
import { Children } from 'react'
import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, h4, h5, h6, p, span, div {
    font-family: 'Poppins', sans-serif;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Haveal</title>
        <meta
          name="description"
          content="A loja onde você encontrará tudo o que precisa."
        />
      </Head>
      <GlobalStyle />
      {children}
      
    </>
  )
}