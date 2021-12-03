/// <reference types="cypress" />

import ms from '../config.json';
import cp from '../response/check-status.json';

import '../methods/moneyspace';

const crypto = require('crypto');

var time_hash = new Date();

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    return "".concat(yyyy).concat(mm).concat(dd);
};

Date.prototype.yyyymmddhhmm = function () {
    var yyyymmdd = this.yyyymmdd();
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    return "".concat(yyyymmdd).concat(hh).concat(min);
};

Date.prototype.yyyymmddhhmmss = function () {
    var yyyymmddhhmm = this.yyyymmddhhmm();
    var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
    return "".concat(yyyymmddhhmm).concat(ss);
};




let payment = "merchant";
let order_id = ms.tests.merchant.orderIdPrefix + Date.now();

var ms_data = {
    "OrderID": order_id,
    "transactionID": "",
    "transactionID_Stage": "",
    "body": {
        "secreteID": ms.moneyspace.secret_id,
        "firstname": "test",
        "lastname": "cypress",
        "email": "test@test.com",
        "phone": "0888888888",
        "amount": "1.19",
        "currency": "THB",
        "description": "test cypress",
        "address": "111/11",
        "message": "test...",
        "feeType": "exclude",
        "timeHash": time_hash.yyyymmddhhmmss(),
        "customer_order_id": order_id,
        "gatewayType": "card",
        "successUrl": "https://www.moneyspace.net/success",
        "failUrl": "https://www.moneyspace.net/fail",
        "cancelUrl": "https://www.moneyspace.net/cancel",
        "hash": hash,
        "agreement": "1"
    },
    "prod_response_create_tx": "",
    "prod_response_check_tx_whitelable": "",
    "prod_response_check_orderid_whitelable": "",
    "prod_response_check_tx_phpsdk": "",
    "prod_response_check_orderid_phpsdk": "",
    "stage_response_create_tx": "",
    "stage_response_check_tx_whitelable": "",
    "stage_response_check_orderid_whitelable": "",
    "stage_response_check_tx_phpsdk": "",
    "stage_response_check_orderid_phpsdk": "",
}

// 20/08/2021
var respone_prod_create_tx = {
    "body": [{
        "status": "",
        "transaction_ID": "",
        "link_payment": ""
    }]
}



var secret = ms.moneyspace.secret_key;
var hashInBase64 = crypto.createHmac('sha256', secret)
    .update(ms_data.body.firstname + ms_data.body.lastname + ms_data.body.email + ms_data.body.phone + ms_data.body.amount + ms_data.body.currency + ms_data.body.description + ms_data.body.address + ms_data.body.message + ms_data.body.feeType + ms_data.body.timeHash + ms_data.body.customer_order_id + ms_data.body.gatewayType + ms_data.body.successUrl + ms_data.body.failUrl + ms_data.body.cancelUrl)
    .digest('hex'); 
var hash = hashInBase64;


describe('Card-Merchant (Exclude)', () => {

    context('Merchant', () => {

        it('Create Transaction ID', () => {


            cy.MS_CALL("merchant", payment, {
                "secreteID": ms.moneyspace.secret_id,
                "firstname": "test",
                "lastname": "cypress",
                "email": "test@test.com",
                "phone": "0888888888",
                "amount": "1.19",
                "currency": "THB",
                "description": "test cypress",
                "address": "111/11",
                "message": "test...",
                "feeType": "exclude",
                "timeHash": time_hash.yyyymmddhhmmss(),
                "customer_order_id": order_id,
                "gatewayType": "card",
                "successUrl": "https://www.moneyspace.net/success",
                "failUrl": "https://www.moneyspace.net/fail",
                "cancelUrl": "https://www.moneyspace.net/cancel",
                "hash": hash,
                "agreement": "1"
            },true).then(response => {
                expect(response.body[0]).to.have.all.keys('status', 'Transaction ID')
                expect(response.body[0].status).to.eq("Create Success")
                expect(response.status).to.eq(200)
                ms_data.transactionID = response.body[0]['Transaction ID']
                ms_data.prod_response_create_tx = response
                cy.log(JSON.stringify(response.body))
            })


        });

    });


    context('Check Transaction ID ( Whitelable )', () => {

        it('Production', () => {

            cy.Check_Tx("prod", "check-tx-whitelable", ms_data.transactionID).then(response => {
                expect(response.body[0]["transaction id"]).to.have.all.keys('status', 'amount', 'description')
                expect(response.body[0]["transaction id"].status).to.eq("pending") // p เล็ก (last seen 10/08/21)
                expect(response.status).to.eq(200)
                ms_data.prod_response_check_tx_whitelable = response
                cy.log(JSON.stringify(response.body))
            });

        })


    });

    context('Check OrderID ( Whitelable )', () => {

        it('Production', () => {

            cy.Check_OrderID("prod", "check-orderid-whitelable", ms_data.OrderID).then(response => {
                expect(response.body[0]["order id"]).to.have.all.keys('status', 'amount', 'description')
                expect(response.body[0]["order id"].status).to.eq("Pending") // p ใหญ่ (last seen 10/08/21)
                expect(response.status).to.eq(200)
                ms_data.prod_response_check_orderid_whitelable = response
                cy.log(JSON.stringify(response.body))
            });

        })


    });

    context('Check Transaction ID ( PHP SDK )', () => {

        it('Production', () => {

            cy.Check_Tx("prod", "check-tx-phpsdk", ms_data.transactionID).then(response => {
                expect(response.body[0]).to.have.all.keys("Amount ", "Transaction ID ", "Description ", "Status Payment ")
                expect(response.body[0]["Status Payment "]).to.eq("Pending") // p ใหญ่     (last seen 10/08/21)
                expect(response.status).to.eq(200)
                ms_data.prod_response_check_tx_phpsdk = response
                cy.log(JSON.stringify(response.body))
            });

        })


    });

    context('Check OrderID ( PHP SDK )', () => {

        it('Production', () => {

            cy.Check_OrderID("prod", "check-orderid-phpsdk", ms_data.OrderID).then(response => {
                expect(response.body[0]).to.have.all.keys("Amount ", "Order ID ", "Description ", "Status Payment ")
                expect(response.body[0]["Status Payment "]).to.eq("Pending") // p ใหญ่     (last seen 10/08/21)
                expect(response.status).to.eq(200)
                ms_data.prod_response_check_orderid_phpsdk = response
                cy.log(JSON.stringify(response.body))
            });

        })


    });


});


