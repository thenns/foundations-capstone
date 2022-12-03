const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const {  } = require('./controller')

app.listen(4000, () => console.log("server running on 4000"));
