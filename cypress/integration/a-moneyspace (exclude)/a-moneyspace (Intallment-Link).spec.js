/// <reference types="cypress" />

import ms from '../config.json';
import cp from '../response/check-status.json';

import '../methods/moneyspace';


let payment = "installment-link";
let order_id = ms.tests.installmentLink.orderIdPrefix + Date.now();

var ms_data = {
    "OrderID": order_id,
    "transactionID": "",
    "transactionID_Stage": "",
    "body": {
        "secret_id": ms.moneyspace.secret_id,
        "secret_key": ms.moneyspace.secret_key,
        "firstname": "TFMIHfa2XfUzjX5Q",
        "lastname": "RWsEL2pdKe50oun",
        "email": "test@test.com",
        "phone": "0888888888",
        "amount": "5989",
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
        "status": "",
        "transaction_ID": "",
        "link_payment": ""
    }]
}





describe('Installment-Link ( Exclude )', () => {

    context('Create Transaction ID', () => {

        // it('Production', () => {

        //     cy.MS_CALL("prod", payment, ms_data.body).then(response => {
        //         expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'link_payment')
        //         expect(response.body[0].status).to.eq("success")
        //         expect(response.status).to.eq(200)
        //         ms_data.transactionID = response.body[0].transaction_ID
        //         ms_data.prod_response_create_tx = response
        //         cy.log(JSON.stringify(response.body))
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

    context('Check Fail URL', () => {

        // it('Production', () => {
        //     cy.request({
        //         method: 'GET',
        //         form: false,
        //         followRedirect: false,
        //         url: "https://www.moneyspace.net/merchantapi/fail?Ref=" + ms_data.transactionID,
        //     }).then(response => {
        //         cy.log(JSON.stringify(response.headers.location))

        //         const url_decode = decodeURIComponent(response.headers.location)
        //         const arr = url_decode.split('?')[1].split('&');
        //         const paramObj = {};
        //         arr.forEach(param => {
        //             const [key, value] = param.split('=');
        //             paramObj[key] = value;
        //         });

        //         cy.wrap(paramObj).its('locale')
        //         cy.wrap(paramObj).its('store_logo')
        //         cy.wrap(paramObj).its('store_name')
        //         cy.wrap(paramObj).its('time')
        //         cy.wrap(paramObj).its('date')
        //         cy.wrap(paramObj).its('type')
        //         cy.wrap(paramObj).its('transactionId').should('eq', ms_data.transactionID)
    

                
        //         ///

        //         cy.Check_Tx("prod", "check-tx-whitelable", ms_data.transactionID).then(response => {
        //             expect(response.body[0]["transaction id"]).to.have.all.keys('status', 'amount', 'description')
        //             expect(response.body[0]["transaction id"].status).to.eq("Fail")
        //             cy.log(JSON.stringify(response.body))
        //         });
        //         cy.Check_OrderID("prod", "check-orderid-whitelable", ms_data.OrderID).then(response => {
        //             expect(response.body[0]["order id"]).to.have.all.keys('status', 'amount', 'description')
        //             expect(response.body[0]["order id"].status).to.eq("Fail")
        //             cy.log(JSON.stringify(response.body))
        //         });
        //         cy.Check_Tx("prod", "check-tx-phpsdk", ms_data.transactionID).then(response => {
        //             expect(response.body[0]).to.have.all.keys("Amount ", "Transaction ID ", "Description ", "Status Payment ")
        //             expect(response.body[0]["Status Payment "]).to.eq("Fail")
        //             cy.log(JSON.stringify(response.body))
        //         });
        //         cy.Check_OrderID("prod", "check-orderid-phpsdk", ms_data.OrderID).then(response => {
        //             expect(response.body[0]).to.have.all.keys("Amount ", "Order ID ", "Description ", "Status Payment ")
        //             expect(response.body[0]["Status Payment "]).to.eq("Fail")
        //             cy.log(JSON.stringify(response.body))
        //         });
        //     })

        // })

    });

});

