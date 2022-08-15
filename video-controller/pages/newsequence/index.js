import {Box,HStack,Button,Center,Image, Text, Link, VStack} from '@chakra-ui/react'
import Header from '../../styles/header'
import { useState,useRef, useEffect } from 'react'
import React from 'react';

export default function newsequence({metadata,seqvideos}) {
  
  const [tmpFullSeq, setTmpFullSeq] = React.useState(metadata[0]['video_names']);
  const [tmpSeq,setTmpSeq] =React.useState(seqvideos[0]['video_names']);
  const [fullSeq,setFullSeq] = React.useState([]);
 
  useEffect(()=>{
    setFullSeq([...tmpFullSeq,...tmpSeq])
  }, [tmpFullSeq,tmpSeq])

  console.log(fullSeq);


  let saveForLater = async (e)=>{
      let dres = await fetch("http://localhost:3005/api/fullseq", {
        method: "DELETE",
      });
      dres = await dres.json();

      let tres = await fetch("http://localhost:3005/api/tmp", {
        method: "DELETE",
      });
      tres = await tres.json();
 
     
      let res = await fetch("http://localhost:3005/api/fullseq", {
      method: "POST",
      body: JSON.stringify({
        video_names: fullSeq,
      }),
    });
    res = await res.json();
    
    
  }
  
  

  return (
    <Box>
      <Header title ={"New Sequence"}/>
      <HStack ml="5%">
        <Box  borderRadius ="10px" bg="#E4DED2"  minW="45%"maxW="25%" maxH="60%" mr="20%" >
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
    
      <VStack >
        <Link href='/choosevideo' onClick={saveForLater}>
          <Button width="200px" height="60px" bg="#E4DED2">
            <Image borderRadius ="10px" src = "images/add.png" w="30px" mr="5%" />
            <Text>Add Videos</Text>
          </Button>
        </Link>
        <Link href='/chooseimage'>
          <Button width="200px" height="60px" bg="#E4DED2">
            <Image borderRadius ="10px" src = "images/add.png" w="30px" mr="5%" />
            <Text>Add Image</Text>
          </Button>
        </Link>
      </VStack>
 
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
          <Text  fontSize="25px" textColor={"#405F73"}  ml="2%">Sequence</Text>
          <HStack m="1%" spacing={5} >
            <Text  fontSize="25px" textColor={"#405F73"}  ml="2%" >1</Text>
            <Image borderRadius ="10px" src = "images/thumbnail.png" w="10%"  />
            <Image src = "images/arrows.png" width="50px" m="2" />
              
          </HStack>
        
        </Box>
        
      </Center>
    </Box>


  )
}
//aqui tem de ir o get da fullseq (atualizado cada vez que abre a pag)
export async function getServerSideProps(context) {
  

  let res = await fetch("http://localhost:3005/api/fullseq", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });
  
  let metadata = await res.json();

  let ures= await fetch("http://localhost:3005/api/tmp",{
    method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });

  let seqvideos = await ures.json(); 
 

  return {
      props: { metadata,seqvideos },
  };
}

