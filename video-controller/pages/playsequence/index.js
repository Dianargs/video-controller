import {Box,HStack, Link, Select, Input,Text, Center} from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react';
import ReactDOM from 'react-dom';

import  Button from '../../styles/button.js'
import Header from '../../styles/header.js'

export default function playsequence({initialData}) {
  
  const [data, setData] = useState(initialData);
  
  const sendMessage = async (message) => {
    //const req = fetch("http://192.168.1.154:3005/api/producer?message=" + message + "&topic=quickstart");
    //const req = fetch("http://192.168.1.141:3005/api/producer?message=" + message + "&topic=quickstart"); //casa
    const req = fetch("http://192.168.0.100:3005/api/producer?message=" + message + "&topic=quickstart");
    return setData(req);
  }

  const handleClick = (event, message) => {
    //event.preventDefault();
    sendMessage(message);
  }

  //handling input 
  const [value, setValue] = React.useState('')
  const [partName, setPartName] = React.useState('')

  const handleChange = (event) => setValue(event.target.value)
  
  return (
    <Box>
      <Header title ={"Play Experience"}/>
      <Center>
        <HStack spacing={20} mt="1%">
          <Select placeholder='Choose a Sequence' bg={"#E4DED2"} w="50%" ml={"5%"}>
            <option value='option1'>Sequence 1</option>
            <option value='option2'>Sequence 2</option>
            <option value='option3'>Sequence 3</option>
          </Select>
          <HStack >
            <Text color={"#E4DED2"} >Date </Text>
            <Input placeholder='Day' size='sm' w="11%" textAlign={'center'}></Input>
            <Text color={"#E4DED2"} >- </Text>
            <Input placeholder='Month' size='sm' w="12%" textAlign={'center'}></Input>
            <Text color={"#E4DED2"} >- </Text>
            <Input placeholder='Year' size='sm' w="12%" textAlign={'center'}></Input>
          </HStack>
        </HStack>
      </Center>
      <Text mt="1%" color={"#E4DED2"} textAlign={'center'} fontSize="28px">Participant Name:</Text>
      <Center mt="1%">
        <Input placeholder='ex: 1,2,3' _placeholder={{ opacity: 0.9, color: '#405F73' }} size='md' h="60px" w="200px"  bg="#E4DED2" value={partName}  onChange={(e)=> setPartName(e.target.value)} type ="text"/>
      </Center>
      <Text mt="1%" color={"#E4DED2"} textAlign={'center'} fontSize="28px">Choose the name of the videos you want to show:</Text>
      <Center mt="1%">
        <Input placeholder='ex: 1,2,3' _placeholder={{ opacity: 0.9, color: '#405F73' }} size='md' h="60px" w="500px"  bg="#E4DED2" value={value}  onChange={handleChange} type ="text"/>
      </Center>

      <Center>
        <HStack justify={'center'} verticalAlign={'center'} h='40vh' spacing={200}>
            <Link href='/addvideo'>
              <Button title={"Play Training Period"} icon ={"images/experience.png"} />
            </Link>
            <Link onClick={()=>sendMessage("play;"+partName+";"+value)} href='/experiencedetails'>
              <Button  title={"Play Sequence"} icon ={"images/play-button.png"} />
            </Link>
        </HStack>
      </Center>
    </Box>
  )
}

playsequence.getInitialProps = async () => {
  return { initialData: 'OK' };
}