import {Box,Text,Image,SimpleGrid, Link,VStack,HStack, Center,Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure,UnorderedList,ListItem,Button,AspectRatio, Img,CheckboxGroup,Checkbox, filter} from '@chakra-ui/react'
import { useState,useRef, useEffect } from 'react'
import React from 'react';
import Header from '../../styles/header'
import ButtonSmall from '../../styles/buttonSmall';


export default function choosevideo({metadata,filters}) {
  const [videoSrcInfo,setVideoSrcInfo] = React.useState(null);
  const [videoSrc,setVideoSrc] = React.useState(null);
  const [seqVideos, setSeqVideos] = React.useState([]);
  const [filterState, setFilterState] = React.useState(filters);
  const [tags, setTags] = React.useState([])
  const [met,setMet] = React.useState(metadata)
  const videoRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(()=>{
    setMet(met)
  }, [met])

  const updateList = (videoName)=>{
    setSeqVideos(seqVideos.filter(index=> index !== videoName ))
  }

  
  const ShowButton =(e) => {
    return( 
    <Link onClick={(e)=>setSeqVideos([...seqVideos,videoSrcInfo['new_video_name']])} >
      <Box bg="#405F73" borderRadius ="90%" p="1%" width="50px" height="50px" verticalAlign="center" >
        <Image src = {'images/check.png'}   />
      </Box>
    </Link>
    )
  }

  let  submitSeq = async (e) => {

      let res = await fetch("http://localhost:3005/api/tmp", {
        method: "POST",
        body: JSON.stringify({
          video_names: seqVideos,
        }),
        headers:{'Content-Type':'application/json'}
      });
      res = await res.json();
    
  }

  const PreviewBox = (e) =>  {
    
    return( 

      <Box bg="#E4DED2" borderRadius ="10px"  p="1%" minW="50%" h="520px"  >
        <Text  fontSize="25px" textColor={"#405F73"} >{videoSrcInfo['new_video_name']}</Text>
        <AspectRatio maxH="50%" ratio={16 / 9}>
              <video
                id="video-summary"
                tag={"video/mp4"}
                ref={videoRef}
                controls
                src={"http://localhost:8085/download_content/videos/"+videoSrcInfo['new_video_name']}
              />
          </AspectRatio>
        <Text  textAlign="center" fontSize="20px" textColor={"#405F73"} >{videoSrcInfo['video_info']}</Text>
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
                  {videoSrcInfo['filters'].map((currentElement, index) => (
                    <ListItem>{currentElement}</ListItem>
                  ))}                    
                  </UnorderedList>
                </PopoverBody>
              </PopoverContent>
            </Popover>    
          </Box>
          
          <Box >
            { seqVideos.length<3 ? <ShowButton/> : <Text>No more space</Text>}  
            <Link onClick={(e)=>updateList(videoSrcInfo['new_video_name'])} >
              <Box bg="#405F73" borderRadius ="90%" p="1%" width="50px" height="50px" verticalAlign="center" >
                <Image src = {'images/play-button.png'}   />
              </Box>
            </Link>
          </Box>
        </HStack>
      </Box>
    )
} 
  const FilterButton = (e) => {
    return(
      <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VStack id="checkboxDiv" align={'left'} >
            <CheckboxGroup  value={tags} onChange={(e)=>{setTags(e)}}>
              {filterState.map((currentElement, index) => (
                <Checkbox  value={currentElement.name} key={index} borderColor="#405F73">{currentElement.name}</Checkbox>
              ))}
            </CheckboxGroup>
          </VStack>
          </ModalBody>

          <ModalFooter>
            <Link onClick={updateVideos}>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Done
              </Button>
            </Link>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
      
    )
  }
  const updateVideos = async (e) =>{
    let str ="";
    tags.map((cur,i)=>{
      if(i==0){
        str ="filter="+cur;
      }else{str = str + "&filter="+cur;}
      
    })
    let res = await fetch("http://localhost:3005/api/infovideos?"+str, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    }); 
    setMet(await res.json());
    //setMet(await res.json()) ;
   
    
  }




  return (
    <Box>
      <Header title ={"Choose Video"}/>
      <HStack>
        <FilterButton/>
        
        <Box bg="#E4DED2" borderRadius ="10px"  p="0.5%" w="100%" h="90px"> 
        { seqVideos.length==3 ? <Link onClick={submitSeq} href='/newsequence'><ButtonSmall title={"Submit"} icon ={"images/add.png"} /></Link> : null}
        
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
            
          {met.map((currentElement, index) => (
            <Link onClick={(e)=>setVideoSrcInfo(currentElement)}>
              <Box >
                <Text> {currentElement['new_video_name']} </Text>
                <Image src={currentElement['thumbnail']}/>
        
              </Box>
            </Link>
          ))}
          </SimpleGrid> 
        </Box>
        { videoSrcInfo ? <PreviewBox/> : null }
      </HStack>
    </Box>
    

  )
}
/**
 * The getServerSideProps function is called on the server-side, and it returns an object with a props
 * property that contains the data that will be passed to the component.
 * @param context - An object with the following properties:
 * @returns The props object is being returned.
 */

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3005/api/infovideos", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });
  
  let metadata = await res.json();

  let fres = await fetch("http://localhost:3005/api/filtertags", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  let filters = await fres.json();
  
  return {
      props: { metadata, filters },
  };
}

