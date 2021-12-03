/// <reference types="cypress" />

import ms from '../config.json';


Cypress.Commands.add('MS_CALL', (type, path_payment, body_data, option_form = false) => {

    let type_url = ""

    switch (type) {
        case "prod":
            type_url = ms.moneyspace.url_prod
            break;
        case "stage":
            type_url = ms.moneyspace.url_stage
            break;
        case "merchant":
            type_url = ms.moneyspace.url_merchant
            break;
        default:
    }

    let payment = ""

    switch (path_payment) {
        case "card-link":
            payment = ms.tests.CardLink.path
            break;
        case "card-mskey":
            payment = ms.tests.CardMskey.path
            break;
        case "installment-mskey":
            payment = ms.tests.installmentMskey.path
            break;
        case "installment-link":
            payment = ms.tests.installmentLink.path
            break;
        case "qrcode-link":
            payment = ms.tests.QRLink.path
            break;
        case "qrcode-mskey":
            payment = ms.tests.QRMskey.path
            break;
        case "merchant":
            payment = ms.tests.merchant.path
            break;
        case "check-tx-whitelable":
            payment = ms.tests.check_status_api.tx_whilelable
            break;
        case "check-orderid-whitelable":
            payment = ms.tests.check_status_api.orderid_whilelable
            break;
        case "check-tx-phpsdk":
            payment = ms.tests.check_status_api.tx_phpsdk
            break;
        case "check-orderid-phpsdk":
            payment = ms.tests.check_status_api.orderid_phpsdk
            break;
        case "cancel-payment":
            payment = ms.tests.cancel_payment
            break;
        default:
    }

    cy.request({
        method: 'POST',
        form: option_form,
        url: type_url + payment,
        body: body_data
    }).then(response => {
        return response
    })

});

Cypress.Commands.add('Check_Tx', (type, path, tx, option_form = false) => {


    cy.MS_CALL(type, path, {
        "transaction_ID": tx,
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key
    }, option_form).then(response => {
        return response
    })

});

Cypress.Commands.add('Check_OrderID', (type, path, orderid, option_form = false) => {

    cy.MS_CALL(type, path, {
        "order_id": orderid,
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key
    }, option_form).then(response => {
        return response
    })

});


Cypress.Commands.add('Cancel_Payment', (type, path, tx, option_form = false) => {

    cy.MS_CALL(type, path, {
        "transaction_ID": tx,
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key
    }, option_form).then(response => {
        return response
    })

});
