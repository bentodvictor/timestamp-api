import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

// Enabel CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// URL-encoded data will be parsed with the querystring library.
// Parses the JSON string in the request body and exposes it in the req.body property
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static files directory
app.use(
    '/public',
    express.static(path.join(__dirname, 'public'), {
        setHeaders: (res, filePath) => {
            if (path.extname(filePath) === '.css') {
                res.setHeader('Content-Type', 'text/css');
            }
        }
    })
);

// Set homepage
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/:date?', (req: Request, res: Response) => {
    const { date } = req.params;
    let dateToShow: Date;

    if (/^\d+$/.test(date)) {
        dateToShow = new Date(parseInt(date));
    } else {
        dateToShow = date ? new Date(date) : new Date();
    }

    if (isNaN(dateToShow.getTime())) {
        res.status(400).json({ error: 'Invalid Date' });
        return;
    }

    res.json({
        unix: dateToShow.getTime(),
        utc: dateToShow.toUTCString()
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${process?.env?.PORT || 3000}`);
});
