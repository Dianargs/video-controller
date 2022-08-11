import { Box, VStack, Image ,Text } from '@chakra-ui/react'

const ButtonSmall = ({title,icon}) => {
    return ( 
      <Box bg="#E4DED2" borderRadius ="5px" textAlign="center"   width="90px" height="90px"    >
          <VStack>
            <Image src = {icon} width="50px" />
            <Text  textColor={"#405F73"} fontSize={'larger'}>{title}</Text>
          </VStack>
      </Box>
    )
  }

  
export default ButtonSmall
