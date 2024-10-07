require('./src/mongodb');

const app = require('express')();
const cors = require('cors');
const port = 5000;


//aggiungi qui le API
const UserRouter = require('./api/user');
const CharRouter = require('./api/char');


const corsOption = {
  credentials: true,
  origin: ['https://mpsplayerportal-client.vercel.app', 'https://mpsplayerportal-server.vercel.app']
}

app.use(cors(corsOption));


const bodyParser = require('express').json;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//Qui usa le API
app.use('/user', UserRouter)
app.use('/char', CharRouter)

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})