const router = require('express').Router();
const  axios = require('axios');

//search city get method
router.get('/home', (req,res) => {
    res.render('searchCity',{errMessage: null});
});


//Search city
router.post('/home',async(req,res) => {
    
    let cityName
    axios.post('https://travel-website-api-90028.herokuapp.com/api/places/getcity', {
        name:req.body.city
        }).then(response => {
            cityName = response.data.name;
    
            axios.all([
                axios.post('https://travel-website-api-90028.herokuapp.com/api/places/getplaces', {
                    city:response.data.cityId
                }),
                axios.post('https://travel-website-api-90028.herokuapp.com/api/places/getfoodplaces', {
                city:response.data.cityId
                 })
            ]).then(axios.spread((placeData, cusineData) => {
                console.log(placeData.data);
                console.log(cusineData.data);
                res.render('cityInformation',{placeData: placeData.data, CityName: cityName, cusineData:cusineData.data, errMessage: null});

            }));
    }).catch(err => {
        console.log(err);
        res.render('searchCity',{errMessage: err.response.data.message})
    })
});


module.exports =router;


