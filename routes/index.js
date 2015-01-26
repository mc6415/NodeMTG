var express = require('express');
var router = express.Router();
var tutor = require('tutor');
var sha256 = require('sha256');

function getSets(req,res,callback){
  var db = req.db;
  var collection = db.get('sets');

  collection.find({}, function(err,docs){
    callback(docs);
  })
}

/* GET home page. */
router.get('/search', function(req, res) {
  res.clearCookie('set');

  getSets(req,res,function(sets){
    res.render('search', {title:'Portal', sets:sets})
  })
});

router.get('/', function(req,res){
  res.render('index')
})

router.get('/registration', function(req,res){
  res.render('registration')
})

router.post('/register', function(req,res){
  var db = req.db;
  var collection = db.get('users');

  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var username = req.body.username;
  var email = req.body.email;
  var password = sha256(req.body.password);


  res.send(password)
})

router.post('/logon', function(req,res){
  var password = req.body.password;
  res.send(sha256(password));
})

router.post('/cards', function(req,res){
    var cardName = req.body.cardName;
    var rarity = req.param('rarity');
    if(rarity===undefined){
      rarity = 'all'
    }
    console.log('Rarity: '+rarity);
    var card = tutor.set(cardName, function(err,cards){
      console.log(cards[0]);
      res.render('cards', {title:cardName, cards:cards, setName: cardName, rarity:rarity})
    })

})

router.post('/getcard', function(req,res){
  var cardName = req.body.card;
  res.redirect('/card?name='+cardName)
})

router.get('/card', function(req,res){
  var cardName = req.param('name');
  tutor.card(cardName, function(err,card){
    tutor.formats(function(err, formatNames){
      console.log(card);
      res.render('card', {
        title: card.name,
        card: card,
        formats: formatNames
      })
    })
  })
})

router.get('/events', function(req,res){
  res.render('events')
})

module.exports = router;
