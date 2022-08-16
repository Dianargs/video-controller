import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
    const client = await clientPromise;
    const db = client.db("Participants");
    switch(req.method) {
        case "POST":            
            let newParticipant = await db.collection("ImmediateMemoryTest").insertOne(req.body);
            res.json({status: 200});
            break;
        case "GET":
          const participant = await db.collection("ImmediateMemoryTest").find({}).toArray();
          res.json( participant );
          break;
      }
  }