import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
  const client = await clientPromise;
  const db = client.db("VideoCatalog");
  switch(req.method) {
    case "GET":
      let videos = "";
      let videosInfo = [];
      if (req.query.filter) {
        var filter = req.query.filter;
       
        if (typeof filter === 'string') {
         
          videos = await db.collection("Videos").find({ filters: filter }).toArray();
        } else {
         
          videos = await db.collection("Videos").find({ filters: {$all: filter} }).toArray();
        }
        res.json(videos);
        break;
      } 
      else if(req.query.video){
        var video = req.query.video;
        //wconsole.log(video);
        for (let index = 0; index < video.length; index++) {
          videosInfo.push(await db.collection("Videos").find({ new_video_name: video[index] }).toArray());
        }
       
        //console.log(videosInfo[0][0]['new_video_name']);
        res.json(videosInfo);
        break;
      }
      else {
        videos = await db.collection("Videos").find({}).toArray();
        res.json(videos);
        break;
      }


     
  }
}