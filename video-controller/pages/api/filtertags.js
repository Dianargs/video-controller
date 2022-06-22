import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
    const client = await clientPromise;
    const db = client.db("VideoCatalog");
    switch(req.method) {
      case "POST":
        
        let bodyObject = JSON.parse(req.body); 
        const checkFilter = await db.collection("FiltersTags").findOne({"name":bodyObject["name"]});
        let newFilter;
        if(!checkFilter && bodyObject["name"]!= ""){
          newFilter =  await db.collection("FiltersTags").insertOne(bodyObject);
        }
        let n_filter = await db.collection("FiltersTags").findOne({"_id": newFilter.insertedId});
       
        res.json(n_filter);
       //res.json({status: 200});
        break;
      case "GET":
        const filters = await db.collection("FiltersTags").find().project({_id:0, name:1}).toArray();
  
        res.json( filters );
        break;
    }
  }