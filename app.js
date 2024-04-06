require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { nodemailerRouter } = require('./routes/nodemailer');

const PORT = process.env.PORT;
const PRODUCTION = process.env.PRODUCTION;

const app = express();
const corsOptions = { origin: PRODUCTION }

app.use( cors( corsOptions ) );
app.use( express.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( nodemailerRouter )

app.get('/', async (req, res) => {
    try
    {
        return res.status(200).json('Backend Running...');
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json('Internal Server Error...');
    }
});

app.listen(PORT, () => console.info(`Server is running on PORT: ${PORT}`));