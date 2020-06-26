var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
const multer = require('multer');
var path=require('path');
var monk = require('monk');
var db = monk('localhost:27017/musicStore');

const storage=multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/../public/images')
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
});

const upload = multer({
  storage:storage
})
//user sign up,login,logout

router.get('/', function (req, res) {
      var collection = db.get('music');
      if(req.user == undefined || !req.user.isAdmin){
        collection.find({flag:"true"}, function(err, music){
            if (err) throw err;
            res.render('index',{music:music,user:req.user});
      
    });
  }
  else{
   collection.find({}, function(err, music){
            if (err) throw err;
            res.render('index',{music:music,user:req.user});
      
    }); 
  }
});

  router.get('/register', function(req, res) {
      res.render('register', { user:req.user});
  });

  router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
         if (err) {
            return res.render('register', { info:"Sorry, account already exist" });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

  router.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  router.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/');
  });

  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });


 router.get('/viewAll/:page', function (req, res) {
  var collection = db.get('music');
  const resPerPage = 10;
  const page = req.params.page || 1;
  var skip = parseInt((resPerPage * page) - resPerPage);
  var limit = parseInt(resPerPage);
if(req.user==undefined || !req.user.isAdmin){
  if(req.query.search){
    const regex1 = new RegExp(escapeRegex(req.query.search), 'gi');
    var field = req.query.filter;
    if(field == 'title'){
    collection.find({ title: regex1,flag:"true"}, function(err, music){
        if (err) throw err;
        var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
  else if(field == 'genre'){
    collection.find({ genre: regex1,flag:"true"}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
  else if(field == 'album'){
    collection.find({ album: regex1,flag:"true"}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
  else if(field == 'artist'){
    collection.find({ artist: regex1,flag:"true"}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
  }
  else{
    var collection = db.get('music');
    collection.find({flag:"true"}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
}
else{
if(req.query.search){
    const abc = req.query.search;
    const regex1 = new RegExp(escapeRegex(req.query.search), 'gi');
    var field = req.query.filter;
    if(field == 'title'){
    collection.find({ title: regex1}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
  else if(field == 'genre'){
    collection.find({ genre: regex1}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag,
          searchValue: abc,
          filterValue: field
        });
    });
  }
  else if(field == 'album'){
    collection.find({ album: regex1}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
  else if(field == 'artist'){
    collection.find({ artist: regex1}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
  }
  else{
    var collection = db.get('music');
    collection.find({}, function(err, music){
        if (err) throw err;
         var flag;
        pagemusic = music.slice(skip,skip+limit);
        if(parseInt(Math.ceil(music.length/resPerPage)-page)>0){
          flag = "true";
        }
        res.render('viewallitems.ejs',{
          music:pagemusic,
          user:req.user,
          currentPage:page,
          flag : flag
        });
    });
  }
}
});

 router.get('/new', function(req, res) {
 res.render('new',{user:req.user});
});

router.post('/music', upload.single('photo'), function(req, res){
    var collection = db.get('music');
    collection.insert({
        title: req.body.title,
        genre: req.body.genre,
        image: req.file.originalname,
        artist: req.body.artist,
        album: req.body.album,
        price: req.body.price,
        flag: "true"
    }, function(err, song){
        if (err) throw err;

        res.redirect('/');
    });
});


router.get('/music/:id', function(req, res) {
    var collection = db.get('music');
    collection.findOne({_id: req.params.id}, function(err, song){
        if (err) throw err;
        var buy = "true";
        var cart = "false";
        if(req.user != undefined){
        if(req.user.purchasedItems.includes(req.params.id))
        {
            buy = "false";
        }
        if(!req.user.cart.includes(req.params.id))
        {
            cart = "true";
        }}
       res.render('show',{song:song,user:req.user,buy:buy,cart:cart});
    });
});


router.get('/music/:id/edit', function(req, res) {
    var collection = db.get('music');
    collection.findOne({_id: req.params.id}, function(err, song){
        if (err) throw err;
        res.render('edit',{song:song,user:req.user});
    });
});


router.put('/music/:id', upload.single('photo'), function(req, res){
    var collection = db.get('music');
    if(req.file){
    collection.findOneAndUpdate({ _id: req.params.id},
        { $set:
            {
                title: req.body.title,
                genre: req.body.genre,
                image: req.file.originalname,
                artist: req.body.artist,
                album: req.body.album,
                price: req.body.price
            }
    }).then((updateDoc) => {})
    res.redirect('/')}
    else{
       collection.findOneAndUpdate({ _id: req.params.id},
        { $set:
            {
                title: req.body.title,
                genre: req.body.genre,
                artist: req.body.artist,
                album: req.body.album,
                price: req.body.price
            }
    }).then((updateDoc) => {})
    res.redirect('/')
    }
});

router.get('/cart/:id/add', function(req, res){
    var mcollection = db.get('music');
    var collection = db.get('accounts');
    if(!req.user.cart.includes(req.params.id)){
    collection.findOneAndUpdate({_id: req.user.id},
        { $push:
            {
                cart: req.params.id
            }
    }).then((updateDoc) => {})}
     var collection = db.get('music');
    collection.findOne({_id: req.params.id}, function(err, song){
        if (err) throw err;
          res.redirect('/cart');
    });
    
});


router.get('/cart/:id/remove', function(req, res){
    var mcollection = db.get('music');
    var collection = db.get('accounts');
    collection.findOneAndUpdate({_id: req.user.id},
        { $pull:
            {
                cart: req.params.id
            }
    }).then((updateDoc) => {})
     var collection = db.get('music');
    collection.findOne({_id: req.params.id}, function(err, song){
        if (err) throw err;
       res.redirect('/cart');
    });
    
});

router.get('/cart', function(req,res){
  try{
  var mcollection = db.get('music');
  var collection = db.get('accounts');
  let hello = new Promise(function(resolve,reject){ 
  resolve(req);
});
  let hi = hello.then(function(value){
     var abc =  collection.findOne({_id: req.user.id}, function(err, account){
          if (err) throw err;
          return account.cart;
  });
     return abc;
     
});
var songs = [];
let cart = hi.then(function(value){
  for(key in value.cart)
  {
      mcollection.find({_id:value.cart[key]}, function(req,song){songs.push(song[0]);});
  }

});
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
sleep(3500).then(() => {
let temp = cart.then(function(value){
  res.render('cart',{cart:songs,user:req.user});

});
});
}
catch(error){
  console.error(error);
}
});


router.get('/checkout', function(req, res) {
try{
  var mcollection = db.get('music');
  var collection = db.get('accounts');
  let hello = new Promise(function(resolve,reject){ 
  resolve(req);
});
  let hi = hello.then(function(value){
     var abc =  collection.findOne({_id: req.user.id}, function(err, account){
          if (err) throw err;
          return account.cart;
  });
     return abc;
     
});
var songs = [];
var sum = 0;
let cart = hi.then(function(value){
  for(key in value.cart)
  {
      mcollection.find({_id:value.cart[key]}, function(req,song){songs.push(song[0]);sum = sum + parseFloat(song[0].price);});

  }

});
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
sleep(3500).then(() => {
let temp = cart.then(function(value){
  res.render('checkout',{cart:songs,user:req.user,sum:sum});

});
});
}
catch(error){
  console.error(error);
}
});

router.get('/order/all', function (req, res) {
    try{
  
  var collection = db.get('accounts');
  let hello = new Promise(function(resolve,reject){ 
  resolve(req);
});
  let hi = hello.then(function(value){
     var abc =  collection.findOne({_id: req.user.id}, function(err, account){
          if (err) throw err;
          return account.cart;
  });
     return abc;
     
});
let cart = hi.then(function(value){
  for(key in value.cart)
  {
      collection.findOneAndUpdate({_id: req.user.id},
        { $push:
            {
                purchasedItems: value.cart[key]
            }
    }).then((updateDoc) => {})
  }

});
let temp = cart.then(function(value){
collection.findOneAndUpdate({_id: req.user.id},
        { $set:
            {
                cart: []
            }
    }).then((updateDoc) => {})
  
});
let t = temp.then(function(value){
  var son = [];
  res.redirect('/cart');
});

}
catch(error){
  console.error(error);
}
});

router.get('/orders', function (req, res) {
    try{
  var mcollection = db.get('music');
  var collection = db.get('accounts');
  let hello = new Promise(function(resolve,reject){ 
  resolve(req);
});
  let hi = hello.then(function(value){
     var abc =  collection.findOne({_id: req.user.id}, function(err, account){
          if (err) throw err;
          return account.purchasedItems;
  });
     return abc;
     
});
var songs = [];
let items = hi.then(function(value){
  
  for(key in value.purchasedItems)
  {
      mcollection.find({_id:value.purchasedItems[key]}, function(req,song){songs.push(song[0]);});
  }

});
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
sleep(3500).then(() => {
let temp = items.then(function(value){
  res.render('order',{songs:songs,user:req.user})

    });
  });
}
catch(error){
  console.error(error);
}
});
router.delete('/music/:id', function(req, res){
    var collection = db.get('music');
    collection.findOneAndUpdate({ _id: req.params.id },
     { $set:
            {
               flag : "false"
            }
    }).then((updateDoc) => {})
    res.redirect('/')
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = router;