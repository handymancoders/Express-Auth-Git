const jwt = require('jsonwebtoken')
const dbConnectionPool = require('../database/database')

const { PrismaClient } = require('@prisma/client');
const { errorProvider, catchAsync } = require('../utils/errorProvider');
const prisma = new PrismaClient()

exports.tokenChecker = async (req, res, next) => {
    const token = req.headers?.cookie
    if(!token) {
       return errorProvider(res, 'invalid Token', 403);
    }

    const jwtVerification = jwt.verify(token.split('=')[1], 'superSecret')
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            phone: jwtVerification.phone
        }
    })

    if(!user) {
        return errorProvider(res, 'invalid token', 403)
    }

    req.user = user;

    next()
}

exports.createQuote = async (req, res) => {
    const {quote} = req.body
    
    try{
        const createdQuote = await prisma.quote.create({
            data: {
                quote,
                userId: req.user.id
            }
        })

        res.status(200).json({
            message: 'Quote Added',
            createdQuote
        })
    }catch (err) {
        console.log(err.message)
        res.status(400).json({
            status: 'Unsuccessful',
            message: err.message
        })
    }
}

exports.getAllQuote = async (req, res) => {

    try{
        const quotes = await prisma.quote.findMany()

        res.status(200).json({
            count: quotes.length,
            quotes
        })
    }catch (err) {
        console.log(err.message)
        res.status(400).json({
            status: 'Unsuccessful',
            message: err.message
        })
    }
}

exports.getSpecificQuote = catchAsync(async (req, res, next) => {
    const {id} = req.user;
    const quotes = await prisma.quote.findMany({
        where: {
            userId: id
        }
    })
    
    errorProvider(res, 'Unsuccessful', 400, 'fasda', 456513, quotes)

    // try{
    //     res.status(200).json({
    //         count: quotes.length,
    //         quotes
    //     })
    // }catch (err) {
    //     console.log(err.message)
    //     // res.status(400).json({
    //     //     status: 'Unsuccessful',
    //     //     message: err.message
    //     // })
    // }
})

exports.RedirectToPage = (req, res, next) => {
    const query = req.query;
    const html = '<section id="ads-author-banner" style="display: flex;max-width: 1240px;max-height: 370px;margin: 20px auto;position: relative;background-image: url(https://s3-ap-southeast-1.amazonaws.com/rokomari.com/product_images/banner_bg.png);background-color: #FFFBF1;padding: 28px;box-sizing: border-box;border-radius: 5px;border: 1px solid #F9DBB875;"> <span style="color: #838383; font-size:10px; position: absolute; right: 10px; bottom: -12px;"><i class="ion-information-circled" style="font-size: 10px;"></i> sponsored</span> <div class="author-img"><img src="https://ds.rokomari.store/rokomari110/company/8932b7eea_12708.jpg" alt="" style=" width: 220px;height: 100%;object-fit: fill;border-radius: 5px;box-shadow: 0 0 5px #cfcfcf;"></div> <div class="banner-body" style="margin-left: 20px; width: 100%;"> <div class="head" style="display: flex; width: 100%; justify-content: space-between;align-items: center;"> <h2 class="title" style="margin: 0;font-weight: 400;font-size: 24px;color: #333333;">Get Refresh</h2> <a href="https://www.rokomari.com/brand/12708" class="see-more" style="display: block;font-size: 14px; color: #0097D7; font-weight:500;text-decoration: none;">সকল পন্য দেখুন</a> </div> <div class="content" style="margin-top: 20px; font-size: 14px;"> <div class="ads-product-items" style="display: grid; grid-template-columns: repeat(4, 1fr);justify-items: center;"> <div class="ads-product-item" style="text-align: center;"> <a href="https://www.rokomari.com/product/272685"> <img src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Tang_Mango_Flavoured_Instant_Drink_Powde-Tang-6e03b-272685.jpg" alt="" style="width: 130px; border-radius: 4px;"> </a> <div class="ads-product-item__content" style="margin-top: 8px;"> <a href="https://www.rokomari.com/book/272685" class="title link" style="color: #000A14;text-decoration:none;font-size:14px;white-space: nowrap;display: block;width: 130px;text-overflow: ellipsis;overflow: hidden;">Tang Mango Flavoured Instant Drink Powder Jar (750 gm)</a> <p class="subtitle" style="font-size: 13px; color: #828588; margin: 5px 0; white-space: nowrap;display: block;width: 130px;text-overflow: ellipsis;overflow: hidden;">Tang</p> <p class="price" style="color:#000A14;font-size: 14px; margin: 0;"><span class="price" style="margin-right: 5px; font-weight: 500; text-decoration-line: line-through;color: #828588;">৳675</span> <span class="payable">৳675</span></p> </div> </div><div class="ads-product-item" style="text-align: center;"> <a href="https://www.rokomari.com/product/272687"> <img src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Tang_Orange_Flavoured_Instant_Drink_Powd-Tang-fca00-272687.jpg" alt="" style="width: 130px; border-radius: 4px;"> </a> <div class="ads-product-item__content" style="margin-top: 8px;"> <a href="https://www.rokomari.com/book/272687" class="title link" style="color: #000A14;text-decoration:none;font-size:14px;white-space: nowrap;display: block;width: 130px;text-overflow: ellipsis;overflow: hidden;">Tang Orange Flavoured Instant Drink Powder 200gm</a> <p class="subtitle" style="font-size: 13px; color: #828588; margin: 5px 0; white-space: nowrap;display: block;width: 130px;text-overflow: ellipsis;overflow: hidden;">Tang</p> <p class="price" style="color:#000A14;font-size: 14px; margin: 0;"><span class="price" style="margin-right: 5px; font-weight: 500; text-decoration-line: line-through;color: #828588;">৳190</span> <span class="payable">৳190</span></p> </div> </div><div class="ads-product-item" style="text-align: center;"> <a href="https://www.rokomari.com/product/272693"> <img src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Tang_Orange_Flavoured_Instant_Drink_Powd-Tang-cbfd6-272693.jpg" alt="" style="width: 130px; border-radius: 4px;"> </a> <div class="ads-product-item__content" style="margin-top: 8px;"> <a href="https://www.rokomari.com/book/272693" class="title link" style="color: #000A14;text-decoration:none;font-size:14px;white-space: nowrap;display: block;width: 130px;text-overflow: ellipsis;overflow: hidden;">Tang Orange Flavoured Instant Drink Powder (75 gm)</a> <p class="subtitle" style="font-size: 13px; color: #828588; margin: 5px 0; white-space: nowrap;display: block;width: 130px;text-overflow: ellipsis;overflow: hidden;">Tang</p> <p class="price" style="color:#000A14;font-size: 14px; margin: 0;"><span class="price" style="margin-right: 5px; font-weight: 500; text-decoration-line: line-through;color: #828588;">৳85</span> <span class="payable">৳85</span></p> </div> </div><div class="ads-product-item" style="text-align: center;"> <a href="https://www.rokomari.com/product/291962"> <img src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Tang_Mango_Flavoured_Instant_Drink_Powde-Tang-7753c-291962.jpg" alt="" style="width: 130px; border-radius: 4px;"> </a> <div class="ads-product-item__content" style="margin-top: 8px;"> <a href="https://www.rokomari.com/book/291962" class="title link" style="color: #000A14;text-decoration:none;font-size:14px;white-space: nowrap;display: block;width: 130px;text-overflow: ellipsis;overflow: hidden;">Tang Mango Flavoured Instant Drink Powder 500gm</a> <p class="subtitle" style="font-size: 13px; color: #828588; margin: 5px 0; white-space: nowrap;display: block;width: 130px;text-overflow: ellipsis;overflow: hidden;">Tang</p> <p class="price" style="color:#000A14;font-size: 14px; margin: 0;"><span class="price" style="margin-right: 5px; font-weight: 500; text-decoration-line: line-through;color: #828588;">৳350</span> <span class="payable">৳350</span></p> </div> </div> </div> </div> </div> </section>'
    const newHtml = html.replace(/href="/g, `target="_blank" href="http://localhost:6500/api/v1/quote/adserve?bannerId=7777&dest=`)
    // console.log(newHtml)
    res.redirect(302, query.dest)
    // res.status(200).json({
    //    status: 'Successful',
    //    query,
    //    newHtml
    // })
}