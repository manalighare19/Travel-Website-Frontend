const router = require('express').Router();
const  axios = require('axios');



//Search city
router.post('/',async(req,res) => {
    
    const params = {
        "name":req.body.city
    }
    axios.get('https://travel-website-api-90028.herokuapp.com/api/cities', {
        params : params
        }).then(response => {
            
            cityName = response.data.name;
            cityId= response.data.cityId;
            
            const params = {
                "cityId":cityId
            }

            axios.all([
                axios.get('https://travel-website-api-90028.herokuapp.com/api/cities/attractions', {
                    params: params
                }),
                axios.get('https://travel-website-api-90028.herokuapp.com/api/cities/food', {
                    params: params
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


