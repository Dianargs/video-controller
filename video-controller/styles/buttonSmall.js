import { Box, HStack, Image ,Text } from '@chakra-ui/react'

const ButtonSmall = ({title,icon}) => {
    return ( 
      <Box bg="#FFFFFF" borderRadius ="10px"  textAlign="center"  p="12px"  width="130px" height="70px" verticalAlign="center"    >
          <HStack>
            <Image src = {icon} width="30px" />
            <Text  textColor={"#6980e0"} fontSize={"22px"}>{title}</Text>
          </HStack>
      </Box>
    )
  }

  
export default ButtonSmall
