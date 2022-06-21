// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['192.168.1.154:9094'],
  //brokers: ['192.168.1.141:9094'], //casa
  //brokers: ['192.168.0.102:9094'],
})


export default function handler(req, res) {
 
  const {
    query: {message,topic},

  } = req
   
  producer(message,topic);

  res.status(200).send("ok");
 
}


async function producer(message, topic){
 
  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: topic,
    messages: [
      { value: message },
    ],
  })

  await producer.disconnect()
}

