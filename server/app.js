
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const router = require("./routes/api")
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
var cors = require('cors')
dotenv.config();

const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("error: " + err);
    })

app.use(cors())
app.use(bodyParser.json())
app.use('/', router)



app.listen(process.env.PORT, () => { console.log("listening on port 3000"); })