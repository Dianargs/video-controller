import {Box,HStack, Link,Text, VStack,Textarea, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,} from '@chakra-ui/react'
import { useState,useRef, useEffect } from 'react'
import React from 'react';
import { CSVLink } from "react-csv";
import  Button from '../../styles/button.js'
import LittleButton from '../../styles/littleButton.js'
import Header from '../../styles/header.js'
import json2csv from "json2csv";
import { map } from 'jquery';


export default function experiencedata({metadata}) {
    const [dataForDownload, setDataForDownload] = React.useState([]);
    const [bDownloadReady, setDownloadReady] = React.useState(false);
    const [tableInfo, setTableInfo] = React.useState([]);
    const csvLink = useRef(null)

    useEffect(()=>{
        setTableInfo(metadata)
      }, [metadata])

    useEffect(() => {
        if (csvLink && csvLink.current && bDownloadReady) {
            csvLink.current.link.click();
            setDownloadReady(false);
        }
    }, [bDownloadReady]);

    const handleAction = async (actionType) => {
        if (actionType === 'DOWNLOAD') {
            //get data here
            let res = await fetch("http://localhost:3005/api/participant", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            res = await res.json();
            setDataForDownload(res);
            setDownloadReady(true);
            console.log(dataForDownload);
        }
    }
      return (
    <Box >
        <Header title ={"Analyse Data"}/>
        <Box ml="1%" mt="1%" >
            <TableContainer>
                <Table variant='striped' colorScheme='linkedin' display={'block'}>
                    <TableCaption bg="#eaf3fa">Data from all the experiments</TableCaption>
                    <Thead>
                    <Tr>
                        <Th w="5%">Participant</Th>
                        <Th w="5%">Sequence Name</Th>
                        <Th w="25%">Quiz</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {tableInfo.map((cur,i)=>(
                        <Tr>
                            <Td textColor={'#2b468b'}>{cur['participant']}</Td>
                            <Td textColor={'#2b468b'}>{cur['seqName']}
                                <Box mt="2%">
                                    <Popover >
                                    <PopoverTrigger>
                                    <Link >
                                        <LittleButton title={'Show Sequence'} >
                                        
                                        </LittleButton>
                                    </Link>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Sequence</PopoverHeader>
                                        <PopoverBody>
                                        
                                        {cur['confSeq'].map((curr,ind)=>(
                                            <Text textColor={'#2b468b'}>{curr}</Text>
                                        ))}                   
                                        </PopoverBody>
                                    </PopoverContent>
                                    </Popover>    
                                </Box>
                            </Td>
                            <Td textColor={'#2b468b'}>{cur['quiz']}</Td>
                        </Tr>
                    ))}
                     </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th w="5%">Participant</Th>
                        <Th w="5%">Sequence Name</Th>
                        <Th w="25%">Quiz</Th>
                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <Link onClick={(e) => handleAction('DOWNLOAD')} >
                <Button type="button"  className="btn btn-outline-sysmode btn-sm" title={"Download"}></Button>
            </Link>
            <CSVLink 
                data={dataForDownload} 
                filename="data.csv"
                className="hidden"
                ref={csvLink}
                target="_blank" />
        </Box>
            
    
      
       
    </Box>
  )
}
export async function getServerSideProps(context) {
  

    let res = await fetch("http://localhost:3005/api/participant", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let metadata = await res.json();
  
    return {
        props: { metadata },
    };
  }
  