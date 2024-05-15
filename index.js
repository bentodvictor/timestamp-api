"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Enabel CORS
app.use((0, cors_1.default)({ optionsSuccessStatus: 200 }));
// URL-encoded data will be parsed with the querystring library.
// Parses the JSON string in the request body and exposes it in the req.body property
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Set static files directory
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (path_1.default.extname(filePath) === '.css') {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));
// Set homepage
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'views', 'index.html'));
});
app.get("/api/:date?", (req, res) => {
    const { date } = req.params;
    let dateToShow;
    if (/^\d+$/.test(date)) {
        dateToShow = new Date(parseInt(date));
    }
    else {
        dateToShow = date ? new Date(date) : new Date();
    }
    if (isNaN(dateToShow.getTime())) {
        res.status(400).json({ error: "Invalid Date" });
        return;
    }
    res.json({
        unix: dateToShow.getTime(),
        utc: dateToShow.toUTCString()
    });
});
app.listen(process.env.PORT || 3000, () => {
    var _a;
    console.log(`Your app is listening on port ${((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PORT) || 3000}`);
});
