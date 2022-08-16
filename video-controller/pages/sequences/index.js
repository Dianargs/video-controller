import {Box,HStack,Button,Center,Image, Text, Link, VStack} from '@chakra-ui/react'
import Header from '../../styles/header'
import { useState,useRef, useEffect } from 'react'
import React from 'react';

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
      <HStack ml="5%">  
        <Link href='/newsequence' onClick={cleanHistory}>
          <Button width="200px" height="60px" bg="#E4DED2">
            <Image borderRadius ="10px" src = "images/add.png" w="30px" mr="5%" />
            <Text>New Sequence</Text>
          </Button>
        </Link>
 
      </HStack>
      
      <Center mt="1%">
  
        <Box borderRadius ="10px" bg="#E4DED2" minW="95%" minH="90%" overflow="auto"  css={{ 
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
          <Text  fontSize="25px" textColor={"#405F73"}  ml="2%">Sequences</Text>
          <VStack m="1%" spacing={5} >
            {seq.map((cur,index) => (
                <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >{cur['seq_name']}</Text>
            ))}
            
          </VStack>
        </Box>
      </Center>
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

