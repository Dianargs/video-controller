import '../styles/globals.css'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Header from '../styles/header.js'

function MyApp({ Component, pageProps }) {
  return (
  
    <ChakraProvider>
      <Box bg="linear-gradient(#405F73, #E4DED2)" h="100vh" >
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
