import {Box,HStack, Link, Select, Input,Text, Center,Image} from '@chakra-ui/react'
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
      <Box mt="1%">
        <Select placeholder='Choose a Sequence'_placeholder={{ opacity: 0.9, color: '#6980e0' }} bg={"#bbcdff"} w="30%" ml={"10%"} value={optionSet} onChange={(e)=> setOption(e.target.value)}>
          {seq.map((cur,index)=> (
            <option value={cur['seq_name']}  >{cur['seq_name']}</option>
          ))}
        </Select>
        
      </Box>
      <Text  ml={"18%"}  mt="1%" color={"#6980e0"} textAlign={'left'} fontSize="28px">Participant Name:</Text>
      <Box  ml={"18%"}  mt="1%">
        <Input placeholder='ex: 1,2,3' _placeholder={{ opacity: 0.9, color: '#6980e0' }} size='md' h="60px" w="200px"  bg="#bbcdff" value={partName}  onChange={(e)=> setPartName(e.target.value)} type ="text"/>
      </Box>
      

      
        <HStack ml={"5%"} justify={'left'} verticalAlign={'center'} h='40vh' spacing={200}>
            <Link  onClick={()=>getValue()}>
              <Image src ={"images/presentation.png"} width="90px" ml="25%" mb="2%" />
              <Button title={"Play Training Period"}/>
            </Link>
            <Link onClick={()=>sendMessage("play;"+partName+";"+ getValue())} href='/experiencedetails' >
              <Image src ={"images/flow-chart.png"} width="90px" ml="25%" mb="2%" />
              <Button  title={"Play Sequence"}/>
            </Link>
        </HStack>
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