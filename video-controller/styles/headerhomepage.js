import { Flex, Image, Text , extendTheme} from '@chakra-ui/react'


const HomePageHeader = ({title}) => {
  return (
    <Flex px='50px' py='10px' bg='transparent' h='10%'>
      <Text color='#8c9ef4' fontSize={'55px'} ml="10%"  maxW={"30%"}>
      {title}
      </Text>
      <Flex w='150px' />
    </Flex>
  )
}

export default HomePageHeader
