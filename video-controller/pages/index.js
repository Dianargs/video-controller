import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import  Button from '../styles/button.js'
import Header from '../styles/header'
import {Box,HStack,Link, Flex} from '@chakra-ui/react'


export default function Home() {
  return (
    <Box >
      <Header title ={"Walking Down Memory Lane"}/>
      <HStack justify={'center'} verticalAlign={'center'} mt="10%" spacing="200" >
        <Link href='/addvideo'>
          <Button title={"Add New Video"} icon ={"images/addVideoIcon.png"}/>
        </Link>
        <Link href='/newsequence'>
          <Button title={"New Sequence"} icon ={"images/newsequenceIcon.png"}/>
        </Link>
        <Link href='/playsequence'>
          <Button title={"Start Experiment"} icon ={"images/editSequenceIcon.png"}/>
        </Link>
      </HStack>
    </Box>
  )
}
