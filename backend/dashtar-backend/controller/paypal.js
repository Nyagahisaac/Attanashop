const Sequelize = require('sequelize');
const connectDB = require('../config/db');
const unirest = require('unirest');
const paypal = require('@paypal/checkout-server-sdk');

const paypalPayment = async (req, res) => {

    let clientId = "ARx-GRs7-V0er8Ke3vg2ElzoZnR2UBhqoYAvxFRe98fpNaFrg5lnZCuyYiBZjF33RIMEyc_UpqpSzr6e";
    let clientSecret = "ELNVl-4Ab5qOAIr1spm_mNapg7pznZ4RDcSQwmnJI9o5XCNjpOrmoLBRkV4P7b5faQ5yYCVoUtmtsv1U";

    // This sample uses SandboxEnvironment. In production, use LiveEnvironment
    let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    let client = new paypal.core.PayPalHttpClient(environment);

    // Construct a request object and set desired parameters
    // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": "100.00"
                }
            }
        ]
    });

    // Call API with your client and get a response for your call
    let createOrder = async function () {
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);

        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
        console.log(`Order: ${JSON.stringify(response.result)}`);
    }
    createOrder();



    // Capturing an Order

    // Before Capturing an order, it should be approved by the buyer using approve link in the create order response.
    // Code to Execute:

    // const orderId = "5MD93015GP7384350"
    // console.log('Capturing Order...');
    // response = await (orderId);
 

    // const captureOrder = async (req, res) => {
    //     request = new paypal.orders.OrdersCaptureRequest(orderId);
    //     request.requestBody({req.body});
    //     // Call API with your client and get a response for your call
    //     let response = await client.execute(request);
    //     console.log(`Response: ${JSON.stringify(response)}`);
    //     // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    //     console.log(`Capture: ${JSON.stringify(response.result)}`);
    // }

    // let capture = captureOrder(orderId);

};


module.exports = {
    paypalPayment,

}