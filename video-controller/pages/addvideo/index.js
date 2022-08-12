import {Box,Textarea,Checkbox, Image, Text, Input, HStack, VStack, Center, Link, CheckboxGroup, Button, AspectRatio} from '@chakra-ui/react'
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
  const videoRef = useRef(null)
  const imagemRef = useRef(null)
 
  console.log(filters);
  
  /* A react hook that is called when the component is mounted. It is used to set the state of the
  component. */
  useEffect(()=>{
    setFilterState(filters)
  }, [filters])



  useEffect(() => {
    const src = URL.createObjectURL(new Blob([selectedFile], {type: 'video/mp4'}))
    setVideoSrc(src)
  }, [selectedFile])

  
 
  let submitForm = async (e) => {
    e.preventDefault();
    /* This is a GET request to the server to get the number of videos. */
    let nvideosres= await fetch("http://localhost:3005/api/video",{
      method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let n_videos = await nvideosres.json();
    tmp = parseInt(n_videos['data']) +1;
 /* Sending a POST request to the server with the video name, new video name, video info and filters. */
    let res = await fetch("http://localhost:3005/api/video", {
      method: "POST",
      body: JSON.stringify({
        video_name: selectedFile.name,
        new_video_name:"video"+tmp+".MP4",
        video_info: infoVideo,
        filters : tags,
        thumbnail: imgSrc
      }),
    });
    res = await res.json();
   /* Converting the video to base64 and then sending it to the server. */
    let blob = new Blob([selectedFile], {type: 'video/mp4'});
   
    let result = (await blobTo64(blob)).split(",");

    let upres =await fetch("http://localhost:8085/upload_content/videos/video"+tmp+".MP4",{
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
          <HStack mt="1%" ml="5%" spacing={10} >
            <Button class="file-input" _hover={{transform: 'scale(1.02)'}} _focus={{transform: 'scale(1.02)'}} style={
              {
                display: 'block',
                position: 'relative',
                width: '200px',
                height: '60px',
                'border-radius': '10px',
                background: '#E4DED2',
                'box-shadow': '0 4px 7px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                color: '#fff',
                'font-weight': 'bold',
                cursor: 'pointer',
                transition: 'transform .2s ease-out',  
            }
            }>
              <input type="file" name="file"  onChange={(e) => setSelectedFile(e.target.files[0])} style={
                { 
                    opacity: '0',
                    width: '200px',
                    height: '50px',
                    position: 'absolute', 
                } 
              }/>
              <Image src = "images/addVideoIcon.png" width="40px"  mr="10px"/>
              <label for="file" style={{ color:'#405F73'}}>Select file</label>
            </Button>
          </HStack>
        </Center>
    
        <Center>
          <HStack mt="2%"  spacing={10}>
          <Box bg="lightgrey" marginBottom="1rem" w="700px" >
            <AspectRatio maxH="50%" ratio={16 / 9}>
                <video
                  id="video-summary"
                  autoPlay
                  ref={videoRef}
                  controls
                  src={videoSrc}
                />
              </AspectRatio>
              <Link onClick={(e) => capture()}>
                <Button>
                  Capture
                </Button>
              </Link>
            </Box>
            <Textarea bg="#E4DED2" borderRadius ="10px" h="370px" w="300px" placeholder='Add Details about the video here...' _placeholder={{ opacity: 0.9, color: '#405F73' }} value={infoVideo}  onChange={(e)=> setinfoVideo(e.target.value)} type ="text"/>
            <VStack bg="#E4DED2" borderRadius="10px" align={'center'} w="20%" maxH="370px">
              <HStack>
                  <Input  bg={'white'} value={nameNewFilter}  onChange={(e)=> setnameNewFilter(e.target.value)} type ="text" ></Input>
                  <Button onClick={addNewFilter} ><Image borderRadius ="10px" src = "images/add.png" w="20px"  /></Button>
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
                      <Checkbox  value={currentElement.name} key={index} borderColor="#405F73">{currentElement.name}</Checkbox>
                    ))}
                  </CheckboxGroup>
                </VStack>
              </Box>  
            </VStack> 
          </HStack>
        </Center>
        <Center mt ="1%">
        <Button type="submit">Submit</Button>
        </Center>
        <canvas ref={imagemRef} id="canvas" width={"320"} height="180" display="none"></canvas>
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

