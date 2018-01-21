var express = require('express');
var app = new express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

var port = 3000;

app.listen(port, function() {
    console.log(`Listening on ${port}`);
});

app.get('/', function(req, res) {
    res.render('home');
});