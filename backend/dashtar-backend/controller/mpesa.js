const Sequelize = require('sequelize');
const connectDB = require('../config/db');
const unirest = require('unirest');
const Mpesa = require("../models/Mpesa")


const getMpesaAuthToken = (callback) => {
    const consumer_key = "Zq7eVNAKqqPJ1dCbCTXY2ZU1ZowrayUL";
    const consumer_secret = "hV04RASheN7P9VAr";
    const pass_key = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const
        Authorization = new Buffer.from(
            `${consumer_key}:${consumer_secret}`,
            'utf-8'
        ).toString('base64');

    let access_token = '';
    let req = unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
        .headers({ 'Authorization': 'Basic cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==' })
        .send()
        .end(res => {
            if (res.error) throw new Error(res.error);
            access_token = res.body.access_token;
            callback(access_token);
        });
    return access_token
}

const verifyCheckOutResponse = async (data) => {
    let checkoutResponse = new Mpesa({ 'CheckoutRequestID': data, });
    await checkoutResponse.save()
}


const lipaNaMpesaOnline = async (req, res) => {

    let amount = await req.body.amount
    let phone = await req.body.phone
    let CheckoutRequestID = '';
  
    getMpesaAuthToken((token) => {
        console.log('------------------------------' + token);
        req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
            .headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
            .send(JSON.stringify({
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIwOTE0MTU0ODMx",
                "Timestamp": "20220914154831",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": 254708374149,
                "PartyB": 174379,
                "PhoneNumber": phone,
                "CallBackURL": "https://3726-102-135-169-125.in.ngrok.io/mpesaResponse/add",
                "AccountReference": "Tool-IT eCcommerce site",
                "TransactionDesc": "Payment of X"
            }))
            .end(res => {
                if (res.error) throw new Error(res.error);
                CheckoutRequestID = res.body.CheckoutRequestID;
                verifyCheckOutResponse(CheckoutRequestID);
            
                console.log(res.raw_body)
            });
        return "success";
    });



};

module.exports = {
    lipaNaMpesaOnline
}