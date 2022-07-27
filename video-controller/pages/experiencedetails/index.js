import {Box,HStack, Link,Text, VStack,Textarea} from '@chakra-ui/react'
import React from 'react';
import  Button from '../../styles/button.js'
import Header from '../../styles/header.js'

export default function Home() {
  const [notes, setNotes] = React.useState('')
  return (
    <Box >
        <Header title ={"Details about the experience"}/>
        <HStack>
          <VStack width="300px" mr="10%">
            <Text mt="3%" ml="10%" color={"#E4DED2"} fontSize="28px">Video playing now:</Text>
            <Text mt="3%" ml="10%"color={"#E4DED2"}  fontSize="28px">Video123</Text>
          </VStack>
          <VStack>
            <Text mt="3%" color={"#E4DED2"}  fontSize="28px">Image showing:</Text>
            <Text mt="3%" color={"#E4DED2"}  fontSize="28px">Image3</Text>
          </VStack>
        
        </HStack>
        <Textarea bg="#E4DED2" borderRadius ="10px" mt="5%" ml="5%" h="200px" w="90%" placeholder='Add Details about the experiment...' _placeholder={{ opacity: 0.9, color: '#405F73' }} value={notes}  onChange={(e)=> setNotes(e.target.value)} type ="text"/>
        <HStack justify={'center'} verticalAlign={'center'} mt="2%" spacing="200" >
        <Link href='/playsequence'>
            <Button title={"Choose other videos"} icon ={"images/addVideoIcon.png"}/>
        </Link>
        
        </HStack>
    </Box>
  )
}
