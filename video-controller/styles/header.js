import { Flex, Image, Text, Link,Box, Spacer } from '@chakra-ui/react'




const Header = ({title}) => {
  return (
    <Flex px='50px' py='10px' bg='transparent' h='10%'>
      <Text color='#8c9ef4' fontSize={'40px'} >
      {title}
      </Text>
      <Spacer />
      <Link href='\'  float={'right'}>
      <Box bg="#ffffff" borderRadius ="5px" textAlign="center" p="4px"  width="120px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" }  >
        <Text mt="10px" fontSize={'larger'} textColor="#8c9ef4">Go back</Text>
      </Box>
    </Link>
    </Flex>
    
  
  )
}

export default Header
