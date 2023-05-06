const express = require('express')
const morgan = require('morgan');
const userRouter = require('./route/userRoute');
const quoteRouter = require('./route/quoteRoute');
const app = express();

app.use(express.json({limit: '10kb'}))

app.use(morgan('dev'))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/quote', quoteRouter)

app.listen(7500, () => {
    console.log("App is running on port 7500");
})