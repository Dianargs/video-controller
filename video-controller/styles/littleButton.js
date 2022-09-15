import { Box, HStack, Image ,Text } from '@chakra-ui/react'

const LittleButton = ({title}) => {
    return ( 
      <Box bg="transparent" borderRadius ="5px" textAlign="center" p="4px"  width="120px" height="30px"  border={"1px solid #6980e0" }  >
        <Text  fontSize={'sm'} textColor="#2b468b">{title}</Text>
      </Box>
    )
  }

  
export default LittleButton
