import {Box,Textarea,Checkbox, Image, Text, Input, HStack, VStack, Center, Link, CheckboxGroup, Button, AspectRatio} from '@chakra-ui/react'
import Header from '../../styles/header'
import { useState, useRef, useEffect } from 'react'
import React from 'react';
import $ from "jquery";


import  ButtonSmall from '../../styles/buttonSmall.js'


export default function addimage() {

  //handle input
  const [nameImage, setNameImage] = React.useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [imageSrc, setImageSrc] = useState('')
 // const videoRef = useRef(null)
  

  useEffect(() => {
    const src = URL.createObjectURL(new Blob([selectedFile], {type: 'image/png'}))
    setImageSrc(src)
  }, [selectedFile])

  
  /*let submitForm = async (e) => {
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
    
  }  */


 
  return (
   
    <Box >
      <Header title ={"Add Image"}/>
      <form >
        <Center mt="1%">
        <HStack >
        <Button class="file-input" ml="10%" mr="5%" _hover={{transform: 'scale(1.02)'}} _focus={{transform: 'scale(1.02)'}} style={
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
              <Image src = "images/addImage.png" width="40px"  mr="10px"/>
              <label for="file" style={{ color:'#405F73'}}>Select file</label>
            </Button>
            <Input placeholder='Object Name' _placeholder={{ opacity: 0.9, color: '#405F73' }} size='md' h="60px" w="500px"  bg="#E4DED2" value={nameImage}  onChange={(e)=> setNameImage(e.target.value)} type ="text" />
        </HStack>
        </Center>
        <Center>
        <Box bg="#E4DED2" borderRadius ="8px" marginBottom="1rem"  mt="1%" >
               <Image src={imageSrc} maxH="450px"/>
        </Box>
        </Center>
       
       
        <Center mt ="1%">
        <Button type="submit">Submit</Button>
        </Center>
      </form>
     
    </Box>
  )
}


