import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
  const client = await clientPromise;
  const db = client.db("VideoCatalog");
  switch(req.method) {

    case "GET":
      let videos = "";
      if (req.query.filter) {
        var filter = req.query.filter;
       
        if (typeof filter === 'string') {
         
          videos = await db.collection("Videos").find({ filters: filter }).toArray();
        } else {
         
          videos = await db.collection("Videos").find({ filters: {$all: filter} }).toArray();
        }
      } else {
        videos = await db.collection("Videos").find({}).toArray();
      }


      res.json(videos);
      break;
  }
}