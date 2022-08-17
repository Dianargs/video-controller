import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
    const client = await clientPromise;
    const db = client.db("SequenceSetup");

    switch(req.method) {
        case "POST":            
            
            let newTmp = await db.collection("tmpImage").insertOne(req.body);
            res.json({status: 200});
            break;
        case "GET":
          const tmp = await db.collection("tmpImage").find({}).toArray();
          res.json( tmp );
          break;
        
        case "DELETE":
            let oldTmp = await db.collection("tmpImage").remove({});
            res.json({status: 200});
            break;
      }
  }