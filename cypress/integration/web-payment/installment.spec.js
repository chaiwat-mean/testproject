/// <reference types="cypress" />

import ms from '../config.json';
import cp from '../response/check-status.json';

import '../methods/moneyspace';


let payment = "installment-link";
let order_id = ms.tests.installmentLink.orderIdPrefix + Date.now();


let length_list_mon_ktc = 4
let length_list_mon_bay = 3
let length_list_mon_fcy = 3

let length_list_lang = 2


var ms_data_ktc = {
    "OrderID": order_id,
    "transactionID": "",
    "transactionID_Stage": "",
    "body": {
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key,
        "firstname": "test",
        "lastname": "cypress",
        "email": "test@test.com",
        "phone": "0888888888",
        "amount": "3600",
        "description": "test cypress",
        "address": "111/11",
        "message": "test...",
        "feeType": "include",
        "order_id": "KTC" + order_id,
        "payment_type": "installment",
        "success_Url": "https://www.moneyspace.net/success",
        "fail_Url": "https://www.moneyspace.net/fail",
        "cancel_Url": "https://www.moneyspace.net/cancel",
        "bankType": "KTC",
        "startTerm": "3",
        "endTerm": "6",
        "agreement": "1"
    }
}


var ms_data_bay = {
    "OrderID": order_id,
    "transactionID": "",
    "transactionID_Stage": "",
    "body": {
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key,
        "firstname": "test",
        "lastname": "cypress",
        "email": "test@test.com",
        "phone": "0888888888",
        "amount": "3700",
        "description": "test cypress",
        "address": "111/11",
        "message": "test...",
        "feeType": "include",
        "order_id": "BAY" + order_id,
        "payment_type": "installment",
        "success_Url": "https://www.moneyspace.net/success",
        "fail_Url": "https://www.moneyspace.net/fail",
        "cancel_Url": "https://www.moneyspace.net/cancel",
        "bankType": "BAY",
        "startTerm": "3",
        "endTerm": "6",
        "agreement": "1"
    }
}

var ms_data_fcy = {
    "OrderID": order_id,
    "transactionID": "",
    "transactionID_Stage": "",
    "body": {
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key,
        "firstname": "test",
        "lastname": "cypress",
        "email": "test@test.com",
        "phone": "0888888888",
        "amount": "3700",
        "description": "test cypress",
        "address": "111/11",
        "message": "test...",
        "feeType": "include",
        "order_id": "FCY" + order_id,
        "payment_type": "installment",
        "success_Url": "https://www.moneyspace.net/success",
        "fail_Url": "https://www.moneyspace.net/fail",
        "cancel_Url": "https://www.moneyspace.net/cancel",
        "bankType": "FCY",
        "startTerm": "3",
        "endTerm": "6",
        "agreement": "1"
    }
}



describe('Installment-Link ( KTC )', () => {

    context('Create / Open', () => {

        // it('Production', () => {

        //     cy.MS_CALL("prod", payment, ms_data_ktc.body).then(response => {
        //         expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
        //         expect(response.body[0].status).to.eq("success")
        //         expect(response.status).to.eq(200)
        //         ms_data_ktc.transactionID = response.body[0].transaction_ID
        //         ms_data_ktc.prod_response_create_tx = response
        //         cy.log(JSON.stringify(response.body))
        //         cy.visit(response.body[0].link_payment)
        //         .get('a[class*="dropdown-toggle language-selector-main"]').click()
        //         // .get('ul[class*="dropdown-menu dropdown-menu-selector pull-right show"]').children().should('have.length', length_list_lang).eq(0).click()
        //         .get('button[id=gateway_btn]').should('have.length', length_list_mon_ktc).eq(0).click()
        //         .get('a[id=pay_btn]').click()
        //         .get('input[id=chk_agree]').check({ force: true })
        //         .get('a[id=pay_btn]').click()
        //     })

        // });

        it('Stage', () => {

            cy.MS_CALL("stage", payment, ms_data_ktc.body).then(response => {
                expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
                expect(response.body[0].status).to.eq("success")
                expect(response.status).to.eq(200)
                ms_data_ktc.transactionID_Stage = response.body[0].transaction_ID
                ms_data_ktc.stage_response_create_tx = response
                cy.log(JSON.stringify(response.body))
                cy.visit(response.body[0].link_payment)
                .get('a[class*="dropdown-toggle language-selector-main"]').click()
                // .get('ul[class*="dropdown-menu dropdown-menu-selector pull-right show"]').children().should('have.length', length_list_lang).eq(0).click()
                .get('button[id=gateway_btn]').should('have.length', length_list_mon_ktc).eq(0).click()
                .get('a[id=pay_btn]').click()
                .get('input[id=chk_agree]').check({ force: true })
                .get('a[id=pay_btn]').click()
            })

        });

    });
});

describe('Installment-Link ( BAY )', () => {

    context('Create / Open', () => {

        // it('Production', () => {

        //     cy.MS_CALL("prod", payment, ms_data_bay.body).then(response => {
        //         expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
        //         expect(response.body[0].status).to.eq("success")
        //         expect(response.status).to.eq(200)
        //         ms_data_bay.transactionID = response.body[0].transaction_ID
        //         ms_data_bay.prod_response_create_tx = response
        //         cy.log(JSON.stringify(response.body))
        //         cy.visit(response.body[0].link_payment)
        //         .get('a[class*="dropdown-toggle language-selector-main"]').click()
        //         .get('ul[class*="dropdown-menu dropdown-menu-selector pull-right show"]').children().should('have.length', length_list_lang).eq(0).click()
        //         .get('button[id=gateway_btn]').should('have.length', length_list_mon_bay).eq(0).click()
        //         .get('a[id=pay_btn]').click()
        //         .get('input[id=chk_agree]').check({ force: true })
        //         .get('a[id=pay_btn]').click()
        //     })

        // });

        it('Stage', () => {

            cy.MS_CALL("stage", payment, ms_data_bay.body).then(response => {
                expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
                expect(response.body[0].status).to.eq("success")
                expect(response.status).to.eq(200)
                ms_data_bay.transactionID_Stage = response.body[0].transaction_ID
                ms_data_bay.stage_response_create_tx = response
                cy.log(JSON.stringify(response.body))
                cy.visit(response.body[0].link_payment)
                .get('a[class*="dropdown-toggle language-selector-main"]').click()
                .get('ul[class*="dropdown-menu dropdown-menu-selector pull-right show"]').children().should('have.length', length_list_lang).eq(0).click()
                .get('button[id=gateway_btn]').should('have.length', length_list_mon_bay).eq(0).click()
                .get('a[id=pay_btn]').click()
                .get('input[id=chk_agree]').check({ force: true })
                .get('a[id=pay_btn]').click()
            })

        });

    });
});

describe('Installment-Link ( FCY )', () => {

    context('Create / Open', () => {

        // it('Production', () => {

        //     cy.MS_CALL("prod", payment, ms_data_fcy.body).then(response => {
        //         expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
        //         expect(response.body[0].status).to.eq("success")
        //         expect(response.status).to.eq(200)
        //         ms_data_fcy.transactionID = response.body[0].transaction_ID
        //         ms_data_fcy.prod_response_create_tx = response
        //         cy.log(JSON.stringify(response.body))
        //         cy.visit(response.body[0].link_payment)
        //         .get('a[class*="dropdown-toggle language-selector-main"]').click()
        //         .get('ul[class*="dropdown-menu dropdown-menu-selector pull-right show"]').children().should('have.length', length_list_lang).eq(0).click()
        //         .get('button[id=gateway_btn]').should('have.length', length_list_mon_bay).eq(0).click()
        //         .get('a[id=pay_btn]').click()
        //         .get('input[id=chk_agree]').check({ force: true })
        //         .get('a[id=pay_btn]').click()
        //     })

        // });

        it('Stage', () => {

            cy.MS_CALL("stage", payment, ms_data_fcy.body).then(response => {
                expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
                expect(response.body[0].status).to.eq("success")
                expect(response.status).to.eq(200)
                ms_data_fcy.transactionID_Stage = response.body[0].transaction_ID
                ms_data_fcy.stage_response_create_tx = response
                cy.log(JSON.stringify(response.body))
                cy.visit(response.body[0].link_payment)
                .get('a[class*="dropdown-toggle language-selector-main"]').click()
                .get('ul[class*="dropdown-menu dropdown-menu-selector pull-right show"]').children().should('have.length', length_list_lang).eq(0).click()
                .get('button[id=gateway_btn]').should('have.length', length_list_mon_fcy).eq(0).click()
                .get('a[id=pay_btn]').click()
                .get('input[id=chk_agree]').check({ force: true })
                .get('a[id=pay_btn]').click()
            })

        });

    });
});

