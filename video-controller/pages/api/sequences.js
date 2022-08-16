import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
    const client = await clientPromise;
    const db = client.db("SequenceSetup");

    switch(req.method) {
        case "POST":            
            let bodyObject = JSON.parse(req.body);
            console.log(req.body); 
            let newTmp = await db.collection("sequences").insertOne(bodyObject);
            res.json({status: 200});
            break;
        case "GET":
          const tmp = await db.collection("sequences").find({}).toArray();
          res.json( tmp );
          break;
        
        case "DELETE":
            let oldTmp = await db.collection("sequences").remove({});
            res.json({status: 200});
            break;
      }
  }