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
            
            for (let index = 0; index < participant.length; index++) {
                const element = participant[index];

                const answers = element['quiz'];
                const images = element['confSeq'].filter(element => element.includes(".PNG")); //filter images from seq array
                const zip = (a, b) => a.map((k, i) => [k, b[i]]); // zip answers with images
                delete element['_id'];
                //delete element['confSeq'];
                element['quiz'] = zip(images, answers);

            }
            res.json( participant );
            break;
      }
  }