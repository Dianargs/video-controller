import { Box, HStack, Image ,Text } from '@chakra-ui/react'

const Button = ({title,icon}) => {
    return ( 
      <Box bg="#E4DED2" borderRadius ="5px" textAlign="center" p="4px"  width="200px" height="200px" verticalAlign="center"  >
        <Image src = {icon} width="100px" mx="auto" mt="30px" />
        <Text mt="10px" fontSize={'larger'}>{title}</Text>
      </Box>
    )
  }

  
export default Button
