const express = require('express'); //importing express for use
const router = express.Router(); //importing router method for use

//importing data from the json file
const { data } = require('../data/flashcardData.json'); //importing json file so it can be access
const { cards } = data; //storing the data into a variable called cards

//all routes
//router.get('/:id', (req, res) => {
//    res.render('card', {
//        prompt: cards[req.params.id].question,  //req.params.id is used in replaced of the array[]
//        hint: cards[req.params.id].hint});
//});
router.get( '/', ( req, res )=> {
    const numberOfCards = cards.length;
    const flashcardId = Math.floor( Math.random() * numberOfCards );
    res.redirect( `/questions/${flashcardId}` );
});

router.get('/:id', (req, res) => {
    const { side } = req.query; //url query
    const { id } = req.params;
    
    if(!side){
        return res.redirect( `/questions/${id}?side=question` );
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];

    const templateData = { id, text, name };  //templateData.{value} is used to access data from json
    if ( side === 'question' ){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer' ){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('question', templateData);
});

   

//exporting router so it can be reference in the app.js file
module.exports = router;