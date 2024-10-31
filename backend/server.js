const express = require("express");
// const nodemon = require("nodemon")
const cors = require("cors")
const Graphrouter = require('./routes/activityGraph');
const SlateRouter = require('./routes/slate')
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/graph', Graphrouter);
app.use('/api/v1/slate', SlateRouter)

app.listen(3000 , ()=>{console.log("running on 3000")});