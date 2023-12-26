// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use("/",(req, res)=>{
  res.json({message:"Hello"});
});

app.listen(9000, () => {
  console.log(`Server running`);
});
