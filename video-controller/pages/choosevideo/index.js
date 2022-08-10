import {Box,Text,Image,SimpleGrid, Link, HStack} from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react';
import Header from '../../styles/header'
import ButtonSmall from '../../styles/buttonSmall';


export default function choosevideo() {
  const [showBox,setShowBox] = React.useState(false);

  const PreviewBox = () => (
    <Box bg="#E4DED2" borderRadius ="10px"  p="1%" maxW="50%" >
      <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
      <Image borderRadius ="10px" src = "images/thumbnail.png" />
      <Text  textAlign="center" fontSize="20px" textColor={"#405F73"} >Sick Girl holding an apple with clean hands, coughts to the apple.</Text>
      <HStack>
        <Box>
          <Text  fontSize="25px" textColor={"#405F73"} >Tags</Text>
          <Text  fontSize="15px" textColor={"#405F73"} >Woman</Text>
          <Text  fontSize="15px" textColor={"#405F73"} >Contaminated</Text>
          <Text  fontSize="15px" textColor={"#405F73"} >Fruit</Text>
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
        <ButtonSmall title={"Filters"} icon ={"images/lupa.png"} >
           
        </ButtonSmall>
      </HStack>
      <HStack>
        <Box bg="#E4DED2" borderRadius ="10px"  p="0.5%" maxW="50%">
          <SimpleGrid columns={3} spacing={7} ml="1%">     
            <Box>
              <Link onClick={(e) => setShowBox(true)}>
                <Image borderRadius ="10px" src = "images/thumbnail.png"   />
                <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
              </Link>
            </Box>
            <Box>
              <Link>
                <Image borderRadius ="10px" src = "images/thumbnail.png"   />
                <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
              </Link>
            </Box>
            <Box>
              <Link>
                <Image borderRadius ="10px" src = "images/thumbnail.png"   />
                <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
              </Link>
            </Box>
            <Box>
              <Link>
                <Image borderRadius ="10px" src = "images/thumbnail.png"   />
                <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
              </Link>
            </Box>
            <Box>
              <Link>
                <Image borderRadius ="10px" src = "images/thumbnail.png"   />
                <Text  fontSize="25px" textColor={"#405F73"} >Video1</Text>
              </Link>
            </Box>
          </SimpleGrid> 
        </Box>
        { showBox ? <PreviewBox/> : null }
       
      </HStack>
    </Box>


  )
}

