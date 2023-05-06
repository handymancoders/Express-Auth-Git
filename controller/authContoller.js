const bcrypt = require('bcrypt');
const dbConnectionPool = require('../database/database');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')


const errorProvider = (res, message, status) => {
    res.status(status).json({
        message,
    })
}

exports.registration = async (req, res) => {
    const {name, phone, password} = req.body

    const hashPass = await bcrypt.hash(password, 12);

    dbConnectionPool.query(`INSERT INTO users SET ? `, {name, phone, password: hashPass} ,(err, result) => {
        if(err){
            console.log(err)
            return
        }

        res.status(200).json({
            message: 'Registration Done, Now Please Log in.',
        })
    })
}

const createToken = (user, status, res) => {
    const jwtToken = jwt.sign({phone: user.phone, id: user.user_id}, 'superSecret', {expiresIn: '1h'})

    res.cookie('jwt', jwtToken, { httpOnly: true });

    res.status(status).json({
        status: 'success',
        user,
        token: jwtToken
    })
}

exports.login = (req, res) => {
    const {phone, password} = req.body

    dbConnectionPool.query(`SELECT * FROM users WHERE phone='${phone}'`, async (err, result) => {
        if(err){
            console.log(err)
            return
        }

        if(result.length == 0) {
            return errorProvider(res, 'No User found', 404);
        }

        const user = result;
        const compare = await bcrypt.compare(password, user[0].password)
        
        if(!compare) {
            return errorProvider(res, 'Password error', 403);
        }

        createToken(user[0], 201, res)
    })

}