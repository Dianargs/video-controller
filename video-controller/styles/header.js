import { Flex, Image, Text } from '@chakra-ui/react'

const Header = ({title}) => {
  return (
    <Flex px='50px' py='10px' bg='transparent' h='10%'>
      <Text color='#E4DED2' fontWeight={'bold'} fontSize={'28px'} m='auto'>
      {title}
      </Text>
      <Flex w='150px' />
    </Flex>
  )
}

export default Header
