const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const server = express();
const port = 3000;

const router = require("./router")

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

server.use(express.static(path.join(__dirname, "../public")));

server.use(cors());

server.use("/",router);

server.listen(3000, ()=>{
  console.log("Listening to port: ", port)
})

