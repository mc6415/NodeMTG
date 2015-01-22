var express = require('express');
var router = express.Router();
var tutor = require('tutor');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Portal' });
});

router.post('/test', function(req,res){
    var cardName = req.body.cardName;
    var card = tutor.set(cardName, function(err,cards){
      res.render('test', {title:cardName, cards:cards})
    })

})

module.exports = router;
