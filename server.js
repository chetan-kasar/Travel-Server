// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const multer  = require('multer')

const cors = require('cors');
const app = express();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

global.titleImageName = "";
global.albumImages = {};

app.use(cors());

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./images");
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());

app.use("/",(req, res)=>{
  res.send("Home is Working");
});

/*app.post('/add', async (req, res) => {

    const database = client.db("mydb");
    const mycollection = database.collection("mycollection");
    req.body.userData.titleData.titleImage = global.titleImageName;
    req.body.userData.albumData.photos = albumImages;
    const result = await mycollection.insertOne(req.body.userData);

    // console.log(global.imageName);

    //res.json({ message: 'Data received on the server' });
});

app.get('/get', async (req, res) => {

  const database = client.db("mydb");
  const mycollection = database.collection("mycollection");

  const result = await mycollection.find({}).toArray();
  res.json(result);

  console.log(result);

});*/

app.post('/upload', upload.single("titleImage"), async (req, res) => {

  if(req.file)
  global.titleImageName = req.file.filename;

  else
  global.titleImageName = "Travel.jpg";

  res.send("Upload is working");

});

/*app.post('/album', upload.array("photoAlbum", 30), async (req, res, next) => {

   const database = client.db("mydb");
   const mycollection = database.collection("mycollection");

   //global.albumImages = req.files.filename;
    const doc = req.files.map(e=>(e.filename));
    const doc1 = doc.map(e=>({e}));
    global.albumImages = doc1;
    //const result = await mycollection.insertOne({doc1});
});*/


const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
