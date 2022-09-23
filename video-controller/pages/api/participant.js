import clientPromise from '../../middleware/database';

export default async function handler(req,res) {
    const client = await clientPromise;
    const db = client.db("Participants");
    
    let img = await fetch("http://localhost:8085/list_contents/images", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
  
    let metadata = await img.json();

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
                const images = element['confSeq'].filter(element => element.includes(".PNG") || element.includes(".png")); //filter images from seq array
                const zip = (a, b) => a.map((k, i) => [k, b[i]]); // zip answers with images
                delete element['_id'];
                //delete element['confSeq'];
                element['quiz'] = zip(images, answers);
                    
                for(let a=0; a<element['quiz'].length; a++ ){
                    for(let i=0; i<metadata.length; i++) {
                        //console.log(element['quiz'][a][0]);
                        //console.log(metadata[i]);
                        if(element['quiz'][a][0] == metadata[i]){
                            element[metadata[i]]=element['quiz'][a][1];
                        }
                    }
                } 
                delete element['quiz'];
            }
            
            res.json( participant );
            break;
      }
  }