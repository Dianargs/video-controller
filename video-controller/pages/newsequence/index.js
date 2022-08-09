import {Box,HStack,Button,Center,Image, Text, Link} from '@chakra-ui/react'
import Header from '../../styles/header'

export default function newsequence() {
  return (
    <Box>
      <Header title ={"New Sequence"}/>
      <Center>
        <Box  borderRadius ="10px" bg="#E4DED2"  minW="40%"maxW="25%" maxH="60%" >
          <Text align={"center"} fontSize="25px" textColor={"#405F73"}>State of the Sequence</Text>
          <Box borderRadius ="10px" m="2.5%" maxW="95%"
              as='video'
              controls
              src='SAM_100_0293.mp4'
              alt='Big Buck Bunny'
              objectFit='contain'
              sx={{
                aspectRatio: '16/9'
              }}
          />
          <Box w="100%" align={'center'} mb="10px">
            <Button width="100px" height="40px" bg="#405F73">
              <Text textColor={"#E4DED2"} >FINISH</Text>
            </Button>
          </Box>
        </Box>
      </Center>
      <Center mt="2%">
  
        <Box borderRadius ="10px" bg="#E4DED2" minW="95%" minH="90%" overflow="auto" css={{ 
                '&::-webkit-scrollbar': 
                { width: '1px', },
                '&::-webkit-scrollbar-track': {
                  width: '1px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#405F73',
                  borderRadius: '24px',
                },
                }} >
          <Text  fontSize="25px" textColor={"#405F73"}  ml="2%">Sequence</Text>
          <HStack m="1%" spacing={5}>
            <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >1</Text>
            <Image borderRadius ="10px" src = "images/thumbnail.png" w="10%"  />
            <Image src = "images/arrows.png" width="50px" m="2" />

            <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >2</Text>
            <Image borderRadius ="10px" src = "images/thumbnail.png" w="10%"  />
            <Image src = "images/arrows.png" width="50px" m="2" />

            <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >3</Text>
            <Image borderRadius ="10px" src = "images/thumbnail.png" w="10%"  />
            <Image src = "images/arrows.png" width="50px" m="2" />
            <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >3</Text>
            <Image borderRadius ="10px" src = "images/thumbnail.png" w="10%"  />
            <Image src = "images/arrows.png" width="50px" m="2" />
            <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >3</Text>
            <Image borderRadius ="10px" src = "images/thumbnail.png" w="10%"  />
            <Image src = "images/arrows.png" width="50px" m="2" />
            <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >3</Text>
            <Image borderRadius ="10px" src = "images/thumbnail.png" w="10%"  />
            <Image src = "images/arrows.png" width="50px" m="2" />

            <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >4</Text>
            <Link href='/choosevideo'>
              <Button width="200px" height="60px" bg="#E4DED2">
                <Image borderRadius ="10px" src = "images/add.png" w="50px"  />
              </Button>
            </Link>
          </HStack>
        
        </Box>
        
      </Center>
    </Box>


  )
}
