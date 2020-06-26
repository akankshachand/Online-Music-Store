var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/musicStore');

router.get('/', function(req, res) {
       res.render('index');
    });


module.exports = router;