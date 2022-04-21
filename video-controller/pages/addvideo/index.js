import {Box,Textarea,Checkbox, Image, Text, Button, Input, HStack, VStack, Center} from '@chakra-ui/react'
import Header from '../../styles/header'


export default function addvideo() {
  return (
   
    <Box >
      <Header title ={"Add Video"}/>
      <Center>
        <HStack mt="5%" ml="5%" spacing={10} >
          <Button width="200px" height="60px" bg="#E4DED2">
            <Image src = "images/addVideoIcon.png" width="50px" m="2" />
            <Text >New Video</Text>
          </Button>
          <Input placeholder='Video Name' _placeholder={{ opacity: 0.9, color: '#405F73' }} size='md' h="60px" w="500px"  bg="#E4DED2" />
        </HStack>
      </Center>
      <Center>
        <HStack mt="2%" ml="5%" spacing={10}>
          <Image borderRadius ="10px" src = "images/thumbnail.png" w="735px" />
          <Textarea bg="#E4DED2" borderRadius ="10px" h="370px" w="300px" placeholder='Add Details about the video here...' _placeholder={{ opacity: 0.9, color: '#405F73' }}/>
          <VStack bg="#E4DED2" borderRadius="10px" align={'center'} w="20%" maxH="370px">
            <Input mt="5px" mb="5px" w="90%" placeholder='Find your tag' bg={'white'} _placeholder={{ opacity: 0.7, color: '#405F73' }}/>
            <Box w="90%" overflow="auto" css={{ 
              '&::-webkit-scrollbar': 
              { width: '4px', },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#405F73',
                borderRadius: '24px',
              },
              }}>
              <VStack align={'left'} >
                <Checkbox borderColor="#405F73">Contaminated</Checkbox>
                <Checkbox borderColor="#405F73" >Clean</Checkbox>
                <Checkbox borderColor="#405F73">Sick Subject</Checkbox>
                <Checkbox borderColor="#405F73">Healthy Subject</Checkbox>
                <Checkbox borderColor="#405F73">Contaminated</Checkbox>
                <Checkbox borderColor="#405F73" >Clean</Checkbox>
                <Checkbox borderColor="#405F73">Sick Subject</Checkbox>
                <Checkbox borderColor="#405F73">Healthy Subject</Checkbox>
                <Checkbox borderColor="#405F73">Contaminated</Checkbox>
                <Checkbox borderColor="#405F73" >Clean</Checkbox>
                <Checkbox borderColor="#405F73">Sick Subject</Checkbox>
                <Checkbox borderColor="#405F73">Healthy Subject</Checkbox>   
              </VStack>
            </Box>  
          </VStack>  
        </HStack>
      </Center>
    </Box>
  )
}
