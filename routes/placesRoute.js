const router = require('express').Router();
const  axios = require('axios');



//Search city
router.post('/',async(req,res) => {
    
    const params = {
        "name":req.body.city
    }
    axios.get('https://travel-website-api-90028.herokuapp.com/cities', {
        params : params
        }).then(response => {
            
            cityName = response.data.name;
            cityId= response.data.cityId;
            
            const params = {
                "cityId":cityId
            }

            axios.all([
                axios.get('https://travel-website-api-90028.herokuapp.com/cities/attractions', {
                    params: params
                }),
                axios.get('https://travel-website-api-90028.herokuapp.com/cities/food', {
                    params: params
                 })
            ]).then(axios.spread((placeData, cusineData) => {
                res.render('cityInformation',{placeData: placeData.data, CityName: cityName, cusineData:cusineData.data, errMessage: null});

            }));
    }).catch(err => {
        console.log(err);
        res.render('searchCity',{errMessage: err.response.data.message})
    })
});


module.exports =router;


