const router = require('express').Router();
const  axios = require('axios');

//Register
router.get('/register', (req,res) => {
    res.render('register');
});

//Login
router.get('/login', (req,res) => {
    res.render('login',{errMessage: null});
});

//Post method of Login
router.post('/login',async(req,res) => {
    axios.post('https://travel-website-api-90028.herokuapp.com/api/user/login', {
    email: req.body.username,
    password: req.body.password
    }).then(response => {
        console.log(response.data.token);
        res.cookie('authrization_token',response.data.token);
        res.redirect('/cities/home');
    }).catch(err => {
        console.log(err);
        res.render('login',{errMessage: "Invalid Username or Password"});
    })
});

//Post method of Register
router.post('/register',async(req,res) => {
    axios.post('https://travel-website-api-90028.herokuapp.com/api/user/register', {
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(response => {
        console.log(response);
        res.render('login');
        //res.cookie('authrization_token',response.data.token);
    }).catch(err => {
        console.log(err);
    })
});

// Logout 
router.post('/logout', (req,res) => {
    res.clearCookie('authrization_token');
    res.redirect('/user/login');
});

module.exports =router;
