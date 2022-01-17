require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const routes = require('./server/routes/user');
const { connection, connect } = require('./db');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) 

//static
app.use(express.static('public'));

//Template Engine
app.engine('hbs', exphbs.engine( {extname: '.hbs'}));
app.set('view engine', 'hbs');



//routes
app.use('/', routes);


const start = () => {
    try {
        connect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(e) {
        console.log(`Some problem appears`);
    }
}

start();
