/// <reference types="cypress" />

import ms from '../config.json';
import cp from '../response/check-status.json';

import '../methods/moneyspace';


let payment = "installment-mskey";
let order_id = ms.tests.installmentMskey.orderIdPrefix + Date.now();

var ms_data = {
    "OrderID": order_id,
    "transactionID": "",
    "transactionID_Stage": "",
    "body": {
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key,
        "firstname": "AbHeR2OfqZV0ApKWkSa",
        "lastname": "YTsCcMdZMMLPQR3HT0D",
        "email": "test@test.com",
        "phone": "0888888888",
        "amount": "1.19",
        "description": "test cypress",
        "address": "111/11",
        "message": "test...",
        "feeType": "exclude",
        "order_id": order_id,
        "payment_type": "installment",
        "success_Url": "https://www.moneyspace.net/success",
        "fail_Url": "https://www.moneyspace.net/fail",
        "cancel_Url": "https://www.moneyspace.net/cancel",
        "bankType": "BAY",
        "startTerm": "3",
        "endTerm": "6",
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
        "status": ""
    }]
}





describe('Installment-Mskey ( Exclude )', () => {

    context('Create Transaction ID', () => {

        // it('Production', () => {

        //     cy.MS_CALL("prod", payment, ms_data.body).then(response => {
        //         expect(response.body[0]).to.have.all.keys('status')
        //         expect(response.body[0].status).to.eq("This fee type is not yet available.")
        //         expect(response.status).to.eq(200)
        //         ms_data.transactionID = response.body[0].transaction_ID
        //         ms_data.prod_response_create_tx = response
        //         cy.log(JSON.stringify(response.body))
        //     })

        // });

        it('Stage', () => {

            cy.MS_CALL("stage", payment, ms_data.body).then(response => {
                expect(response.body[0]).to.have.all.keys('status')
                expect(response.body[0].status).to.eq("This fee type is not yet available.")
                expect(response.status).to.eq(200)
                ms_data.transactionID_Stage = response.body[0].transaction_ID
                ms_data.stage_response_create_tx = response
                cy.log(JSON.stringify(response.body))
            })

        });

        // it('Compare Response ( Production / Stage )', () => {
        //     expect(ms_data.prod_response_create_tx.body[0]).to.have.all.keys(ms_data.stage_response_create_tx.body[0])
        // });

        // it('Compare Response ( Production_File + [ Production / Stage ] )', () => {
        //     expect(respone_prod_create_tx.body[0]).to.have.all.keys(ms_data.prod_response_create_tx.body[0]) // Production Response (JSON File) + Production Response
        //     expect(respone_prod_create_tx.body[0]).to.have.all.keys(ms_data.stage_response_create_tx.body[0]) //  Production Response (JSON File) + Stage Response
        // });

    });

});

