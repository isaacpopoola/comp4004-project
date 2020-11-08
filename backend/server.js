const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { Pool } = require('pg')
const app = express();

const route = require("./routes/test_route");


const API_PORT = process.env.API_PORT || 8080;

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

/* ROUTES */
app.get("/test", route.test_endpoint);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;