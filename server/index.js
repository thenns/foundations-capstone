const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { createServer,
        getServers,
        deleteServer
      } = require('./controller');
app.post("/api/create_server", createServer);
app.get("/api/get_servers", getServers);
app.post("/api/delete_server", deleteServer);
app.listen(4000, () => console.log("server running on 4000"));

app.use(express.static('../client'));
