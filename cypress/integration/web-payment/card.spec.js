/// <reference types="cypress" />

import ms from '../config.json';

import '../methods/moneyspace';


let payment = "card-link";
let order_id = ms.tests.CardLink.orderIdPrefix + Date.now();

var ms_data = {
    "OrderID": order_id,
    "transactionID": "",
    "transactionID_Stage": "",
    "body": {
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key,
        "firstname": "EktlyEWTkPo4sJDvS",
        "lastname": "UmLdp6LelTyAcb2fB",
        "email": "test@test.com",
        "phone": "0888888888",
        "amount": "1.19",
        "description": "BjLzMjabR81",
        "address": "WhsXmKO0q3X8YYD8jz",
        "message": "rDcuRFTFvZd8NKC",
        "feeType": "include",
        "order_id": order_id, 
        "payment_type": "card",
        "success_Url": "https://www.moneyspace.net/",
        "fail_Url": "https://www.moneyspace.net/",
        "cancel_Url": "https://www.moneyspace.net/"
    }
}



describe('Card', () => {

    context('Create Transaction ID', () => {

        // it('Production', () => {

        //     cy.MS_CALL("prod", payment, ms_data.body).then(response => {
        //         expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
        //         expect(response.body[0].status).to.eq("success")
        //         expect(response.status).to.eq(200)
        //         ms_data.transactionID = response.body[0].transaction_ID
        //         ms_data.prod_response_create_tx = response
        //         cy.log(JSON.stringify(response.body))
        //         cy.log(response.body[0].link_payment)
        //         cy.visit(response.body[0].link_payment)
        //     })

        // });

        it('Stage', () => {

            cy.MS_CALL("stage", payment, ms_data.body).then(response => {
                expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
                expect(response.body[0].status).to.eq("success")
                expect(response.status).to.eq(200)
                ms_data.transactionID_Stage = response.body[0].transaction_ID
                ms_data.stage_response_create_tx = response
                cy.log(JSON.stringify(response.body))
                cy.log(response.body[0].link_payment)
                cy.visit(response.body[0].link_payment)
            })

        });

    });

});

