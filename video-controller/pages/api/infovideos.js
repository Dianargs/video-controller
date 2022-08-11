import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
  const client = await clientPromise;
  const db = client.db("VideoCatalog");
  switch(req.method) {

    case "GET":
      const videos = await db.collection("Videos").find({}).toArray();
      res.json(videos);
      break;
  }
}