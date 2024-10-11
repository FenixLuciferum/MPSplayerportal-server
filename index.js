require('./src/mongodb');

const app = require('express')();
const port = 5000;


//aggiungi qui le API
const UserRouter = require('./api/user');
const CharRouter = require('./api/char');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//Qui usa le API
app.use('/user', UserRouter)
app.use('/char', CharRouter)

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})

module.exports = app;
