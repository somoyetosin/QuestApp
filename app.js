const express = require('express'); //importing express for use
//importing bodyParser for form submission use
const bodyParser = require('body-parser'); 
//importing bodyParser for form submission use
const cookieParser = require('cookie-parser');

//assigning express to a variable
const app = express();
//making express use bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
//making express use cookie
app.use(cookieParser());
//importing files in public folder for use
app.use('/static', express.static('public'));
//setting the view engine
app.set('view engine', 'pug');

//importing all routes for use here
const mainRoutes = require('./routes');
const questionsRoutes = require('./routes/questions');

app.use(mainRoutes);
app.use('/questions', questionsRoutes);

//sending error to error page for PAGE NOT FOUND (MIDDLEWARE)
app.use((req, res, next) => {
    const err = new Error('Page not Found');
    err.status = 404;
    next(err);
});
//sending error to error page for status 500
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});
//setting port for server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});