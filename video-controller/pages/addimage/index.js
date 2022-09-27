import {Box,Textarea,Checkbox, Image,Spinner, Text, Input, HStack, VStack, Center, Link, CheckboxGroup, Button, AspectRatio} from '@chakra-ui/react'
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
  const [isSubmiting, setisSubmiting] = useState(false)
 // const videoRef = useRef(null)
  

  useEffect(() => {
    const src = URL.createObjectURL(new Blob([selectedFile], {type: 'image/png'}))
    setImageSrc(src)
  }, [selectedFile])

  
  useEffect(()=>{
    setisSubmiting(isSubmiting)
  }, [isSubmiting])


  
  let submitForm = async (e) => {
    e.preventDefault();
    setisSubmiting(true);
    let blob = new Blob([selectedFile], {type: 'video/mp4'});
   
    let result = (await blobTo64(blob)).split(",");
  
    let upres =await fetch("http://localhost:8085/upload_content/images/"+nameImage+".png",{
      method: "POST",
      body:JSON.stringify({file: String(result[1]) }),
      headers:{'Content-Type':'application/json'}
    }).then(console.log(upres));
  
    setNameImage("");
    setSelectedFile("");
    setisSubmiting(false);
    
  }  
 

 
  return (
   
    <Box >
      <Header title ={"Add Image"}/>
      <form onSubmit={submitForm}>
        <Center mt="1%">
        <HStack >
        <Button class="file-input" ml="10%" mr="5%" _hover={{transform: 'scale(1.02)'}} _focus={{transform: 'scale(1.02)'}} style={
                {
                  display: 'block',
                  position: 'relative',
                  width: '200px',
                  height: '60px',
                  'border-radius': '10px',
                  background: '#ffffff',
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'center',
                  color: '#fff',
                  'font-weight': 'bold',
                  cursor: 'pointer',
                  transition: 'transform .2s ease-out',
                  border:'4px solid #bbcdff'   
              }
              }>
              <input type="file" name="file" accept="image/png"  onChange={(e) => setSelectedFile(e.target.files[0])} style={
                { 
                    opacity: '0',
                    width: '200px',
                    height: '50px',
                    position: 'absolute', 
                } 
              }/>
              <Image src = "images/gallery.png" width="40px"  mr="10px"/>
              <label for="file" style={{ color:'#6980e0'}}>Select Image</label>
            </Button>
            <Input placeholder='Image Name...' _placeholder={{ opacity: 0.9, color: '#6980e0' }} fontSize={"18px"} size='md' h="60px" w="500px"  bg="#bbcdff" value={nameImage}  onChange={(e)=> setNameImage(e.target.value)} type ="text" />
        </HStack>
        </Center>
        <Center>
        <Box bg="#E4DED2" borderRadius ="8px" marginBottom="1rem"  mt="1%" >
               <Image src={imageSrc} maxH="450px" />
        </Box>
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



const blobTo64 = blob => new  Promise((resolve,reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = ()=> resolve(reader.result);
  reader.onerror = error => reject(error);
});
