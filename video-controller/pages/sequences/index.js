import {Box,HStack,Button,Center,Image, Text, Link, VStack, Popover, PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,} from '@chakra-ui/react'
import Header from '../../styles/header'
import { useState,useRef, useEffect } from 'react'
import React from 'react';
import LittleButton from '../../styles/littleButton';

export default function sequences({metadata}) {
  const [seq,setSeq] = React.useState([]);

  useEffect(()=>{
    setSeq(metadata)
  }, [metadata])

  let cleanHistory = async (e)=>{
    let dres = await fetch("http://localhost:3005/api/fullseq", {
      method: "DELETE",
    });
   

    let tres = await fetch("http://localhost:3005/api/tmp", {
      method: "DELETE",
    });
    

    let ires = await fetch("http://localhost:3005/api/tmpimages", {
      method: "DELETE",
    });
}


  return (
    <Box>
      <Header title ={"Sequences"}/>
      <HStack ml="4%">  
        <Link href='/newsequence' onClick={cleanHistory}>
          <Button bg="#ffffff" textColor={'#6980e0'} fontSize={"17px"} borderRadius ="10px" textAlign="center" p="2px"  width="200px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" }>
            <Image borderRadius ="10px" src = "images/plus.png" w="30px" mr="10%" />
            <Text>New Sequence</Text>
          </Button>
        </Link>
      </HStack>
      
    
  
      <Box borderRadius ="10px" bg="#eaf3fa" mt="1%" ml="4%"  maxW={"40%"} h="520px" overflowY="auto"  css={{ 
              '&::-webkit-scrollbar': 
              { width: '4px', },
              '&::-webkit-scrollbar-track': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#2b468b',
                borderRadius: '24px',
              },
              }} >
        <Text  fontSize="25px" textColor={"#2b468b"}  ml="2%">Existing Sequences</Text>
        <VStack mt="1%" spacing={5} verticalAlign={"Center"}  >
          {seq.map((cur,index) => (
            <VStack verticalAlign={"Center"}>
              <Text  fontSize="25px" textColor={"#6980e0"} ml="2%" w="100%" >{cur['seq_name']}</Text>
                <Box mt="2%">
                  <Popover >
                  <PopoverTrigger>
                  <Link >
                      <LittleButton title={'Show Sequence'} >
                      
                      </LittleButton>
                  </Link>
                  </PopoverTrigger>
                  <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>{cur['seq_name']}</PopoverHeader>
                      <PopoverBody>
                      
                      {cur['sequence'].map((curr,ind)=>(
                          <Text textColor={'#2b468b'}>{curr}</Text>
                      ))}                   
                      </PopoverBody>
                  </PopoverContent>
                  </Popover>    
                  </Box>
            </VStack>
          ))}
          
        </VStack>
      </Box>
    
    </Box>


  )
}
//aqui tem de ir o get da fullseq (atualizado cada vez que abre a pag)
export async function getServerSideProps(context) {
  

  let res = await fetch("http://localhost:3005/api/sequences", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });
  
  let metadata = await res.json();


  return {
      props: { metadata },
  };
}

