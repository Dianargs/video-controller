import {Box,Textarea,Checkbox, Image, Text, Input, HStack, VStack, Center, Link, CheckboxGroup, Button, AspectRatio} from '@chakra-ui/react'
import Header from '../../styles/header'
import { useState, useRef, useEffect } from 'react'
import React from 'react';


import  ButtonSmall from '../../styles/buttonSmall.js'


export default function addvideo({filters}) {

  //handle input
  const [nameVideo, setnameVideo] = React.useState('')
 
  const [tags, setTags] = React.useState([])
  
  const [infoVideo, setinfoVideo] = React.useState('')
  
  //let filters = ["Clean","Contaminated","Men"]

  console.log("Result:"+ nameVideo + tags + infoVideo)

  const [selectedFile, setSelectedFile] = useState();
  const [videoSrc, setVideoSrc] = useState('')
  const videoRef = useRef(null)
  

  useEffect(() => {
    const src = URL.createObjectURL(new Blob([selectedFile], {type: 'video/mp4'}))
    setVideoSrc(src)
  }, [selectedFile])

  
  const handleSubmission = () => {
	};

  let submitForm = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3005/api/video", {
      method: "POST",
      body: JSON.stringify({
        video_name: selectedFile.name,
        new_video_name:nameVideo,
        video_info: infoVideo,
        filters : tags
      }),
    });
    res = await res.json();

    setnameVideo("");
    setSelectedFile("");
    setinfoVideo("");
    setTags([]);
    
  }



  
  
  
  return (
   
    <Box >
      <Header title ={"Add Video"}/>
      <form onSubmit={submitForm}>
        <Center>
          <HStack mt="5%" ml="5%" spacing={10} >
            <Button class="file-input" _hover={{transform: 'scale(1.02)'}} _focus={{transform: 'scale(1.02)'}} style={{
              
                display: 'block',
                position: 'relative',
                width: '200px',
                height: '50px',
                'border-radius': '25px',
                background: '#E4DED2',
                'box-shadow': '0 4px 7px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                color: '#fff',
                'font-weight': 'bold',
                cursor: 'pointer',
                transition: 'transform .2s ease-out',  
            }}>
            <input type="file" name="file"  onChange={(e) => setSelectedFile(e.target.files[0])} style={
              { 
                
                  opacity: '0',
                  width: '200px',
                  height: '50px',
                  position: 'absolute', 
} }/>
            <Image src = "images/addVideoIcon.png" width="40px"  mr="10px"/>
            <label for="file" style={{ color:'#405F73'}}>Select file</label>
            </Button>
           
            <Input placeholder='Video Name' _placeholder={{ opacity: 0.9, color: '#405F73' }} size='md' h="60px" w="500px"  bg="#E4DED2" value={nameVideo}  onChange={(e)=> setnameVideo(e.target.value)} type ="text" />
          </HStack>
        </Center>
        
        <Center>
        
          <HStack mt="2%" ml="5%" spacing={10}>
          <Box bg="lightgrey" marginBottom="1rem" w="900px" >
            <AspectRatio maxH="50%" ratio={16 / 9}>
                <video
                  id="video-summary"
                  autoPlay
                  ref={videoRef}
                  controls
                  src={videoSrc}
                />
              </AspectRatio>
            </Box>
            <Textarea bg="#E4DED2" borderRadius ="10px" h="370px" w="300px" placeholder='Add Details about the video here...' _placeholder={{ opacity: 0.9, color: '#405F73' }} value={infoVideo}  onChange={(e)=> setinfoVideo(e.target.value)} type ="text"/>
            <VStack bg="#E4DED2" borderRadius="10px" align={'center'} w="20%" maxH="370px">
              <Input  bg={'white'} />
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
                <VStack align={'left'} >
                  <CheckboxGroup value={tags} onChange={(e)=>{setTags(e)}}>
                    {filters.map((currentElement, index) => (
                      <Checkbox  value={filters[index].name}  borderColor="#405F73">{filters[index].name}</Checkbox>
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
      </form>
     
    </Box>
  )
}

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3005/api/filtertags", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  let filters = await res.json();

  console.log("Which Filters coming in:"+ filters["name"])
  return {
      props: { filters },
  };
}

