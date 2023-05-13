const bcrypt = require('bcrypt');
const dbConnectionPool = require('../database/database');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const errorProvider = (res, message, status) => {
    res.status(status).json({
        message,
    })
}

exports.registration = async (req, res) => {
    const {name, phone, password} = req.body

    const hashPass = await bcrypt.hash(password, 12);

    console.log(name, phone, password, hashPass)

    try{
        const user = await prisma.user.create({
            data: {
                name,
                phone,
                password: hashPass
            }
        })

        res.status(200).json({
            message: 'Registration Done, Now Please Log in.',
            user
        })
    }catch (err) {
        console.log(err.message)
    }
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

exports.login = async (req, res) => {
    const {phone, password} = req.body;

    try{
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                phone,
            }
        })

        const compare = await bcrypt.compare(password, user.password)

        if(!compare) {
            return res.status(403).json({
                status: 'password wrong'
            })
        }

        createToken(user, 200, res)
    }catch (err) {
        console.log(err.message)
        res.status(400).json({
            message: err.message
        })
    }
}