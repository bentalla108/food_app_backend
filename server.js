const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


const admin = require("firebase-admin");

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/user')
const restaurantRouter = require('./routes/restaurant')
const categoryRouter = require('./routes/category')

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
app.use('/api/users' , userRouter )
app.use('/api/restaurant' , restaurantRouter )
app.use('/api/category' , categoryRouter )
app.listen(process.env.PORT || port, () => console.log(`Foodly server is running on port ${process.env.PORT }!`))