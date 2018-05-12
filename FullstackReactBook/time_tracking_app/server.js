const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'public/data.json');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`)
});

app.get('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) throw err;
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});

app.post('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) throw err;
        const timers = JSON.parse(data);
        const newTimer = {
            title: req.body.title,
            project: req.body.project,
            id: req.body.id,
            elapsed: 0,
            runningSince: null
        };
        timers.push(newTimer);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(timers)
        });
    });
});

app.put('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) throw err;
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                timer.title = req.body.title;
                timer.project = req.body.project;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

app.delete('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) throw err;
        let timers = JSON.parse(data);
        timers = timers.reduce((memo, timer) => {
            if (timer.id === req.body.id) {
                return memo;
            } else {
                return memo.concat(timer);
            }
        }, []);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

app.post('/api/timers/start', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) throw err;
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                timer.runningSince = req.body.start;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

app.post('/api/timers/stop', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) throw err;
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                const delta = req.body.stop - timer.runningSince;
                timer.elapsed += delta;
                timer.runningSince = null;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});