var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use(router);

app.listen(8080);