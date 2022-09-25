// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  //brokers: ['192.168.1.154:9094'],
  //brokers: ['192.168.1.141:9094'], //casa
  brokers: ['192.168.0.100:9094'],
 
})

var msgtosend=[];
var tmp='';
var timetosend='';

export default function handler(req, res) {
  
  consumer(); 
  if(tmp!=msgtosend[0] || msgtosend[0]==''){
    timetosend =Date.now();
  }
  
  tmp=msgtosend[0];
  res.status(200).json({ value: msgtosend[0], time: timetosend });
  
}

async function consumer(){
  
  const consumer = kafka.consumer({ groupId: 'test-group'+ Math.floor(Math.random() * (2 - 0 + 1) + 0)})

  await consumer.connect()
  await consumer.subscribe({ topic: 'quickstart', fromBeginning: false })
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      msgtosend[0] =message.value.toString()
    },
  })
}
