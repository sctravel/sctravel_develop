

///////////////////////////////////////////////////////////
// Stripe API keys:
// Test Secret Key - sk_test_udbi56IdeBXlJp1JOPRpIwfu
// Test Publishable Key - pk_test_JlIsUBQpOb8xLNOZrXPCSOOJ
// Live Secret Key - sk_live_kvPLNQNpu7zhQYgBvhHxkDlX
// Live Publishable Key - pk_live_ZjYLU6zKN4sorI3C4pQKUvzr
///////////////////////////////////////////////////////////

var stripe = require("stripe")(
    "sk_test_udbi56IdeBXlJp1JOPRpIwfu"
);


//TODO think about how to bind place order and finish payment together
exports.pay = function(paymentData,callback) {
    stripe.charges.create({
        amount: paymentData.amount, // amount in cents
        currency: paymentData.currency,
        card: paymentData.stripeToken,
        description:paymentData.stripeEmail
    }, function(err, charge) {
        if(err){
            console.error(err);
            callback(err,null);
        }
        // asynchronously called
        var orderId=paymentData.orderId;
        var amount = charge.amount;
        var currency =charge.currency;
        var paymentId = charge.id;
        console.dir(charge);
        if(charge.paid=true){

        }


        callback(null,charge);

    });
}