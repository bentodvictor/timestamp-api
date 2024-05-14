const express = require('express');
const app = express();

// Enabel CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// URL-encoded data will be parsed with the querystring library.
// Parses the JSON string in the request body and exposes it in the req.body property
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// Set style
app.use(express.static('public'));

// Set homepage
app.get("/", (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get("/api/:date?", (req, res) => {
    let dateToShow = new Date();
    const { date } = req.params;

    if (/^\d+$/.test(date))
        dateToShow = new Date(parseInt(date));
    else if (date == "" || date == null)
        dateToShow = new Date();
    else
        dateToShow = new Date(date);

    if (dateToShow == 'Invalid Date') {
        res.json({ error: "Invalid Date" });
    }

    res.json({
        unix: dateToShow.valueOf(),
        utc: dateToShow.toUTCString()
    });
});


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});