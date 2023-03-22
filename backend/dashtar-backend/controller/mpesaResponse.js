const Sequelize = require('sequelize');
const connectDB = require('../config/db');
const unirest = require('unirest');
const jwt = require('jsonwebtoken');
const lipaNaMpesaOnline = require("../controller/mpesa");

const getMpesaAuthToken = (callback) => {
    const consumer_key = "Zq7eVNAKqqPJ1dCbCTXY2ZU1ZowrayUL";
    const consumer_secret = "hV04RASheN7P9VAr";
    const Authorization = new Buffer.from(
        `${consumer_key}:${consumer_secret}`,
        'utf-8'
    ).toString('base64');

    let access_token = '';
    let auth = unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
        .headers({ 'Authorization': 'Basic cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==' })
        .send()
        .end(res => {
            if (res.error) throw new Error(res.error);
            access_token = res.body.access_token
            callback(access_token)
            // console.log(access_token);
        });
    return access_token
};

const lipaNaMpesaOnlineResponse = (req, res) => {

    getMpesaAuthToken((token) => {
        req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query')
            .headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            })
            .send(JSON.stringify({

                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIwOTMwMjIxNTAw",
                "Timestamp": "20220930221500",
                "CheckoutRequestID": "ws_CO_18102022120359210723715124"

            }))
            .end(res => {
                if (res.error) throw new Error(res.error);
                CheckoutRequestID = res.body.CheckoutRequestID;
                console.log(res.raw_body);
            })
    });
}

module.exports = {
    lipaNaMpesaOnlineResponse
}