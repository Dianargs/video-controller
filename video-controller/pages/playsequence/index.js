import {Box,HStack, Link, Select, Input,Text, Center} from '@chakra-ui/react'
import { useState,useEffect } from 'react'
import React from 'react';
import ReactDOM from 'react-dom';

import  Button from '../../styles/button.js'
import Header from '../../styles/header.js'

export default function playsequence({initialData, metadata}) {
  
  const [data, setData] = useState(initialData);
  const [value, setValue] = React.useState('')
  const [partName, setPartName] = React.useState('')
  const [seq, setSeq] = useState([]);
  const [optionSet, setOption] = useState('');
  const [seqName, setSeqName] = useState([]);


  useEffect(()=>{
    setSeq(metadata)
  }, [metadata])

  useEffect(()=>{
    console.log(optionSet)
  },[optionSet])
  
  const sendMessage = async (message) => {

    const req = fetch("http://192.168.0.100:3005/api/producer?message=" + message + "&topic=quickstart");
    return setData(req);
  }

  const handleClick = (event, message) => {
    //event.preventDefault();
    sendMessage(message);
  }


  const getValue =  (e)=>{
    const str = "";


    if(optionSet !== 0){
      seq.map((cur,i) =>{
        if(cur['seq_name'] === optionSet){
          str = cur['sequence'].toString();
        }
      })
    }
    const res = optionSet + ";" + str
    
    return res;
  }

  return (
    <Box>
      <Header title ={"Play Experience"}/>
      <Center>
        <HStack spacing={20} mt="1%">
          <Select placeholder='Choose a Sequence' bg={"#E4DED2"} w="50%" ml={"5%"} value={optionSet} onChange={(e)=> setOption(e.target.value)}>
            {seq.map((cur,index)=> (
              <option value={cur['seq_name']}  >{cur['seq_name']}</option>
            ))}
          </Select>
          <HStack >
            <Text color={"#E4DED2"} >Date</Text>
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
      

      <Center>
        <HStack justify={'center'} verticalAlign={'center'} h='40vh' spacing={200}>
            <Link  onClick={()=>getValue()}>
              <Button title={"Play Training Period"} icon ={"images/experience.png"} />
            </Link>
            <Link onClick={()=>sendMessage("play;"+partName+";"+ getValue())} href='/experiencedetails' >
              <Button  title={"Play Sequence"} icon ={"images/play-button.png"} />
            </Link>
        </HStack>
      </Center>
    </Box>
  )
}

playsequence.getInitialProps = async () => {
  let res = await fetch("http://localhost:3005/api/sequences", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });
  
  let metadata = await res.json();

  return { initialData: 'OK' , metadata};
}