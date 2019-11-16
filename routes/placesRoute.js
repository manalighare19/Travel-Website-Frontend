const router = require('express').Router();
const  axios = require('axios');

//Search city
router.post('/home',async(req,res) => {
    axios.post('https://travel-website-api-90028.herokuapp.com/api/places/getcity', {
        name:req.body.city
    }).then(response => {
        const cityName = response.data.name;
        axios.post('https://travel-website-api-90028.herokuapp.com/api/places/getplaces', {
            city:response.data.cityId
        }).then(response => {
            console.log(response);
            res.render('cityInformation',{placeData: response.data, CityName: cityName});
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
});


module.exports =router;


