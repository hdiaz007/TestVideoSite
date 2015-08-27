var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World!' });
});

/* GET video list. */
router.get('/videolist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('movies');
  collection.find({},{},function(e,docs){
    res.render('videolist', {
      "videolist" : docs
    });
  });
});

/* Upload Video */
router.get('/upload', function(req,res){
  res.render('upload', {title: 'Upload Video'});
});

/* POST to Upload Video */
router.post('/uploadvideo', function(req, res) {
  var db = req.db;
  var title = req.body.videoTitle;
  var desc = req.body.videoDesc;
  
  var collection = db.get('movies');
  
  collection.insert({
    "title" : title,
    "description" : desc
  }, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the record to the database!");
    }
    else {
      res.redirect('videolist');
    }
  });
});

module.exports = router;
