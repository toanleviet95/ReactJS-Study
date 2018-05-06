var Express = require('express');
var app = new Express();
app.use(Express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(3000);

app.get('/', function(req, res) {
    res.render('homepage');
});