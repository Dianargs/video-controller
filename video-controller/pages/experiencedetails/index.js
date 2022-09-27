import {Box,HStack, Link,Text, VStack,Textarea,AspectRatio} from '@chakra-ui/react'
import React from 'react';
import  Button from '../../styles/button.js'
import Header from '../../styles/header.js'

export default function Home() {
  const [notes, setNotes] = React.useState('')
  return (
    <Box >
        <Header title ={"Details about the experience"}/>
        <HStack>
          <VStack ml="5%" border={"4px solid #bbcdff" } borderRadius ="10px" p="5px">
            <Text mt="3%" color={"#6980e0"}  fontSize="28px">Showing Now:</Text>
            <Text mt="3%" color={"#6980e0"}  fontSize="28px">SickToy.MP4</Text>
          </VStack>
        
        </HStack>
        <Textarea bg="#bbcdff" borderRadius ="10px" mt="5%" ml="3%" h="200px" w="40%" placeholder='Add Details about the experiment...' _placeholder={{ opacity: 0.9, color: '#6980e0' }} value={notes}  onChange={(e)=> setNotes(e.target.value)} type ="text"/>
        <Box  ml="18%" mt="2%"  >
          <Link href='/playsequence'>
              <Button title={"Choose other videos"} icon ={"images/addVideoIcon.png"}/>
          </Link>
        </Box>
    </Box>
  )
}
