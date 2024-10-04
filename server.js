require('./src/mongodb');

const app = require('express')();
const cors = require('cors');
const port = 5000;


//aggiungi qui le API
const UserRouter = require('./api/user');
const CharRouter = require('./api/char');


const cors = require("cors")

app.options("*", cors({ origin: 'https://mpsplayerportal-client.vercel.app', optionsSuccessStatus: 200 }));

//app.use(cors({ origin: "https://mpsplayerportal-client.vercel.app", optionsSuccessStatus: 200 }));

app.use(cors({
    origin: 'https://mpsplayerportal-client.vercel.app', // Allow requests from your client
    methods: 'GET,POST,PUT,DELETE,UPDATE,PATCH',  // Add any other methods you need
    credentials: true // If you need to send cookies with requests
  }));

const bodyParser = require('express').json;
app.use(bodyParser());

//Qui usa le API
app.use('/user', UserRouter)
app.use('/char', CharRouter)

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})