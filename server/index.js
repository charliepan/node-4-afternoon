require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const swagController = require('./controllers/swagController');

const {checkSession} = require('./middlewares/checkForSession');
const {register, login, signout, getUser} = require('./controllers/authController');
const cartContr = require('./controllers/cartController');
const searchContr = require('./controllers/searchController');

const {SERVER_PORT,SESSION_SECRET} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(express.json());
app.use(checkSession);
// app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagController.read);

app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);
app.get('/api/user', getUser);

app.post('/api/cart/checkout', cartContr.checkout);
app.post('/api/cart/:id', cartContr.add);

app.delete('/api/cart/:id', cartContr.delete);

app.get('/api/search', searchContr.search);

app.listen(SERVER_PORT, ()=> console.log(`Server is on ${SERVER_PORT}`));