const router = require('express').Router();
const  axios = require('axios');

//Login
router.get('/login', (req,res) => {
    res.render('adminLogin',{errMessage: null});
});

router.post('/login', (req,res) => {
    axios.post('https://travel-website-api-90028.herokuapp.com/admin/login', {
        email: req.body.username,
        password: req.body.password
        }).then(response => {
            res.cookie('authrization_token',response.data.token);
            res.redirect('/admin/home');
        }).catch(err => {
            console.log(err);
            res.render('login',{errMessage: err.response});
        })
});

//Post method of Admin Login
router.get('/home', async(req,res) => { 
    const headers = {
        "auth-token":req.cookies.authrization_token
    }   
    axios.get('https://travel-website-api-90028.herokuapp.com/admin/attractions', {
            headers:headers
            }).then(response => { 
                res.render('adminHome',{attractionData : response.data}); 
            }).catch(err => {
                console.log(err);
                res.render('adminLogin',{errMessage: err.response})
            })
});

router.post('/edit-info', async(req,res) =>{

    const headers = {
        "auth-token":req.cookies.authrization_token
    } 
    
    axios.get('https://travel-website-api-90028.herokuapp.com/admin/attractions', {
        headers:headers
        }).then(response => { 
            for (let index = 0; index < response.data.length; index++) {
                if(response.data[index]._id == req.body._id){
                    res.render('editInformation',{object : response.data[index]});                                            
                }
            }
        }).catch(err => {
                console.log(err);
                res.redirect('/admin/edit-info');
        })

    
});

//Put method
router.post('/save-info', async (req,res) => {
    console.log("inside put");
    console.log(req.body._id);
    console.log(req.body.name);
    
    axios.put('https://travel-website-api-90028.herokuapp.com/admin/attractions', 
    {
        "_id" : req.body._id,
        "city": req.body.cityId,
        "name": req.body.name,
        "description": req.body.desc,
        "image": req.body.imageURL   
    },
    {
        headers:{
            "auth-token":req.cookies.authrization_token 
        }
    }).then(response =>{
        console.log(response);
        res.redirect('/admin/home');
        
    }).catch(err =>{
        console.log(err);
        
    })

});

//Admin Logout
router.post('/logout', (req,res) => {
    res.clearCookie('authrization_token');
    res.redirect('/login');
});


module.exports =router;
