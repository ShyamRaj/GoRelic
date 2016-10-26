var express = require("express");
var yargs = require("yargs")
  .usage('Usage: use -p 8080 to pass port')
  .demand(['p'])
  .argv;
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

var router = express.Router();

var port = yargs.p || 8080;
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": false
}));

app.use(router);

app.get('*', function(req, res) {
  res.redirect('/');
});

app.listen(port, function() {
  console.log('express server listening on port ' + port);
});
