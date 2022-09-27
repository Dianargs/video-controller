import { Flex, Image, Text, Link,Box, Spacer, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure,Button} from '@chakra-ui/react'




const Header = ({title}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex px='50px' py='10px' bg='transparent' h='10%'>
      <Text color='#8c9ef4' fontSize={'40px'} >
      {title}
      </Text>
      <Spacer />
      
      <Box>
        <Link onClick={onOpen}  float={'right'}>
          <Box bg="#ffffff" borderRadius ="5px" textAlign="center" p="4px"  width="120px" height="60px" verticalAlign="center" border={"4px solid #bbcdff" }  >
            <Text mt="10px" fontSize={'larger'} textColor="#8c9ef4">Home Page</Text>
          </Box>
        </Link>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure you want to go to Home Page?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>If you leave this page all progress will be lost! Are you sure you want to leave?</Text>
            </ModalBody>

            <ModalFooter>
            <Link href='\'  float={'right'} mr="2%">
                <Box bg="#ffffff" borderRadius ="5px" textAlign="center" p="2px"  width="120px" height="40px" verticalAlign="center" border={"3px solid #bbcdff" }  >
                  <Text  fontSize={'larger'} textColor="#8c9ef4">Leave</Text>
                </Box>
              </Link>
              <Link onClick={onClose}  float={'right'} mr="2%">
                <Box bg="#ffffff" borderRadius ="5px" textAlign="center" p="2px"  width="120px" height="40px" verticalAlign="center" border={"3px solid #bbcdff" }  >
                  <Text  fontSize={'larger'} textColor="#8c9ef4">Stay</Text>
                </Box>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
    
  
  )
}

export default Header
