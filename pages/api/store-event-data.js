import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

// handler func for incoming event requests
export default async function handler(req, res) {
    if (req.method === "POST") {
      return await storeEventData(req, res);
    } else {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
}

// async func to storeEventData
async function storeEventData(req, res) {
    const body = req.body;
    try {
      const files = await makeFileObjects(body);
      const cid = await storeFiles(files);
      return res.status(200).json({ success: true, cid: cid });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error creating event", success: false });
    }
  }

  // async func to makeFileObjects
  async function makeFileObjects(body) {
    const buffer = Buffer.from(JSON.stringify(body));
  
    const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`);
    const files = await getFilesFromPath(imageDirectory);
  
    files.push(new File([buffer], "data.json"));
    return files;
  }

// func to create web3storage client obj
function makeStorageClient() {
    return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

// call put method to upload array of files
async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    // When our files have been uploaded, client.put returns a content identifier (CID). This CID is the unique hash that we will store on-chain and use to retrieve our files.
    return cid;
}
