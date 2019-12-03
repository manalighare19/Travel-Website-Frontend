const router = require('express').Router();
const  axios = require('axios');



//Login
router.get('/', (req,res) => {
    res.render('login',{errMessage: null});
});

//Post method of Login
router.post('/', async(req,res) => {
    axios.post('https://travel-website-api-90028.herokuapp.com/login', {
    email: req.body.username,
    password: req.body.password
    }).then(response => {
        console.log(response.data.token);
        res.cookie('authrization_token',response.data.token);
        res.redirect('/search');
    }).catch(err => {
        console.log(err);
        res.render('login',{errMessage: err.response.data.message});
    })
});



module.exports =router;
