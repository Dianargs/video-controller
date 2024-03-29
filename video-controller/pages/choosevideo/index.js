import {Box,Text,Image,Spinner,SimpleGrid, Link,VStack,HStack, Center,Popover,
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
  const [infoVideo, setInfoVideo] = React.useState([]);
  const [tags, setTags] = React.useState([])
  const [met,setMet] = React.useState(metadata)
  const videoRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSubmiting, setisSubmiting] = useState(false)


  useEffect(()=>{
    setMet(met)
  }, [met])

  useEffect(()=>{
    setInfoVideo(infoVideo)
  }, [infoVideo])

  useEffect(()=>{
    setisSubmiting(isSubmiting)
  }, [isSubmiting])


  
  const updateList = (videoName)=>{
    setSeqVideos(seqVideos.filter(index=> index !== videoName ));
    
  }
  const updateListView = (videoName)=>{
    setInfoVideo(infoVideo.filter(index=> index !== videoName ));
  }

  
  const ShowButton =(e) => {
    return( 
  
      <Link onClick={(e)=>{setSeqVideos([...seqVideos,videoSrcInfo['new_video_name']]); setInfoVideo([...infoVideo,videoSrcInfo]);}}>
        <Button bg="#ffffff" textColor={'#6980e0'} fontSize={"17px"} borderRadius ="10px" textAlign="center" p="2px"  width="190px" height="60px" verticalAlign="center" border={"2px solid #2b468b" }>
          <Image borderRadius ="10px" src = "images/check-mark.png" w="30px" mr="2%" />
          <Text>Add to the List</Text>
        </Button>
      </Link>
    )
  }

  let  submitSeq = async (e) => {
    setisSubmiting(true);
      let res = await fetch("http://localhost:3005/api/tmp", {
        method: "POST",
        body: JSON.stringify({
          video_names: seqVideos,
        }),
        headers:{'Content-Type':'application/json'}
      });
      res = await res.json();
      setisSubmiting(false);
  }

  const PreviewBox = (e) =>  {
    return( 

      <Box bg="#bbcdff" borderRadius ="10px"  p="1%" minW="50%" h="520px"  >
        <Text  fontSize="25px" textColor={"#2b468b"} >{videoSrcInfo['new_video_name']}</Text>
        <AspectRatio maxH="50%" ratio={16 / 9}>
              <video
                id="video-summary"
                tag={"video/mp4"}
                ref={videoRef}
                controls
                src={"http://192.168.0.100:8085/download_content/videos/"+videoSrcInfo['new_video_name']}
              />
          </AspectRatio>
        <Text  textAlign="center" fontSize="20px" textColor={"#2b468b"} >{videoSrcInfo['video_info']}</Text>
       
          <Box>
            <Popover >
              <PopoverTrigger>
              <Link >
                <Button bg="#ffffff" textColor={'#6980e0'} fontSize={"17px"} borderRadius ="10px" textAlign="center" p="2px"  width="200px" height="60px" verticalAlign="center" border={"2px solid #2b468b" }>
                  <Text>Show Tags</Text>
                </Button>
              </Link>
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
          <HStack mt="1%" >
          <Box >
            { seqVideos.length<3 ? <ShowButton/> : <Text textColor={"#2b468b"}>No more space</Text>}  
            <Link onClick={(e)=>{updateList(videoSrcInfo['new_video_name']);updateListView(videoSrcInfo)}}   >
              <Button bg="#ffffff"  textColor={'#6980e0'}  fontSize={"15px"} borderRadius ="10px" textAlign="center" p="2px"  width="190px" height="60px" verticalAlign="center" border={"2px solid #2b468b" }>
                <Image borderRadius ="10px" src = "images/cancel.png" w="30px" mr="2%" />
                <Text>Remove from the list</Text>
              </Button>
            </Link>
          </Box>
        </HStack>
      </Box>
    )
} 
  const FilterButton = (e) => {
    return(
      <>
      <Link onClick={onOpen} >
        <Button bg="#ffffff" textColor={'#6980e0'} fontSize={"18px"} borderRadius ="10px" textAlign="center" p="2px"  width="200px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" }>
          <Image borderRadius ="10px" src = "images/search.png" w="30px" mr="10%" />
          <Text>Filters</Text>
        </Button>
      </Link>
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
              <Button bg="#ffffff" textColor={'#6980e0'} fontSize={"18px"} borderRadius ="10px" textAlign="center" p="2px"  width="100px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" } mr={3} onClick={onClose}>
                Done
              </Button>
            </Link>
            <Button bg="#ffffff" textColor={'#6980e0'} fontSize={"18px"} borderRadius ="10px" textAlign="center" p="2px"  width="100px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" } mr={3} onClick={onClose}>
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

  const ShowSequence = (e) =>{
    return(<VStack>
       <Text fontSize={"10px"} textColor="#2b468b">Choose three videos!</Text>
       <HStack ml="5%">
        {infoVideo.map((cur,i)=>(
           <Link onClick={(e)=>setVideoSrcInfo(cur)} key={i}>
           <Box >
             <Text textColor={"#2b468b"}> {cur['new_video_name']} </Text>
             <Image src={cur['thumbnail']} maxW="25%"/>
           </Box>
         </Link>
        ))}
        </HStack>
    </VStack>
       

    )
  }


  return (
    <Box>
      <Header title ={"Choose Video"}/>
      <HStack>
        <FilterButton/>
        
        <Box bg="#bbcdff" borderRadius ="10px"   w="75%" h="100px"> 
          {infoVideo!=null ? <ShowSequence/> : null }
        
        </Box>
        { seqVideos.length==3 ? <Link onClick={submitSeq} href='/newsequence'><ButtonSmall title={"Submit"} icon ={"images/plus.png"} /> {isSubmiting && (<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />) }</Link> : null}
      </HStack>
      <HStack mt="1%">
        <Box bg="#bbcdff" borderRadius ="10px"  p="0.5%" maxW="50%" h="520px" overflow="auto" css={{ 
                '&::-webkit-scrollbar': 
                { width: '3px', },
                '&::-webkit-scrollbar-track': {
                  width: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#2b468b',
                  borderRadius: '24px',
                },}} >
          <SimpleGrid columns={3} spacing={2} ml="1%">     
            
          {met.map((currentElement, index) => (
            <Link onClick={(e)=>setVideoSrcInfo(currentElement)} key={index}>
              <Box >
                <Text textColor={"#2b468b"}> {currentElement['new_video_name']} </Text>
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

