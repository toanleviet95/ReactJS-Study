const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname + 'public/data.json');

app.use('/', express.static(path.join(__dirname + '/public')));
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`)
});