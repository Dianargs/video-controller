import '../styles/globals.css'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Header from '../styles/header.js'

function MyApp({ Component, pageProps }) {
  return (
  
    <ChakraProvider >
      <Box bg="#FFFFFF" h="100vh"backgroundImage={"images/10610.jpg"} backgroundAttachment ={"fixed"} backgroundRepeat={"no-repeat"} backgroundPosition={"right"} backgroundSize={"60%"} minH="100%" >
      
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
