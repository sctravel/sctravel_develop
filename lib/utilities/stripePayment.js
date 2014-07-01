

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



exports.pay = function(paymentData,callback) {
    stripe.charges.create({
        amount: paymentData.amount,
        currency: paymentData.currency,
        card: paymentData.stripeToken,
        description:paymentData.stripeEmail
    }, function(err, charge) {
        // asynchronously called
        console.dir(charge);
        callback(err,charge);
    });
}