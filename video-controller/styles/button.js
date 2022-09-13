import { Box, HStack, Image ,Text } from '@chakra-ui/react'

const Button = ({title,icon}) => {
    return ( 
      <Box bg="#ffffff" borderRadius ="5px" textAlign="center" p="4px"  width="200px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" }  >

        <Text mt="10px" fontSize={'larger'} textColor="#8c9ef4">{title}</Text>
      </Box>
    )
  }

  
export default Button
