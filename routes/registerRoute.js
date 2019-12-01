const router = require('express').Router();
const  axios = require('axios');

//Register
router.get('/', (req,res) => {
    res.render('register',{errMessage: null});
});

//Post method of Register
router.post('/',async(req,res) => {
    axios.post('https://travel-website-api-90028.herokuapp.com/api/users', {
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(response => {
        console.log(response);
        res.render('login',{errMessage: null});
        //res.cookie('authrization_token',response.data.token);
    }).catch(err => {
        console.log(err);
        res.render('register',{errMessage: err.response.data.message});
    })
});

module.exports =router;