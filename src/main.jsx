import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient/apolloClient.js'
const root = createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>

  <ChakraProvider>
    <ToastContainer />
    <App />
  </ChakraProvider>
</ApolloProvider>
  // </React.StrictMode>,
)