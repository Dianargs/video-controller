import {Box,Textarea,Checkbox, Image, Text, Input, HStack, VStack, Center, Link, CheckboxGroup, Button, AspectRatio, Spinner} from '@chakra-ui/react'
import Header from '../../styles/header'
import { useState, useRef, useEffect } from 'react'
import React from 'react';

export default function addvideo({filters}) {

  //handle input
  const [nameVideo, setnameVideo] = React.useState('')
  const [filterState, setFilterState] = React.useState([])
  const [tags, setTags] = React.useState([])
  const [infoVideo, setinfoVideo] = React.useState('')
  const [nameNewFilter, setnameNewFilter] = React.useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [videoSrc, setVideoSrc] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [tmp, setTmp] = useState('')
  const [isSubmiting, setisSubmiting] = useState(false)
  const [captureFlag, setcaptureFlag] = useState(true)
  const videoRef = useRef(null)
  const imagemRef = useRef(null)
 

  
  /* A react hook that is called when the component is mounted. It is used to set the state of the
  component. */
  useEffect(()=>{
    setFilterState(filters)
  }, [filters])

  useEffect(()=>{
    setisSubmiting(isSubmiting)
  }, [isSubmiting])


  useEffect(() => {
    const src = URL.createObjectURL(new Blob([selectedFile], {type: 'video/mp4'}))
    setVideoSrc(src)
  }, [selectedFile])

  useEffect(()=>{
    setcaptureFlag(captureFlag)
  }, [captureFlag])
  
 
  let submitForm = async (e) => {
    e.preventDefault();
    setisSubmiting(true);
  
 /* Sending a POST request to the server with the video name, new video name, video info and filters. */
    let res = await fetch("http://localhost:3005/api/video", {
      method: "POST",
      body: JSON.stringify({
        video_name: selectedFile.name,
        new_video_name:nameVideo+".MP4",
        video_info: infoVideo,
        filters : tags,
        thumbnail: imgSrc
      }),
    });
    res = await res.json();
   /* Converting the video to base64 and then sending it to the server. */
    let blob = new Blob([selectedFile], {type: 'video/mp4'});
   
    let result = (await blobTo64(blob)).split(",");

    let upres =await fetch("http://localhost:8085/upload_content/videos/"+nameVideo+".MP4",{
      method: "POST",
      body:JSON.stringify({file: String(result[1]) }),
      headers:{'Content-Type':'application/json'}
    });
/* Setting the state of the component to null. */
    setnameVideo("");
    setSelectedFile("");
    setinfoVideo("");
    setTags([]);
    setImgSrc("");
    imagemRef = null;
    setcaptureFlag(true);
    setisSubmiting(false);
    
  }  

  let addNewFilter = async (e) =>{
  
    e.preventDefault();
   /* Sending a POST request to the server with the name of the new filter. */
    let res = await fetch("http://localhost:3005/api/filtertags", {
      method: "POST",
      body: JSON.stringify({
        name: nameNewFilter,
      }),
    });
    res = await res.json();

    setFilterState([...filterState,res]);
    setnameNewFilter("");
  }

  /**
   * It takes a video element, and draws it to a canvas element.
   * @param e - the event object
   */
  let capture = (e) =>{
    const refV = videoRef.current;
    const refC = imagemRef.current;
    refC.getContext('2d').drawImage(refV, 0, 0,320, 180);
    setImgSrc(refC.toDataURL("image/png"));
  }
 
  return (
   
    <Box >
      <Header title ={"Add Video"}/>
      <form onSubmit={submitForm}>
        <Center>
          <HStack ml="5%" spacing={10} >
            <Button class="file-input" _hover={{transform: 'scale(1.02)'}} _focus={{transform: 'scale(1.02)'}} style={
              {
                display: 'block',
                position: 'relative',
                width: '200px',
                height: '60px',
                borderRadius: '10px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform .2s ease-out',
                border:'4px solid #bbcdff'  
            }
            }>
              <input type="file" name="file" accept="video/mp4" onChange={(e) => setSelectedFile(e.target.files[0])} style={
                { 
                    opacity: '0',
                    width: '200px',
                    height: '50px',
                    position: 'absolute', 
                } 
              }/>
              <Image src = "images/video.png" width="40px"  mr="10%"/>
              <label for="file" style={{ color:'#6980e0'}}>Select video</label>
            </Button>
            <Input bg="#bbcdff"  borderRadius ="10px" h="60px" w="320px" placeholder='Name Your video' _placeholder={{ opacity: 0.9, color: '#6980e0' }} value={nameVideo}  onChange={(e)=> setnameVideo(e.target.value)} type ="text"></Input>
          </HStack>
        </Center>
    
        <Center>
          <HStack mt="2%"  spacing={10}>
          <Box bg="#ffffff" w="700px" >
            <AspectRatio maxH="50%" ratio={16 / 9}>
                <video
                  id="video-summary"
                  autoPlay
                  ref={videoRef}
                  controls
                  src={videoSrc}
                />
              </AspectRatio>
              <Link onClick={(e) =>{setcaptureFlag(false); capture();}} ml="35%">
                <Button bg="#ffffff" textColor={'#6980e0'} borderRadius ="10px" textAlign="center" p="2px"  width="200px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" } >
                  Capture Thumbnail
                </Button>
              </Link>
            </Box>
            <VStack>
              <Textarea bg="#bbcdff"  borderRadius ="10px" h="270px" w="320px" placeholder='Details about the video...' _placeholder={{ opacity: 0.9, color: '#6980e0' }} value={infoVideo}  onChange={(e)=> setinfoVideo(e.target.value)} type ="text"/>
              <VStack>
                <canvas ref={imagemRef} id="canvas" width={"320"} height="180" display="none" z-index={"0"}  position={"flex"}></canvas>
                {captureFlag && (<Box bg="#bbcdff" w={"320px"} h={"180px"} display={""} position={"absolute"} css={{top:'48.2% '}} z-index={"1"}></Box>)}
              </VStack>
                
            </VStack>
            
            <VStack bg="#bbcdff" borderRadius="10px" align={'center'} w="21%" maxH="370px">
              <HStack>
                  <Input  bg={'white'} value={nameNewFilter}  onChange={(e)=> setnameNewFilter(e.target.value)} type ="text" m="1%"></Input>
                  <Button onClick={addNewFilter}bg={'white'} mr="3%"><Image borderRadius ="10px" src = "images/plus.png" w="30px"  /></Button>
              </HStack> 
              <Box w="90%" overflow="auto" css={{ 
                '&::-webkit-scrollbar': 
                { width: '4px', },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#405F73',
                  borderRadius: '24px',
                },
                }}>
                <VStack id="checkboxDiv" align={'left'} >
                  <CheckboxGroup  value={tags} onChange={(e)=>{setTags(e)}}>
                    {filterState.map((currentElement, index) => (
                      <Checkbox  value={currentElement.name} key={index} borderColor="#6980e0" textColor={'#2b468b'}>{currentElement.name}</Checkbox>
                    ))}
                  </CheckboxGroup>
                </VStack>
              </Box>  
            </VStack> 
          </HStack>
        </Center>
        <Center mt ="1%">
        <Button type="submit" disabled={isSubmiting} bg="#ffffff" textColor={'#6980e0'} borderRadius ="10px" textAlign="center" width="200px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" } fontSize={"20px"}>
          {isSubmiting && (<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />) }
          Submit</Button>
        </Center>
        
      </form>
    </Box>
  )
}

/**
 * It's a function that gets the filters and the number of videos from the server and returns them as
 * props.
 * @param context - This is the context object that Next.js passes to the getServerSideProps function.
 * It contains the query object, which is the query string of the URL.
 * @returns The filters and n_videos are being returned.
 */
export async function getServerSideProps(context) {
  /* This is a GET request to the server to get the filters. */
  let res = await fetch("http://localhost:3005/api/filtertags", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  let filters = await res.json();
  
  /* A GET request to the server to get the number of videos. */
 
  return {
      props: { filters },
  };  
}

const blobTo64 = blob => new  Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = ()=> resolve(reader.result);
    reader.onerror = error => reject(error);
  });

