const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;

const bodyParser=require('body-parser');
const cookie_parser = require('cookie-parser');

//Import Routes
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const placeRoute = require('./routes/placesRoute');
const searchCityRoute = require('./routes/searchCityRoute');
const adminRoute = require('./routes/adminRoute');

//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookie_parser());
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

//Route Middlewares
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/home', placeRoute);
app.use('/search', searchCityRoute);
app.use('/admin', adminRoute);

// Logout 
app.post('/logout', (req,res) => {
    res.clearCookie('authrization_token');
    res.redirect('/login');
});


//Default route
app.get('/*', (req,res) => {
    res.redirect('/login');
});

app.listen(port, () => console.log('Listening on port 8080'));
