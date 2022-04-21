// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useRouter } from 'next/router'
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})


export default function handler(req, res) {
 
  const {
    query: {message},
  } = req
   
  producer(message);
  consumer();
 
  res.status(200).json({ name: 'John Doe' })
}


async function producer(message){
 
  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'quickstart',
    messages: [
      { value: message },
    ],
  })

  await producer.disconnect()
}

async function consumer(){
  const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'quickstart', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })
}