import {Box,HStack,Button,Center,Image, Text, Link, VStack,Input,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure} from '@chakra-ui/react'
import Header from '../../styles/header'
import { useState,useRef, useEffect } from 'react'
import React from 'react';

export default function newsequence({metadata,seqvideos,seqimages,infoV}) {
  
  const [tmpFullSeq, setTmpFullSeq] = React.useState([]);
  const [tmpSeq,setTmpSeq] =React.useState([]);
  const [tmpSeqImg, setTmpSeqImg] = React.useState([]);
  const [fullSeq,setFullSeq] = React.useState([]);
  const [seqName, setSeqName] = React.useState("");
  const [infoVideo, setInfoVideo] = React.useState([]);
  const [tmp, setTmp] = React.useState([]);
  var aux = [];
  const { isOpen, onOpen, onClose } = useDisclosure()


 /* Setting the state of tmpFullSeq to the value of metadata[0]['video_names'] */
  useEffect(()=>{
    if(metadata.length === 0){
      setTmpFullSeq([]);
    }
    else{
      setTmpFullSeq(metadata[0]['video_names'])
    }
  }, [metadata])
  
  useEffect(()=>{
    setInfoVideo(infoV)
  }, [infoV])

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


  useEffect(()=>{
    setTmp(aux)
  },[aux]
  )


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
const VideoSequence = (e) =>{
  var tmpa =[];
  
  for (let index = 0; index < fullSeq.length; index++) {
    
    for (let i = 0; i < infoVideo.length; i++) {
      if(infoVideo[i]['new_video_name'].includes(fullSeq[index])){
       
        tmpa.push(infoVideo[i]);
      }
        
    }
  }

  aux = tmpa;


}
const getSequence = (cur) =>{
  console.log(cur);
  if(cur.substring((cur.length-4),cur.length) == '.png'){
     console.log("image");
    return(<Box>
      <Text>{cur}</Text>
      <Image src={"http://192.168.0.100:8085/download_content/images/"+cur} w="200px"/>
    </Box>)
  }else{
    console.log("video");
    for( let i =0; i<tmp.length ; i++){
      if(cur == tmp['new_video_name'] ){
        return(
        <Box>
          <Text>{tmp['new_video_name']}</Text>
          <Image src={tmp['thumbnail']}/>
        </Box>)
      }
    }
   
    
  }   
}



  return (
    <Box>
      <Header title ={"New Sequence"}/>

      <VStack >
        <Link href='/choosevideo' onClick={saveForLater}>
          <Button bg="#ffffff" textColor={'#6980e0'} borderRadius ="10px" textAlign="center" p="2px"  width="200px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" }>
            <Image borderRadius ="10px" src = "images/plus.png" w="30px" mr="5%" />
            <Text>Add Videos</Text>
          </Button>
        </Link>
        <Link href='/chooseimage' onClick={saveForLater}>
          <Button bg="#ffffff" textColor={'#6980e0'} borderRadius ="10px" textAlign="center" p="2px"  width="200px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" }>
            <Image borderRadius ="10px" src = "images/plus.png" w="30px" mr="5%" />
            <Text>Add Image</Text>
          </Button>
        </Link>
      </VStack>
   
      <Center mt="1%">
        <Box borderRadius ="10px" bg="#bbcdff" minW="95%" minH="90%" overflow="auto"  css={{ 
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
          <Text  fontSize="25px" textColor={"#6980e0"}  ml="2%">Sequence</Text>
          <HStack m="1%" spacing={5} >
          {fullSeq.map((cur,i)=>(
           (cur.substring((cur.length-4),cur.length) == '.png') ?  
           <Box>
            <Text>{cur}</Text>
            <Image src={"http://192.168.0.100:8085/download_content/images/"+cur} w="370px"/>
          </Box> 
          : 
          ( tmp.map((curr,ind)=>(
            fullSeq[i] == tmp[ind]['new_video_name'] ? 
            <Box>
            <Text>{tmp[ind]['new_video_name']}</Text>
            <Image src={tmp[ind]['thumbnail']}/>
          </Box> : null
           )
           ))
            
          ))}
          
          <VideoSequence/>
          
              
          </HStack>
          
        </Box>
        
      
      </Center>
      <Center mt="5%">
        
        <Link onClick={onOpen} >
          <Button bg="#ffffff" textColor={'#6980e0'} fontSize={"18px"} borderRadius ="10px" textAlign="center" p="2px"  width="200px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" }>
            <Text>Done</Text>
          </Button>
        </Link>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Name your sequence</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input bg="#ffffff" borderRadius ="10px" w="98%" ml="1%" placeholder='Name of the sequence' _placeholder={{ opacity: 0.9, color: '##6980e0' }} value={seqName}  onChange={(e)=> setSeqName(e.target.value)}/>
            </ModalBody>

            <ModalFooter>
            <Link onClick={saveDatabase} href = '/sequences'>
              <Button  bg="#ffffff" textColor={'#6980e0'} borderRadius ="10px" textAlign="center" p="2px"  width="100px" height="40px" verticalAlign="center" border={"4px solid #bbcdff" }>
                <Text textColor={'#6980e0'} >FINISH</Text>
              </Button>
            </Link>
              <Button  bg="#ffffff" textColor={'#6980e0'} borderRadius ="10px" textAlign="center" p="2px"  width="100px" height="40px" verticalAlign="center" border={"4px solid #bbcdff" } onClick={onClose}>
                Close
              </Button>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
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
  
   let pres = await fetch("http://localhost:3005/api/infovideos", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  }); 
   let infoV = await pres.json();
   
   
  return {
      props: { metadata,seqvideos,seqimages,infoV},
  };
}

/* <Box borderRadius ="10px" m="2.5%" maxW="95%"
              as='video'
              controls
              src='SAM_100_0293.mp4'
              alt='Big Buck Bunny'
              objectFit='contain'
              sx={{
                aspectRatio: '16/9'
              }}
          />*/