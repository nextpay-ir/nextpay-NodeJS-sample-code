var soap = require('soap');



var GetToken = function () {
    var url = 'https://api.nextpay.org/gateway/token.wsdl';
    var payload = {
        api_key: '11111111-1111-1111-1111-111111111111',
        order_id:'1234',
        amount:'1000',
        callback_uri:'http://test.com/callback'
    };
    soap.createClient(url, function(err, client) {
        client.TokenGenerator(payload, function(err, result) {
            if(result.TokenGeneratorResult.code == -1){
                console.log(result.TokenGeneratorResult.trans_id);
                return result.TokenGeneratorResult.trans_id;
                // redirect to 'https://api.nextpay.org/gateway/payment/'+result.TokenGeneratorResult.trans_id
            }else {
                console.log('Err: ' + result.TokenGeneratorResult.code);
                return false;
            }
        });
    });
};


var VerifyPayment = function(){
    // trans_id and order_id will POST to callback_uri
    var url = 'https://api.nextpay.org/gateway/verify.wsdl';
    var payload = {
        api_key: '11111111-1111-1111-1111-111111111111',
        trans_id:'00000000-0000-0000-0000-000000000000',
        order_id:'1234',
        amount:1000
    };
    soap.createClient(url, function(err, client) {
        client.PaymentVerification(payload, function(err, result) {
            if(result.PaymentVerificationResult.code == 0){
                console.log('Paied: ' + result.PaymentVerificationResult.code);
                return true;
            }else {
                console.log('Not verified: ' + result.PaymentVerificationResult.code);
                return false;
            }
        });
    });
};