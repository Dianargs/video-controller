import {Box,HStack, Link} from '@chakra-ui/react'
import React from 'react';
import  Button from '../../styles/button.js'
import Header from '../../styles/header.js'

export default function Home() {
  return (
    <Box >
        <Header title ={"Details about the experience"}/>
        <HStack justify={'center'} verticalAlign={'center'} mt="10%" spacing="200" >
        <Link href='/playsequence'>
            <Button title={"Choose other videos"} icon ={"images/addVideoIcon.png"}/>
        </Link>
        </HStack>
    </Box>
  )
}
