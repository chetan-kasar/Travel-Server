const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const app = express();
const upload = multer();

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect('mongodb+srv://kasarschetan1122:CUhAtAZZCzo4eg7g@cluster0.6xbessh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Mongoose schema for storing image data as BinData
const ImageSchema = new mongoose.Schema({
  data:Buffer
});

const Image = mongoose.model('Image', ImageSchema);

// Route to handle image upload
app.post('/uploadImage', upload.single('file'), (req, res) => {
  console.log(req.file.buffer);
  const fileData = req.file.buffer;
  const newFile = new Image({ data: fileData });
  newFile.save();
  res.send("Data received");
});

app.get('/getImage', async (req, res) => {
  try {
    // Find the stored image document in the database
    const storedImage = await Image.findOne();

    const base64Image = storedImage.data.toString('base64'); 
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
    console.log(dataUrl);

    if (!storedImage) {
      return res.status(404).send('No image found.');
    }

    //res.contentType('image/jpeg');
   
    res.send(dataUrl);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).send('Error retrieving image.');
  }
});

app.listen(5000, () => {
  console.log('Server is running');
});
