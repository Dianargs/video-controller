// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})


export default function handler(req, res) {
 
  const {
    query: {message,topic},

  } = req
   
  producer(message,topic);
 
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

