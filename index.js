const express = require('express');
const app = express();

// Enabel CORS
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// URL-encoded data will be parsed with the querystring library.
// Parses the JSON string in the request body and exposes it in the req.body property
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: "false"}));
app.use(bodyParser.json());

// Set style
app.use(express.static('public'));

// Set homepage
app.get("/", (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get("/api/:date?", (req, res) => {
    let result = {};
    let dateToShow = new Date();
    const {date} = req.params;

    if(!date.includes("-"))
        dateToShow = new Date(parseInt(date));
    else 
        dateToShow = new Date(date);

    if(dateToShow == 'Invalid Date') {
        const actualTimeStamp = new Date();

        result["unix"] = actualTimeStamp.valueOf(), 
        result["utc"] = actualTimeStamp.toString()
    }
    else {
        result["unix"] = dateToShow.valueOf(), 
        result["utc"] = dateToShow.toString()
    }

    res.send(result);
});


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});