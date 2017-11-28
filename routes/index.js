const express = require('express'); //importing express for use
const router = express.Router(); //importing router method for use

//Home page Route
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/application', (req, res) => {
    const name = req.cookies.username;
    if (name){
        res.redirect('/quest');
    } else{
        res.render('application');
    }
});

//Question page Route
router.get('/quest', (req, res) => {
    const name = req.cookies.username;  //storing cookie into variable
    if (name){
        res.render('home', { name });
    } else{
        res.redirect('/application');
    }
});

router.post('/application', (req, res) => {
    //saving input from form into cookie to be reuse on page again
    res.cookie('username', req.body.username);
    //res.render('hello', { name: req.body.username }); //storing input from form into variable
    res.redirect('/quest'); //storing input from form into variable
});


//route to unset cookie (logout route)
router.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/application');
});

//exporting router so it can be reference in the app.js file
module.exports = router;