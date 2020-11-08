const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

const route = require("./routes/test_route");


const API_PORT = process.env.API_PORT || 8080;

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

/* ROUTES */
app.get("/test", route.test_endpoint);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;