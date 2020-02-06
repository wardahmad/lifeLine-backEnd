const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//const methodOverride = require('method-override');

const db = require('./config/db');
const memberRouter = require('./app/routes/member.js')
const hospitalRouter = require('./app/routes/hospital')


// mongoose.connect(db, {useNewUrlParser: true});
// mongoose.connection.once('open', function(){
//     console.log('connected to mongo');
// });
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB is running'),(err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extand : true}));
app.use(cors());
app.use(memberRouter);
app.use(hospitalRouter);


const port = process.env.PORT || 7000;
app.listen(port, function() {
    console.log(`Project Express App is listening on port ${port}`);
});