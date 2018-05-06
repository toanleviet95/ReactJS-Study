var express = require('express');
var jsonParser = require('body-parser').json();
var app = express();
var session = require('express-session');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
    secret: 'abcd',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24}
}))
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started'))
app.get('/', (req, res) => res.render('home'));

app.post('/sign-in', jsonParser, (req, res) => {
    var {username, password} = req.body;
    if(username === 'toanlv' && password === '123456') {
        req.session.username = username;
        return res.send('Success');
    }
    return res.send('Failed');
});

app.get('/get-info', (req, res) => {
    if (req.session.username) {
        return res.send(req.session.username);
    }
    return res.send('Not Sign In');
})

app.get('/sign-out', (req, res) => {
    req.session.username = undefined;
    res.send('Sign Out');
})
