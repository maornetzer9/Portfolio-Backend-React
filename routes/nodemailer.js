const sendEmail = require('../services/nodemailer');

const router = require('express').Router();

router.post('/email', sendEmail);

module.exports = { nodemailerRouter: router };