require('./src/mongodb');

const app = require('express')();
const port = 5000;


//aggiungi qui le API
const UserRouter = require('./api/user');
const CharRouter = require('./api/char');


const cors = require("cors")

app.options("*", cors({ origin: 'https://mpsplayerportal-client.vercel.app', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "https://mpsplayerportal-client.vercel.app", optionsSuccessStatus: 200 }));

const bodyParser = require('express').json;
app.use(bodyParser());

//Qui usa le API
app.use('/user', UserRouter)
app.use('/char', CharRouter)

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})