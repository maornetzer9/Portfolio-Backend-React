require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { nodemailerRouter } = require('./routes/nodemailer');

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;

const app = express();
const corsOptions = { origin: ORIGIN }

app.use( express.json() );
app.use( nodemailerRouter )
app.use( cors( corsOptions ) );
app.use( bodyParser.urlencoded({ extended: false }) );


app.listen(PORT, () => console.info(`Server is running on PORT: ${PORT}`));