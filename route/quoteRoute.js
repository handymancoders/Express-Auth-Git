const express = require('express');
const { createQuote, tokenChecker, getAllQuote, getSpecificQuote, RedirectToPage } = require('../controller/quoteController');

const router = express.Router();

router.route('/create')
    .post(tokenChecker, createQuote)

router.route('/all-quote')
    .get(getAllQuote)

router.route('/user-specific')
    .get(tokenChecker, getSpecificQuote)

router.route('/adserve')
    .get(RedirectToPage)

module.exports = router;