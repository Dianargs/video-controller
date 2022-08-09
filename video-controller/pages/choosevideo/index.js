import {Box,Text,Image,SimpleGrid, Link} from '@chakra-ui/react'
import Header from '../../styles/header'

export default function choosevideo() {
  return (
    <Box>
      <Header title ={"Choose Video"}/>
      <Box bg="#E4DED2" borderRadius ="10px"  p="0.5%" maxW="50%" >
      <SimpleGrid columns={3} spacing={7} ml="1%">
        
      <Box>
          <Link >
            <Image borderRadius ="10px" src = "images/thumbnail.png"   />
            <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
          </Link>
        </Box>
        <Box>
          <Link>
            <Image borderRadius ="10px" src = "images/thumbnail.png"   />
            <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
          </Link>
        </Box>
        <Box>
          <Link>
            <Image borderRadius ="10px" src = "images/thumbnail.png"   />
            <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
          </Link>
        </Box>
        <Box>
          <Link>
            <Image borderRadius ="10px" src = "images/thumbnail.png"   />
            <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
          </Link>
        </Box>
        <Box>
          <Link>
            <Image borderRadius ="10px" src = "images/thumbnail.png"   />
            <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
          </Link>
        </Box>
        
      </SimpleGrid>
        
          
       
      </Box>
    </Box>


  )
}
