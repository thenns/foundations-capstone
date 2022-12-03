const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { //createServer
        //deleteServera
      } = require('./controller')

app.get("/api/create_server", createServer);
app.delete("/api/delete_server", deleteServer);
app.listen(4000, () => console.log("server running on 4000"));
