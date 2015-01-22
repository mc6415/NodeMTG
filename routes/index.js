var express = require('express');
var router = express.Router();
var tutor = require('tutor');

function getSets(req,res,callback){
  var db = req.db;
  var collection = db.get('sets');

  collection.find({}, function(err,docs){
    callback(docs);
  })
}

/* GET home page. */
router.get('/', function(req, res) {
  getSets(req,res,function(sets){
    res.render('index', {title:'Portal', sets:sets})
  })
});

router.post('/cards', function(req,res){
    var cardName = req.body.cardName;
    var card = tutor.set(cardName, function(err,cards){
      console.log(cards[0]);
      res.render('cards', {title:cardName, cards:cards})
    })

})

module.exports = router;
