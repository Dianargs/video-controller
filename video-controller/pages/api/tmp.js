import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
    const client = await clientPromise;
    const db = client.db("SequenceSetup");

    switch(req.method) {
        case "POST":            
            console.log(req.body)
            console.log(typeof req.body)
            let newTmp = await db.collection("tmp").insertOne(req.body);
            res.json({status: 200});
            break;
        case "GET":
          const tmp = await db.collection("tmp").find({}).toArray();
          res.json( tmp );
          break;
        
        case "DELETE":
            let oldTmp = await db.collection("tmp").remove({});
            res.json({status: 200});
            break;
      }
  }