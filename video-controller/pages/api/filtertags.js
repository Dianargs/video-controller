import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
    const client = await clientPromise;
    const db = client.db("VideoCatalog");
    switch(req.method) {
      case "POST":
        let bodyObject = JSON.parse(req.body); 
        const checkFilter = await db.collection("FiltersTags").findOne({"name":bodyObject["name"]});
        if(!checkFilter && bodyObject["name"]!= ""){
           await db.collection("FiltersTag").insertOne(bodyObject);
        }
      
        res.json({status: 200});
        break;
      case "GET":
        const filters = await db.collection("FiltersTags").find().project({_id:0, name:1}).toArray();
  
        res.json( filters );
        break;
    }
  }