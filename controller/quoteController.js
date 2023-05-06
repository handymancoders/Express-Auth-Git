const jwt = require('jsonwebtoken')
const dbConnectionPool = require('../database/database')

const errorProvider = (res, message, status) => {
    res.status(status).json({
        message,
    })
}


exports.tokenChecker = (req, res, next) => {
    const token = req.headers?.cookie
    if(!token) {
       return errorProvider(res, 'Not Valid Token', 403);
    }

    const jwtVerification = jwt.verify(token.split('=')[1], 'superSecret')
    dbConnectionPool.query(`SELECT * FROM users WHERE phone='${jwtVerification.phone}'`, async (err, result) => {
        if(err){
            console.log(err)
            return
        }

        if(result.length == 0) {
            return errorProvider(res, 'Not valid Token', 404);
        }

        req.user = result[0];

        next()
    })
    
}

exports.createQuote = async (req, res) => {
    const {quote} = req.body

    dbConnectionPool.query(`INSERT INTO quotes SET ? `, {quote, user_id: req.user.user_id} ,(err, result) => {
        if(err){
            console.log(err)
            return
        }

        res.status(200).json({
            message: 'Quote created',
            quote,
        })
    })
}

exports.getAllQuote = async (req, res) => {

    dbConnectionPool.query(`SELECT * FROM quotes`, (err, result) => {
        if(err){
            console.log(err)
            return
        }

        res.status(200).json({
            message: 'Success',
            quotes: result,
        })
    })
}

exports.getSpecificQuote = async (req, res) => {
    const {id} = req.params;

    dbConnectionPool.query(`SELECT * FROM quotes WHERE user_id=${id}`, (err, result) => {
        if(err){
            console.log(err)
            return
        }

        res.status(200).json({
            message: 'Success',
            quotes: result,
        })
    })
}