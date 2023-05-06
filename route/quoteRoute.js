const express = require('express');
const { createQuote, tokenChecker, getAllQuote, getSpecificQuote } = require('../controller/quoteController');

const router = express.Router();

router.route('/create')
    .post(tokenChecker, createQuote)

router.route('/all-quote')
    .get(getAllQuote)

router.route('/user/:id')
    .get(tokenChecker, getSpecificQuote)

module.exports = router;