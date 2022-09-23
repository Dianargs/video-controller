import Head from 'next/head'

import styles from '../styles/Home.module.css'
import  Button from '../styles/button.js'
import HomePageHeader from '../styles/headerhomepage.js'
import {Box,HStack,Link, Flex,Image, VStack} from '@chakra-ui/react'


export default function Home() {
  return (
    <Box>
      <HomePageHeader title ={"Walking Down Memory Lane"}/>
      
      <HStack ml={"5%"} spacing="100" >
        <VStack>
        <Image src ={"images/video.png"} width="90px"  />
        <Link href='/addvideo'>  
          <Button title={"Add New Video"} />
        </Link>
        </VStack>
        <VStack >
        <Link href='/addimage'>
          <Image src ={"images/gallery.png"} width="90px" ml="25%" mt="4%" />
          <Button title={"Add New Image"} />
        </Link>
        </VStack>
      </HStack>
      <HStack ml={"5%"} spacing="100" mt="1%">
        <VStack>
        <Link href='/sequences'>
          <Image src ={"images/step.png"} width="90px" ml="25%" mb="2%" />
          <Button title={"Sequences"} />
        </Link>
        </VStack>
        <VStack>
        <Link href='/playsequence'>
          <Image src ={"images/flow-chart.png"} width="90px" ml="25%"  mb="2%" />
          <Button title={"Start Experiment"} />
        </Link>
        </VStack>
      </HStack>
      <Flex justify={'left'} ml="5%">
        <Link href='/experiencedata'>
          <Image src ={"images/analysis.png"} width="90px" ml="25%"  mb="2%" />
          <Button title={"Experiments Data"} />
        </Link>
      </Flex>
      
    </Box>
  )
}
