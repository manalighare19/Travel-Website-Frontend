const express = require('express');
const app = express();
const port =  8080;

const bodyParser=require('body-parser');
const cookie_parser = require('cookie-parser');


//Import Routes
const authRoute = require('./routes/profileRoute');
const placeRoute = require('./routes/placesRoute');


//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookie_parser());
app.set('view engine', 'ejs');

//Route Middlewares
app.use('/user', authRoute);
app.use('/cities', placeRoute);

app.listen(port, () => console.log('Listening on port 8080'));
