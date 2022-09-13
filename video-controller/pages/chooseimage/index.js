import {Box,Text,Image,SimpleGrid, Link, HStack, Center,Button} from '@chakra-ui/react'
import { useState,useRef } from 'react'
import React from 'react';
import Header from '../../styles/header'

import ButtonSmall from '../../styles/buttonSmall';

export default function chooseimage({metadata}) {
  const [imgSrc,setImgSrc] = React.useState(null);
  const [seqImg,setSeqImg] = React.useState([]);
 
  const updateList = (imgName)=>{
    setSeqImg(seqImg.filter(index=> index !== imgName ))
  }
  
  
  
  const ShowButton =(e) => {
    return( 
    <Link onClick={(e)=>setSeqImg([...seqImg,imgSrc])} >
      <Button bg="#ffffff"  textColor={'#6980e0'}  fontSize={"15px"} borderRadius ="10px" textAlign="center" p="2px"  width="190px" height="60px" verticalAlign="center" border={"2px solid #2b468b" } >
        <Image borderRadius ="10px" src = "images/check-mark.png" w="30px" mr="2%"   />
        <Text>Add to the List</Text>
      </Button>
    </Link>
    )
  }
  let  submitSeq = async (e) => {

    let res = await fetch("http://localhost:3005/api/tmpimages", {
      method: "POST",
      body: JSON.stringify({
        img_names: seqImg,
      }),
      headers:{'Content-Type':'application/json'}
    });
    res = await res.json();
  
}


  const PreviewBox = (e) =>  {
    return( 
      <Box bg="#bbcdff" borderRadius ="10px"  p="1%" minW="50%" h="520px" >
        <Text  fontSize="25px" textColor={"#2b468b"} >{imgSrc}</Text>
        <Center>
            <Image src={"http://192.168.0.100:8085/download_content/images/"+imgSrc} maxH="380px"/>
        </Center>
        <HStack>
          <Box mt="2%">
            { seqImg.length<3 ? <ShowButton/> : <Text textColor={"#2b468b"}>No more space</Text>}  
            <Link onClick={(e)=>updateList(imgSrc)} >
              <Button bg="#ffffff"  textColor={'#6980e0'}  fontSize={"15px"} borderRadius ="10px" textAlign="center" p="2px"  width="190px" height="60px" verticalAlign="center" border={"2px solid #2b468b" } >
                <Image borderRadius ="10px" src = "images/cancel.png" w="30px" mr="2%" />
                <Text>Remove from the list</Text>
              </Button>
            </Link>
          </Box>
        </HStack>
      </Box>
    )
} 

  return (
    <Box>
      <Header title ={"Choose Image"}/>
      <HStack>
        <Box bg="#bbcdff" borderRadius ="10px"  p="0.5%" w="100%" h="100px">
            <Text textColor={"#2b468b"} textAlign={"center"}>This object was touched by a healthy or unhealthy person? </Text>
            <Image src={"http://192.168.0.100:8085/download_content/images/Image1.png"}  maxH="75%"/>
        </Box>
        { seqImg.length==3 ? <Link onClick={submitSeq} href='/newsequence'><ButtonSmall title={"Submit"} icon ={"images/plus.png"} /></Link> : null}
      </HStack>
      <HStack mt="1%">
        <Box bg="#bbcdff" borderRadius ="10px"  p="0.5%" maxW="50%" h="520px" overflow="auto" css={{ 
                '&::-webkit-scrollbar': 
                { width: '1px', },
                '&::-webkit-scrollbar-track': {
                  width: '1px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#405F73',
                  borderRadius: '24px',
                },}} >
          <SimpleGrid columns={3} spacing={2} ml="1%">     
          {metadata.map((currentElement, index) => (
            <Link onClick={(e)=>setImgSrc(currentElement)}>
              <Box >
                <Text textColor={"#2b468b"}> {currentElement} </Text>
                <Image src={"http://192.168.0.100:8085/download_content/images/"+currentElement}/>
              </Box>
            </Link>
          ))}
          </SimpleGrid> 
        </Box>
        { imgSrc ? <PreviewBox/> : null }
      </HStack>
    </Box>
  )
}

/**
 * It fetches the metadata from the server and returns it as a prop to the page.
 * @param context - An object containing the following keys:
 * @returns The metadata object is being returned.
 */
export async function getServerSideProps(context) {
 
  let res = await fetch("http://localhost:8085/list_contents/images", {
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

