import {Box,Text,Image,SimpleGrid, Link, HStack, Center,Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor, UnorderedList,ListItem,Button,AspectRatio, Img} from '@chakra-ui/react'
import { useState,useRef, useEffect } from 'react'
import React from 'react';
import Header from '../../styles/header'
import ButtonSmall from '../../styles/buttonSmall';


export default function choosevideo({metadata}) {
  const [showBox,setShowBox] = React.useState(false);
  const [videoMetadata,setVideoMetadata] = React.useState([]);
  const [videoThumb,setVideoThumb] = React.useState();
  const [videoSrc, setVideoSrc] = useState('')
  const videoRef = useRef(null);


  //setVideoMetadata(metadata);
  
  
  console.log(metadata);

  const PreviewBox = () => (
    <Box bg="#E4DED2" borderRadius ="10px"  p="1%" maxW="50%" h="520px" >
      <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
      <Center>
      <Image borderRadius ="10px" src = "images/thumbnail.png" maxW="80%" />
      </Center>
      <Text  textAlign="center" fontSize="20px" textColor={"#405F73"} >Sick Girl holding an apple with clean hands, coughts to the apple.</Text>
      <HStack>
        <Box>
          <Popover >
            <PopoverTrigger>
              <Button bg='#405F73' textColor={"#E4DED2"}>Show Tags</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Tags associated with this video</PopoverHeader>
              <PopoverBody>
                <UnorderedList>
                  <ListItem>Woman</ListItem>
                  <ListItem>Contaminated</ListItem>
                  <ListItem>Fruit</ListItem>
                </UnorderedList>
              </PopoverBody>
            </PopoverContent>
          </Popover>    
        </Box>

        <Box >
          <Link >
            <Box bg="#405F73" borderRadius ="90%" p="1%" width="50px" height="50px" verticalAlign="center"  >
              <Image src = {'images/check.png'}   />
            </Box>
          </Link>
        </Box>
      </HStack>
    </Box>
  )

  return (
    <Box>
      <Header title ={"Choose Video"}/>
      <HStack>
        <ButtonSmall title={"Filters"} icon ={"images/lupa.png"} />
        <Box bg="#E4DED2" borderRadius ="10px"  p="0.5%" w="100%" h="90px"></Box>
      </HStack>
      <HStack mt="1%">
        <Box bg="#E4DED2" borderRadius ="10px"  p="0.5%" maxW="100%" maxH="520px" overflow="auto" css={{ 
                '&::-webkit-scrollbar': 
                { width: '1px', },
                '&::-webkit-scrollbar-track': {
                  width: '1px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#405F73',
                  borderRadius: '24px',
                },}} >
          <SimpleGrid minChildWidth={"300px"} ml="1%">     
            
          {metadata.map((currentElement, index) => (
            <Box >
              <Text> {currentElement['new_video_name']} </Text>
              <Image src={currentElement['thumbnail']}/>
        
            </Box>
          ))}
          </SimpleGrid> 
        </Box>
        { showBox ? <PreviewBox/> : null }
       
      </HStack>
    </Box>
    

  )
}

export async function getServerSideProps(context) {
 
  let res = await fetch("http://localhost:3005/api/infovideos", {
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
