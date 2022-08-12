import {Box,Text,Image,SimpleGrid, Link, HStack, Center} from '@chakra-ui/react'
import { useState,useRef } from 'react'
import React from 'react';
import Header from '../../styles/header'


export default function chooseimage({metadata}) {
  const [imgSrc,setImgSrc] = React.useState(null);
  const videoRef = useRef(null);
 

  const PreviewBox = (e) =>  {
    return( 
      <Box bg="#E4DED2" borderRadius ="10px"  p="1%" minW="50%" h="520px" >
        <Text  fontSize="25px" textColor={"#405F73"} >{imgSrc}</Text>
        <Center>
            <Image src={"http://localhost:8085/download_content/images/"+imgSrc} maxH="380px"/>
        </Center>
        <HStack>
          <Box mt="2%">
            <Link >
              <Box bg="#405F73" borderRadius ="90%" p="1%" width="50px" height="50px" verticalAlign="center"  >
                <Image src = {'images/check.png'}   />
              </Box>
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
        <Box bg="#E4DED2" borderRadius ="10px"  p="0.5%" w="100%" h="100px">
            <Text textAlign={"center"}>Question: This object was touched by a healthy or unhealthy person? </Text>
            <Image src={"http://localhost:8085/download_content/images/Image1.png"}  maxH="75%"/>
        </Box>
      </HStack>
      <HStack mt="1%">
        <Box bg="#E4DED2" borderRadius ="10px"  p="0.5%" maxW="50%" h="520px" overflow="auto" css={{ 
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
                <Text> {currentElement} </Text>
                <Image src={"http://localhost:8085/download_content/images/"+currentElement}/>
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

