/// <reference types="cypress" />

import ms from '../config.json';
import cp from '../response/check-status.json';

import '../methods/moneyspace';


let payment = "qrcode-mskey";
let order_id = ms.tests.QRMskey.orderIdPrefix + Date.now();

var ms_data = {
    "OrderID": order_id,
    "transactionID": "",
    "transactionID_Stage": "",
    "body": {
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key,
        "firstname": "dd2Phgjt1IKBzTwhMo",
        "lastname": "2etQINTRs0n",
        "email": "test@test.com",
        "phone": "0888888888",
        "amount": "1.19",
        "description": "w2wb1sZVjkd8 cypress",
        "address": "111/11",
        "message": "b7ACd8v40WtIB...",
        "feeType": "include",
        "order_id": order_id,
        "payment_type": "qrnone",
        "success_Url": "https://www.moneyspace.net/success",
        "fail_Url": "https://www.moneyspace.net/fail",
        "cancel_Url": "https://www.moneyspace.net/cancel"
    },
    "prod_response_create_tx": "",
    "prod_response_check_tx_whitelable": "",
    "prod_response_check_orderid_whitelable": "",
    "prod_response_check_tx_phpsdk": "",
    "prod_response_check_orderid_phpsdk": "",
    "prod_response_cancel_payment": "",
    "stage_response_create_tx": "",
    "stage_response_check_tx_whitelable": "",
    "stage_response_check_orderid_whitelable": "",
    "stage_response_check_tx_phpsdk": "",
    "stage_response_check_orderid_phpsdk": "",
    "stage_response_cancel_payment": "",
}

// 20/08/2021
var respone_prod_create_tx = {
    "body": [{
        "status": "",
        "transaction_ID": "",
        "mskey": ""
    }]
}

var respone_prod_cancel_payment = {
    "body": [{
        "status": "",
        "message": ""
    }]
}




describe('QRCode-Mskey ( Include )', () => {

    context('Create Transaction ID', () => {

        // it('Production', () => {

        //     cy.MS_CALL("prod", payment, ms_data.body).then(response => {
        //         expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'mskey')
        //         expect(response.body[0].status).to.eq("success")
        //         expect(response.status).to.eq(200)
        //         ms_data.transactionID = response.body[0].transaction_ID
        //         ms_data.prod_response_create_tx = response
        //         cy.log(JSON.stringify(response.body))
        //     })

        // });

        it('Stage', () => {

            cy.MS_CALL("stage", payment, ms_data.body).then(response => {
                expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'mskey')
                expect(response.body[0].status).to.eq("success")
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

    context('Check Transaction ID ( Whitelable )', () => {

        // it('Production', () => {

        //     cy.Check_Tx("prod", "check-tx-whitelable", ms_data.transactionID).then(response => {
        //         expect(response.body[0]["transaction id"]).to.have.all.keys('status', 'amount', 'description')
        //         expect(response.body[0]["transaction id"].status).to.eq("pending") // p เล็ก (last seen 10/08/21)
        //         expect(response.status).to.eq(200)
        //         ms_data.prod_response_check_tx_whitelable = response
        //         cy.log(JSON.stringify(response.body))
        //     });

        // })

        it('Stage', () => {

            cy.Check_Tx("stage", "check-tx-whitelable", ms_data.transactionID_Stage).then(response => {
                expect(response.body[0]["transaction id"]).to.have.all.keys('status', 'amount', 'description')
                expect(response.body[0]["transaction id"].status).to.eq("pending") // p เล็ก (last seen 10/08/21)
                expect(response.status).to.eq(200)
                ms_data.stage_response_check_tx_whitelable = response
                cy.log(JSON.stringify(response.body))
            });

        })

        // it('Compare Response ( Production / Stage )', () => {
        //     expect(ms_data.prod_response_check_tx_whitelable.body[0]).to.deep.equal(ms_data.stage_response_check_tx_whitelable.body[0])
        // });

        // it('Compare Response ( Production_File + [ Production / Stage ] )', () => {
        //     expect(cp.check_tx_whitelable.body[0]).to.have.all.keys(ms_data.prod_response_check_tx_whitelable.body[0]) // Production Response (JSON File) + Production Response
        //     expect(cp.check_tx_whitelable.body[0]).to.have.all.keys(ms_data.stage_response_check_tx_whitelable.body[0]) //  Production Response (JSON File) + Stage Response
        // });


    });

    context('Check OrderID ( Whitelable )', () => {

        // it('Production', () => {

        //     cy.Check_OrderID("prod", "check-orderid-whitelable", ms_data.OrderID).then(response => {
        //         expect(response.body[0]["order id"]).to.have.all.keys('status', 'amount', 'description')
        //         expect(response.body[0]["order id"].status).to.eq("Pending") // p ใหญ่ (last seen 10/08/21)
        //         expect(response.status).to.eq(200)
        //         ms_data.prod_response_check_orderid_whitelable = response
        //         cy.log(JSON.stringify(response.body))
        //     });

        // })

        it('Stage', () => {

            cy.Check_OrderID("stage", "check-orderid-whitelable", ms_data.OrderID).then(response => {
                expect(response.body[0]["order id"]).to.have.all.keys('status', 'amount', 'description')
                expect(response.body[0]["order id"].status).to.eq("Pending") // p ใหญ่ (last seen 10/08/21)
                expect(response.status).to.eq(200)
                ms_data.stage_response_check_orderid_whitelable = response
                cy.log(JSON.stringify(response.body))
            });

        })

        // it('Compare Response ( Production / Stage )', () => {
        //     expect(ms_data.prod_response_check_orderid_whitelable.body[0]).to.deep.equal(ms_data.stage_response_check_orderid_whitelable.body[0])
        // });

        // it('Compare Response ( Production_File + [ Production / Stage ] )', () => {
        //     expect(cp.check_orderid_whitelable.body[0]).to.have.all.keys(ms_data.prod_response_check_orderid_whitelable.body[0]) // Production Response (JSON File) + Production Response
        //     expect(cp.check_orderid_whitelable.body[0]).to.have.all.keys(ms_data.stage_response_check_orderid_whitelable.body[0]) //  Production Response (JSON File) + Stage Response
        // });


    });

    context('Check Transaction ID ( PHP SDK )', () => {

        // it('Production', () => {

        //     cy.Check_Tx("prod", "check-tx-phpsdk", ms_data.transactionID).then(response => {
        //         expect(response.body[0]).to.have.all.keys("Amount ", "Transaction ID ", "Description ", "Status Payment ")
        //         expect(response.body[0]["Status Payment "]).to.eq("Pending") // p ใหญ่     (last seen 10/08/21)
        //         expect(response.status).to.eq(200)
        //         ms_data.prod_response_check_tx_phpsdk = response
        //         cy.log(JSON.stringify(response.body))
        //     });

        // })

        it('Stage', () => {

            cy.Check_Tx("stage", "check-tx-phpsdk", ms_data.transactionID_Stage).then(response => {
                expect(response.body[0]).to.have.all.keys('Amount ', 'Transaction ID ', 'Description ', 'Status Payment ')
                expect(response.body[0]["Status Payment "]).to.eq("Pending") // p ใหญ่ (last seen 10/08/21)
                expect(response.status).to.eq(200)
                ms_data.stage_response_check_tx_phpsdk = response
                cy.log(JSON.stringify(response.body))
            });

        })

        // it('Compare Response ( Production / Stage )', () => {
        //     expect(ms_data.prod_response_check_tx_phpsdk.body[0]).to.have.all.keys(ms_data.stage_response_check_tx_phpsdk.body[0])
        // });

        // it('Compare Response ( Production_File + [ Production / Stage ] )', () => {
        //     expect(cp.check_tx_phpsdk.body[0]).to.have.all.keys(ms_data.prod_response_check_tx_phpsdk.body[0]) // Production Response (JSON File) + Production Response
        //     expect(cp.check_tx_phpsdk.body[0]).to.have.all.keys(ms_data.stage_response_check_tx_phpsdk.body[0]) //  Production Response (JSON File) + Stage Response
        // });

    });

    context('Check OrderID ( PHP SDK )', () => {

        // it('Production', () => {

        //     cy.Check_OrderID("prod", "check-orderid-phpsdk", ms_data.OrderID).then(response => {
        //         expect(response.body[0]).to.have.all.keys("Amount ", "Order ID ", "Description ", "Status Payment ")
        //         expect(response.body[0]["Status Payment "]).to.eq("Pending") // p ใหญ่     (last seen 10/08/21)
        //         expect(response.status).to.eq(200)
        //         ms_data.prod_response_check_orderid_phpsdk = response
        //         cy.log(JSON.stringify(response.body))
        //     });

        // })

        it('Stage', () => {

            cy.Check_OrderID("stage", "check-orderid-phpsdk", ms_data.OrderID).then(response => {
                expect(response.body[0]).to.have.all.keys('Amount ', 'Order ID ', 'Description ', 'Status Payment ')
                expect(response.body[0]["Status Payment "]).to.eq("Pending") // p ใหญ่ (last seen 10/08/21)
                expect(response.status).to.eq(200)
                ms_data.stage_response_check_orderid_phpsdk = response
                cy.log(JSON.stringify(response.body))
            });

        })

        // it('Compare Response ( Production / Stage )', () => {
        //     expect(ms_data.prod_response_check_orderid_phpsdk.body[0]).to.deep.equal(ms_data.stage_response_check_orderid_phpsdk.body[0])
        // });

        // it('Compare Response ( Production_File + [ Production / Stage ] )', () => {
        //     expect(cp.check_orderid_phpsdk.body[0]).to.have.all.keys(ms_data.prod_response_check_orderid_phpsdk.body[0]) // Production Response (JSON File) + Production Response
        //     expect(cp.check_orderid_phpsdk.body[0]).to.have.all.keys(ms_data.stage_response_check_orderid_phpsdk.body[0]) //  Production Response (JSON File) + Stage Response
        // });

    });

    context('Cancel Payment ( Optional )', () => {

        // it('Production', () => {

        //     cy.Cancel_Payment("prod", "cancel-payment", ms_data.transactionID).then(response => {
        //         expect(response.body[0]).to.have.all.keys("status", "message")
        //         expect(response.body[0]["status"]).to.eq("success")
        //         expect(response.body[0]["message"]).to.eq("Transaction id : " + ms_data.transactionID + " Canceled")
        //         expect(response.status).to.eq(200)
        //         ms_data.prod_response_cancel_payment = response
        //         cy.log(JSON.stringify(response.body))
        //     });

        //     cy.Check_Tx("prod", "check-tx-whitelable", ms_data.transactionID).then(response => {
        //         expect(response.body[0]["transaction id"]).to.have.all.keys('status', 'amount', 'description')
        //         expect(response.body[0]["transaction id"].status).to.eq("Cancel")
        //         cy.log(JSON.stringify(response.body))
        //     });
        //     cy.Check_OrderID("prod", "check-orderid-whitelable", ms_data.OrderID).then(response => {
        //         expect(response.body[0]["order id"]).to.have.all.keys('status', 'amount', 'description')
        //         expect(response.body[0]["order id"].status).to.eq("Cancel")
        //         cy.log(JSON.stringify(response.body))
        //     });
        //     cy.Check_Tx("prod", "check-tx-phpsdk", ms_data.transactionID).then(response => {
        //         expect(response.body[0]).to.have.all.keys("Amount ", "Transaction ID ", "Description ", "Status Payment ")
        //         expect(response.body[0]["Status Payment "]).to.eq("Cancel")
        //         cy.log(JSON.stringify(response.body))
        //     });
        //     cy.Check_OrderID("prod", "check-orderid-phpsdk", ms_data.OrderID).then(response => {
        //         expect(response.body[0]).to.have.all.keys("Amount ", "Order ID ", "Description ", "Status Payment ")
        //         expect(response.body[0]["Status Payment "]).to.eq("Cancel")
        //         cy.log(JSON.stringify(response.body))
        //     });
    

        // })

        it('Stage', () => {

            cy.Cancel_Payment("stage", "cancel-payment", ms_data.transactionID_Stage).then(response => {
                expect(response.body[0]).to.have.all.keys("status", "message")
                expect(response.body[0]["status"]).to.eq("success")
                expect(response.body[0]["message"]).to.eq("Transaction id : " + ms_data.transactionID_Stage + " Canceled")
                expect(response.status).to.eq(200)
                ms_data.stage_response_cancel_payment = response
                cy.log(JSON.stringify(response.body))
            });

            cy.Check_Tx("stage", "check-tx-whitelable", ms_data.transactionID_Stage).then(response => {
                expect(response.body[0]["transaction id"]).to.have.all.keys('status', 'amount', 'description')
                expect(response.body[0]["transaction id"].status).to.eq("Cancel")
                cy.log(JSON.stringify(response.body))
            });
            cy.Check_OrderID("stage", "check-orderid-whitelable", ms_data.OrderID).then(response => {
                expect(response.body[0]["order id"]).to.have.all.keys('status', 'amount', 'description')
                expect(response.body[0]["order id"].status).to.eq("Cancel")
                cy.log(JSON.stringify(response.body))
            });
            cy.Check_Tx("stage", "check-tx-phpsdk", ms_data.transactionID_Stage).then(response => {
                expect(response.body[0]).to.have.all.keys("Amount ", "Transaction ID ", "Description ", "Status Payment ")
                expect(response.body[0]["Status Payment "]).to.eq("Cancel")
                cy.log(JSON.stringify(response.body))
            });
            cy.Check_OrderID("stage", "check-orderid-phpsdk", ms_data.OrderID).then(response => {
                expect(response.body[0]).to.have.all.keys("Amount ", "Order ID ", "Description ", "Status Payment ")
                expect(response.body[0]["Status Payment "]).to.eq("Cancel")
                cy.log(JSON.stringify(response.body))
            });

        })

        // it('Compare Response ( Production_File + [ Production / Stage ] )', () => {
        //     expect(respone_prod_cancel_payment.body[0]).to.have.all.keys(ms_data.prod_response_cancel_payment.body[0]) // Production Response (JSON File) + Production Response
        //     expect(respone_prod_cancel_payment.body[0]).to.have.all.keys(ms_data.stage_response_cancel_payment.body[0]) //  Production Response (JSON File) + Stage Response
        // });

    });

});

