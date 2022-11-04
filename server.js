const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes');
const PORT = process.env.PORT || 3004;
const app = express();
const transporter = require("./mailer/mail")

app.use(bodyParser.json())
app.use(cors());

app.use('/', routes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
// const {sequelize} = require('sequelize')
module.exports=app;
