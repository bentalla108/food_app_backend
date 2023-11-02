const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


const admin = require("firebase-admin");

const authRouter = require('./routes/authRouter');

const serviceAccount = require("./serviceAccountKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



dotenv.config()
mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connected to database Succesfully...'))
    .catch((err) => console.log(err))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', authRouter);
app.listen(process.env.PORT || port, () => console.log(`Foodly server is running on port ${process.env.PORT }!`))