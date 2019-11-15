const router = require('express').Router();
const  axios = require('axios');

//Search city
router.post('/home',async(req,res) => {
    axios.post('https://travel-website-api-90028.herokuapp.com/api/places/getcity', {
        name:req.body.city
    }).then(response => {
        console.log(req.body.city); 
        //res.render('searchCity');
    }).catch(err => {
        console.log(err);
    })
});

module.exports =router;


