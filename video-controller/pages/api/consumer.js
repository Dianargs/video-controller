// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  //brokers: ['192.168.1.154:9094'],
  //brokers: ['192.168.1.141:9094'], //casa
  brokers: ['192.168.0.102:9094'],
 
})

var msgtosend=[];

export default function handler(req, res) {
  
  consumer(); 
  res.status(200).json({ name: msgtosend[msgtosend.length-1] })
  
}

async function consumer(){
  
  const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'quickstart', fromBeginning: false })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      msgtosend.push(message.value.toString()),
      console.log(
        msgtosend[msgtosend.length-1]
      )
    },
  })
}
