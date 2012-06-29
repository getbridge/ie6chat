var express = require('express')

var app = express.createServer();

app.configure(function() {
  app.use(express.static('public/'));
});

app.listen(4000);
