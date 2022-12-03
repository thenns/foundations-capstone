const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { createServer,
        deleteServer
      } = require('./controller');
//app.engine('html', ');
//app.set('view engine', 'html');
//app.get('/', function (req, res) {
//    res.render('index', {});
//});
app.post("/api/create_server", createServer);
app.delete("/api/delete_server", deleteServer);
app.listen(4000, () => console.log("server running on 4000"));

app.use(express.static('../client'));
