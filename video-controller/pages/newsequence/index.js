import {Box,HStack,Button,Center,Image, Text, Link, VStack,Input} from '@chakra-ui/react'
import Header from '../../styles/header'
import { useState,useRef, useEffect } from 'react'
import React from 'react';

export default function newsequence({metadata,seqvideos,seqimages}) {
  
  const [tmpFullSeq, setTmpFullSeq] = React.useState([]);
  const [tmpSeq,setTmpSeq] =React.useState([]);
  const [tmpSeqImg, setTmpSeqImg] = React.useState([]);
  const [fullSeq,setFullSeq] = React.useState([]);
  const [seqName, setSeqName] = React.useState("");

 /* Setting the state of tmpFullSeq to the value of metadata[0]['video_names'] */
  useEffect(()=>{
    if(metadata.length === 0){
      setTmpFullSeq([]);
    }
    else{
      setTmpFullSeq(metadata[0]['video_names'])
    }
  }, [metadata])

  /* Setting the state of tmpSeq to the value of seqvideos[0]['video_names'] */
  useEffect(()=>{
    if(seqvideos.length === 0){
      setTmpSeq([])
    }else{
      setTmpSeq(seqvideos[0]['video_names'])
    }
  },[seqvideos])
  
  /* Setting the state of tmpSeqImg to the value of seqimages[0]['img_names'] */
  useEffect(()=>{
    if(seqimages.length === 0){
      setTmpSeqImg([])
    }else{
      setTmpSeqImg(seqimages[0]['img_names'])
    }
  },[seqimages])


  /* Setting the state of fullSeq to the value of tmpFullSeq and tmpSeq. */
  useEffect(()=>{
    if(tmpSeq.length !==0){
      setFullSeq([...tmpFullSeq,...tmpSeq])
    }
    
  }, [tmpFullSeq,tmpSeq])

  /* Setting the state of fullSeq to the value of tmpFullSeq and tmpSeqImg. */
  useEffect(()=>{
    if(tmpSeqImg.length !==0){
      setFullSeq([...tmpFullSeq,...tmpSeqImg])
    }
  }, [tmpFullSeq,tmpSeqImg])

 


  let saveForLater = async (e)=>{
      
     
      let res = await fetch("http://localhost:3005/api/fullseq", {
      method: "POST",
      body: JSON.stringify({
        video_names: fullSeq,
      }),
    });
    res = await res.json();
   
  }

  let saveDatabase = async (e)=>{

    
    let res = await fetch("http://localhost:3005/api/sequences", {
    method: "POST",
    body: JSON.stringify({
      seq_name: seqName,
      sequence: fullSeq,
    }),
  });
  res = await res.json();
 
  setTmpSeq([]);
  setTmpFullSeq([]);
  setFullSeq([]);
  setSeqName("");
}

  return (
    <Box>
      <Header title ={"New Sequence"}/>
      <HStack ml="5%">
        <Box  borderRadius ="10px" bg="#E4DED2"  minW="45%"maxW="25%" maxH="60%" mr="20%" >
          <Text align={"center"} fontSize="25px" textColor={"#405F73"}>State of the Sequence</Text>
          <Input bg="#E4DED2" borderRadius ="10px"w="300px" placeholder='Name of the sequence' _placeholder={{ opacity: 0.9, color: '#405F73' }} value={seqName}  onChange={(e)=> setSeqName(e.target.value)}/>
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
            <Link onClick={saveDatabase} href = '/sequences'>
              <Button  width="100px" height="40px" bg="#405F73">
                <Text textColor={"#E4DED2"} >FINISH</Text>
              </Button>
            </Link>
            
          </Box>
        </Box>
    
      <VStack >
        <Link href='/choosevideo' onClick={saveForLater}>
          <Button width="200px" height="60px" bg="#E4DED2">
            <Image borderRadius ="10px" src = "images/add.png" w="30px" mr="5%" />
            <Text>Add Videos</Text>
          </Button>
        </Link>
        <Link href='/chooseimage' onClick={saveForLater}>
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

  let dres = await fetch("http://localhost:3005/api/fullseq", {
        method: "DELETE",
      });

  let ures= await fetch("http://localhost:3005/api/tmp",{
    method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  let seqvideos = await ures.json();
  let tres = await fetch("http://localhost:3005/api/tmp", {
    method: "DELETE",
  });

   
  
  let ires= await fetch("http://localhost:3005/api/tmpimages",{
    method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  let seqimages= await ires.json(); 
  let sres = await fetch("http://localhost:3005/api/tmpimages", {
        method: "DELETE",
   });
    
  
 
 

  return {
      props: { metadata,seqvideos,seqimages },
  };
}

