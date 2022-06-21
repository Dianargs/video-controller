import { Box, HStack, Image ,Text } from '@chakra-ui/react'

const ButtonSmall = ({title,icon}) => {
    return ( 
      <Box bg="#E4DED2" borderRadius ="5px" textAlign="center"   width="200px" height="60px" horizontalAlign   >
          <HStack>
            <Image src = {icon} width="50px" m="2" />
            <Text  fontSize={'larger'}>{title}</Text>
          </HStack>
      </Box>
    )
  }

  
export default ButtonSmall
