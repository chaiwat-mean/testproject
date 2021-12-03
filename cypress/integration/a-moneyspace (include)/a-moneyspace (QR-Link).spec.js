/// <reference types="cypress" />

import ms from '../config.json';
import cp from '../response/check-status.json';

import '../methods/moneyspace';


let payment = "qrcode-link";
let order_id = ms.tests.QRLink.orderIdPrefix + Date.now();
let image_qrprom_prod = ""
let image_qrprom_stage = ""

var ms_data = {
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
        "amount": "1.19",
        "description": "test cypress",
        "address": "111/11",
        "message": "test...",
        "feeType": "include",
        "order_id": order_id,
        "payment_type": "qrnone"
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
        "image_qrprom": ""
    }]
}

var respone_prod_cancel_payment = {
    "body": [{
        "status": "",
        "message": ""
    }]
}



describe('QRCode-Link ( Include )', () => {

    context('Create Transaction ID', () => {

        // it('Production', () => {

        //     cy.MS_CALL("prod", payment, ms_data.body).then(response => {
        //         expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'image_qrprom')
        //         expect(response.body[0].status).to.eq("success")
        //         expect(response.status).to.eq(200)
        //         ms_data.transactionID = response.body[0].transaction_ID
        //         ms_data.prod_response_create_tx = response
        //         image_qrprom_prod = decodeURIComponent(response.body[0].image_qrprom)
        //         cy.log(JSON.stringify(response.body))
        //         cy.log(response.body[0].image_qrprom)

        //     })

        // });

        it('Stage', () => {

            cy.MS_CALL("stage", payment, ms_data.body).then(response => {
                expect(response.body[0]).to.have.all.keys('status', 'transaction_ID', 'image_qrprom')
                expect(response.body[0].status).to.eq("success")
                expect(response.status).to.eq(200)
                ms_data.transactionID_Stage = response.body[0].transaction_ID
                ms_data.stage_response_create_tx = response
                image_qrprom_stage = decodeURIComponent(response.body[0].image_qrprom)
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

        // it('Check Parameters ( Production )', () => {


        //     const url = image_qrprom_prod;
        //     const arr = url.split('?')[1].split('&');
        //     const paramObj = { };
        //     arr.forEach(param => {
        //         const [key, value] = param.split('=');
        //         paramObj[key] = value;
        //     });

        //     cy.wrap(paramObj).its('topic')
        //     cy.wrap(paramObj).its('locale')
        //     cy.wrap(paramObj).its('transactionId').should('eq', ms_data.transactionID)
        //     cy.wrap(paramObj).its('amount').should('eq', ms_data.body.amount)
        //     cy.wrap(paramObj).its('description') // ไม่ตรงกัน
        //     cy.wrap(paramObj).its('channel')
        //     cy.wrap(paramObj).its('currency').should('eq', 'THB')
        //     cy.wrap(paramObj).its('note')
        //     cy.wrap(paramObj).its('type')
        //     cy.wrap(paramObj).its('firstname').should('eq', ms_data.body.firstname)
        //     cy.wrap(paramObj).its('lastname').should('eq', ms_data.body.lastname)
        //     cy.wrap(paramObj).its('phone').should('eq', ms_data.body.phone)
        //     cy.wrap(paramObj).its('address').should('eq', ms_data.body.address)
        //     cy.wrap(paramObj).its('email').should('eq', ms_data.body.email)
        //     cy.wrap(paramObj).its('message') // ไม่ตรงกัน
        //     cy.wrap(paramObj).its('payment_id')
        //     cy.wrap(paramObj).its('gateway').should('eq', 'qrnone')
        //     cy.wrap(paramObj).its('lang').should('eq', 'E')
        //     cy.wrap(paramObj).its('user_merchant').should('eq', '5437')
        //     cy.wrap(paramObj).its('agreement').should('eq', '1')
        //     cy.wrap(paramObj).its('fee').should('eq', 'include')
        //     cy.wrap(paramObj).its('bblFormActionUrl').should('eq', 'https://ipay.bangkokbank.com/b2c/eng/dPayment/payComp.jsp')
        //     cy.wrap(paramObj).its('bahtCurrencyCode').should('eq', '764')
        //     cy.wrap(paramObj).its('store_name')
        //     cy.wrap(paramObj).its('store_logo')
        //     cy.wrap(paramObj).its('orderRef5')
        // });

        it('Check Parameters ( Stage )', () => {


            const url = image_qrprom_stage;
            const arr = url.split('?')[1].split('&');
            const paramObj = { };
            arr.forEach(param => {
                const [key, value] = param.split('=');
                paramObj[key] = value;
            });

            cy.wrap(paramObj).its('topic')
            cy.wrap(paramObj).its('locale')
            cy.wrap(paramObj).its('transactionId').should('eq', ms_data.transactionID_Stage)
            cy.wrap(paramObj).its('amount').should('eq', ms_data.body.amount)
            cy.wrap(paramObj).its('description') // ไม่ตรงกัน
            cy.wrap(paramObj).its('channel')
            cy.wrap(paramObj).its('currency').should('eq', 'THB')
            cy.wrap(paramObj).its('note')
            cy.wrap(paramObj).its('type')
            cy.wrap(paramObj).its('firstname').should('eq', ms_data.body.firstname)
            cy.wrap(paramObj).its('lastname').should('eq', ms_data.body.lastname)
            cy.wrap(paramObj).its('phone').should('eq', ms_data.body.phone)
            cy.wrap(paramObj).its('address').should('eq', ms_data.body.address)
            cy.wrap(paramObj).its('email').should('eq', ms_data.body.email)
            cy.wrap(paramObj).its('message') // ไม่ตรงกัน
            cy.wrap(paramObj).its('payment_id')
            cy.wrap(paramObj).its('gateway').should('eq', 'qrnone')
            cy.wrap(paramObj).its('lang').should('eq', 'E')
            cy.wrap(paramObj).its('user_merchant').should('eq', '5856')
            cy.wrap(paramObj).its('agreement').should('eq', '1')
            cy.wrap(paramObj).its('fee').should('eq', 'include')
            cy.wrap(paramObj).its('bblFormActionUrl').should('eq', 'https://ipay.bangkokbank.com/b2c/eng/dPayment/payComp.jsp')
            cy.wrap(paramObj).its('bahtCurrencyCode').should('eq', '764')
            cy.wrap(paramObj).its('store_name')
            cy.wrap(paramObj).its('store_logo')
            cy.wrap(paramObj).its('orderRef5')
        });

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

    // context('Cancel Payment ( Optional )', () => {

    //     it('Production', () => {

    //         cy.Cancel_Payment("prod", "cancel-payment", ms_data.transactionID).then(response => {
    //             expect(response.body[0]).to.have.all.keys("status", "message")
    //             expect(response.body[0]["status"]).to.eq("success")
    //             expect(response.body[0]["message"]).to.eq("Transaction id : " + ms_data.transactionID + " Canceled")
    //             expect(response.status).to.eq(200)
    //             ms_data.prod_response_cancel_payment = response
    //             cy.log(JSON.stringify(response.body))
    //         });

    //         cy.Check_Tx("prod", "check-tx-whitelable", ms_data.transactionID).then(response => {
    //             expect(response.body[0]["transaction id"]).to.have.all.keys('status', 'amount', 'description')
    //             expect(response.body[0]["transaction id"].status).to.eq("Cancel")
    //             cy.log(JSON.stringify(response.body))
    //         });
    //         cy.Check_OrderID("prod", "check-orderid-whitelable", ms_data.OrderID).then(response => {
    //             expect(response.body[0]["order id"]).to.have.all.keys('status', 'amount', 'description')
    //             expect(response.body[0]["order id"].status).to.eq("Cancel")
    //             cy.log(JSON.stringify(response.body))
    //         });
    //         cy.Check_Tx("prod", "check-tx-phpsdk", ms_data.transactionID).then(response => {
    //             expect(response.body[0]).to.have.all.keys("Amount ", "Transaction ID ", "Description ", "Status Payment ")
    //             expect(response.body[0]["Status Payment "]).to.eq("Cancel")
    //             cy.log(JSON.stringify(response.body))
    //         });
    //         cy.Check_OrderID("prod", "check-orderid-phpsdk", ms_data.OrderID).then(response => {
    //             expect(response.body[0]).to.have.all.keys("Amount ", "Order ID ", "Description ", "Status Payment ")
    //             expect(response.body[0]["Status Payment "]).to.eq("Cancel")
    //             cy.log(JSON.stringify(response.body))
    //         });
    

    //     })

    //     it('Stage', () => {

    //         cy.Cancel_Payment("stage", "cancel-payment", ms_data.transactionID_Stage).then(response => {
    //             expect(response.body[0]).to.have.all.keys("status", "message")
    //             expect(response.body[0]["status"]).to.eq("success")
    //             expect(response.body[0]["message"]).to.eq("Transaction id : " + ms_data.transactionID_Stage + " Canceled")
    //             expect(response.status).to.eq(200)
    //             ms_data.stage_response_cancel_payment = response
    //             cy.log(JSON.stringify(response.body))
    //         });

    //         cy.Check_Tx("stage", "check-tx-whitelable", ms_data.transactionID_Stage).then(response => {
    //             expect(response.body[0]["transaction id"]).to.have.all.keys('status', 'amount', 'description')
    //             expect(response.body[0]["transaction id"].status).to.eq("Cancel")
    //             cy.log(JSON.stringify(response.body))
    //         });
    //         cy.Check_OrderID("stage", "check-orderid-whitelable", ms_data.OrderID).then(response => {
    //             expect(response.body[0]["order id"]).to.have.all.keys('status', 'amount', 'description')
    //             expect(response.body[0]["order id"].status).to.eq("Cancel")
    //             cy.log(JSON.stringify(response.body))
    //         });
    //         cy.Check_Tx("stage", "check-tx-phpsdk", ms_data.transactionID_Stage).then(response => {
    //             expect(response.body[0]).to.have.all.keys("Amount ", "Transaction ID ", "Description ", "Status Payment ")
    //             expect(response.body[0]["Status Payment "]).to.eq("Cancel")
    //             cy.log(JSON.stringify(response.body))
    //         });
    //         cy.Check_OrderID("stage", "check-orderid-phpsdk", ms_data.OrderID).then(response => {
    //             expect(response.body[0]).to.have.all.keys("Amount ", "Order ID ", "Description ", "Status Payment ")
    //             expect(response.body[0]["Status Payment "]).to.eq("Cancel")
    //             cy.log(JSON.stringify(response.body))
    //         });
    

    //     })

    //     it('Compare Response ( Production_File + [ Production / Stage ] )', () => {
    //         expect(respone_prod_cancel_payment.body[0]).to.have.all.keys(ms_data.prod_response_cancel_payment.body[0]) // Production Response (JSON File) + Production Response
    //         expect(respone_prod_cancel_payment.body[0]).to.have.all.keys(ms_data.stage_response_cancel_payment.body[0]) //  Production Response (JSON File) + Stage Response
    //     });

    // });




});

