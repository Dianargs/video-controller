import {Box,HStack, Link,Text, VStack,Textarea} from '@chakra-ui/react'
import { useState,useRef, useEffect } from 'react'
import React from 'react';
import { CSVLink } from "react-csv";
import  Button from '../../styles/button.js'
import Header from '../../styles/header.js'
import json2csv from "json2csv";


export default function experiencedata() {
    const [dataForDownload, setDataForDownload] = React.useState([]);
    const [bDownloadReady, setDownloadReady] = React.useState(false);
    const csvLink = useRef(null)

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
        }
    }
      return (
    <Box >
        <Link onClick={(e) => handleAction('DOWNLOAD')}>
            <Button type="button" className="btn btn-outline-sysmode btn-sm" title={"Download"}></Button>
        </Link>
        <CSVLink 
            data={dataForDownload} 
            filename="data.csv"
            className="hidden"
            ref={csvLink}
            target="_blank" />
    
       
    </Box>
  )
}
