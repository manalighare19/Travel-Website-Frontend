const router = require('express').Router();

//search city get method
router.get('/', (req,res) => {
    res.render('searchCity',{errMessage: null});
});
module.exports = router;
