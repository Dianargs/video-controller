import {Box,HStack, Link, Select, Input,Text, Center} from '@chakra-ui/react'
import  Button from '../../styles/button.js'
import Header from '../../styles/header.js'

function sendmessage(message,topic){
  const msg = fetch("/api/producer?message=" + message+"&topic="+topic);
}
function readmessage(){
  const msg = fetch("/api/consumer");
  console.log(msg);
}

export default function playsequence() {
  const handleClick = (e, path) => {
    if (path === "/about") {
      console.log("I clicked on the About Page");
    }
    if (path === "/posts") {
      console.log("I clicked on the Posts Page");
    }
  };
  
  return (
    <Box>
      <Header title ={"Play Experience"}/>
      <Center>
        <HStack spacing={20} mt="5%">
          <Select placeholder='Choose a Sequence' bg={"#E4DED2"} w="50%" ml={"5%"}>
            <option value='option1'>Sequence 1</option>
            <option value='option2'>Sequence 2</option>
            <option value='option3'>Sequence 3</option>
          </Select>
          <HStack >
            <Text color={"#E4DED2"} >Date </Text>
            <Input placeholder='Day' size='sm' w="11%" textAlign={'center'}></Input>
            <Text color={"#E4DED2"} >- </Text>
            <Input placeholder='Month' size='sm' w="12%" textAlign={'center'}></Input>
            <Text color={"#E4DED2"} >- </Text>
            <Input placeholder='Year' size='sm' w="12%" textAlign={'center'}></Input>
          </HStack>
        </HStack>
      </Center>
      <Text mt="5%" color={"#E4DED2"} textAlign={'center'} fontSize="28px">Participant Nº 1</Text>
      <Center>
        <HStack justify={'center'} verticalAlign={'center'} h='50vh' spacing={200}>
            <Link href='/addvideo'>
              <Button title={"Play Training Period"} icon ={"images/experience.png"} />
            </Link>
            <Link href='/addvideo'>
              <Button onclick={sendmessage("Play()",'quickstart')} title={"Play Sequence"} icon ={"images/play-button.png"} />
            </Link>
        </HStack>
      </Center>
    </Box>


  )
}
