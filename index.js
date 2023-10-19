var express = require('express');
var router = express.Router();
var fs = require('fs');
var userModel = require('./users');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

router.get('/schema', async function(req, res){
    var user = await userModel.create({
    username: "shruti",
    name: "shruti agrawal",
    age: 20,
    email: "shruti@gmail.com"
  });
  res.send(user);
});

router.get('/', function(req, res, next){  //  we are doing it on / bczz we want to show them on / page
  fs.readdir('./files', {withFileTypes: true}, function(err, data){  //array of dirent deta hai withfiletype
    res.render('index', {data});
  })
})

router.get('/addfile', function(req, res, next){
  fs.writeFile(`./files/${req.query.filename}`, "", function(err){
    if(err){
      console.log(err);
    }
    res.redirect('/');
  })
})


router.get('/addfolder', function(req, res, next){
  fs.mkdir(`./files/${req.query.foldername}`, function(err){
    res.redirect('/');
  })
})
  
router.get('/folder/delete/:filename', function(req, res, next){
  fs.rmdir(`./files/${req.params.filename}`, function(err){
    res.redirect('/');
  })
})
  
  
router.get('/file/delete/:filename', function(req, res, next){
  fs.unlink(`./files/${req.params.filename}`, function(err){
    res.redirect('/');
  })
})

router.get('/file/:filename', function(req, res, next){ 
  fs.readdir('./files', {withFileTypes: true}, function(err, data){  
    fs.readFile('./files/${req.params.filename', "utf8", function(err, files){
      res.render('fileshow', {data, filename: req.params.filename, files})
    })
  })
});
  
router.get('/back', function(req, res){
  res.redirect('/');
})




router.get('/rename/:filename', function(req, res, next){ 
  fs.rename(`./files/${req.params.filename}`, `./files/${req.query.rename}`,function(err){
    if(err) {console.log(err)};
    res.redirect('/');
  })
});
module.exports = router;
