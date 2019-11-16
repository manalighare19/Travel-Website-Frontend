const router = require('express').Router();
const  axios = require('axios');

//Search city
router.post('/home',async(req,res) => {
    axios.post('https://travel-website-api-90028.herokuapp.com/api/places/getcity', {
        name:req.body.city
    }).then(response => {
        axios.post('https://travel-website-api-90028.herokuapp.com/api/places/getplaces', {
            city:response.data.cityId
        }).then(response => {
            console.log(response);
            res.render('cityInformation',{placeData: response.data});
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
});


module.exports =router;


