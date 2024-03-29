import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
  const client = await clientPromise;
  const db = client.db("VideoCatalog");
  switch(req.method) {
    case "POST":

      let bodyObject = JSON.parse(req.body); 
      const checkVideo = await db.collection("Videos").findOne({"video_name":bodyObject["video_name"]});

      if(checkVideo){
        let updateVideo =await db.collection("Videos").findOne({"video_name":bodyObject["video_name"]});
        let newVideo = await db.collection("Videos").updateOne(updateVideo,{$set: {"new_video_name":bodyObject["new_video_name"] , "video_info":bodyObject["video_info"] , "filters":bodyObject["filters"], "thumbnail":bodyObject["thumbnail"]}});

      }else{

        let newVideo = await db.collection("Videos").insertOne(bodyObject);
      }

      res.json({status: 200});
      break;
    case "GET":
      const videos = await db.collection("Videos").countDocuments();

      res.json({status: 200, data: videos });
      break;
  }
}