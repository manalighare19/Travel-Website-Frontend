const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;

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
app.use('/assets', express.static('assets'));

//Route Middlewares
app.use('/user', authRoute);
app.use('/cities', placeRoute);

//Default route
app.get('/*', (req,res) => {
    res.redirect('/user/login');
});

app.listen(port, () => console.log('Listening on port 8080'));
