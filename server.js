const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const userRouter = require('./route/user.route');
const cookieParser = require('cookie-parser');
const ENV = require('dotenv');
ENV.config();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user',userRouter);

app.listen(process.env.PORT, function(){
  console.log('Server is running on Port:',process.env.PORT);
});