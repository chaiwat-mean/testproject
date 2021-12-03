/// <reference types="cypress" />

import ms from '../config.json';

describe('Demoshop', () => {

        it('Open and Create TX (Card)', () => {

            cy.visit(ms.moneyspace.demoshop.main)
                .get('div[class=button]').should('have.length', 2).eq(0).contains('Next').click()
                .get('div[class="four col"]').should('have.length', 3).eq(0).click()
                .get('div[class=button]').contains('สร้างรหัสธุรกรรม').click()

        });

        it('Open and Create TX (QR Code)', () => {

            cy.visit(ms.moneyspace.demoshop.main)
                .get('div[class=button]').should('have.length', 2).eq(0).contains('Next').click()
                .get('div[class="four col"]').should('have.length', 3).eq(1).click()
                .get('div[class=button]').contains('สร้างรหัสธุรกรรม').click()

        });

        it('Open and Create TX (Installment KTC)', () => {

            cy.visit(ms.moneyspace.demoshop.main)
                .get('div[class=button]').should('have.length', 2).eq(0).contains('Next').click()
                .get('div[class="four col"]').should('have.length', 3).eq(2).click()
                .get('label[for=ktc]').click()
                .get('div[class=button]').contains('สร้างรหัสธุรกรรม').click()
                .get('select[id=term]').select("6")
                .get('button[class=button]').click()
                .get('a[id=pay_btn]').click()
                .get('input[id=chk_agree]').check({ force: true })
                .get('a[id=pay_btn]').click()
        });

        it('Open and Create TX (Installment BAY1)', () => {

            cy.visit(ms.moneyspace.demoshop.main)
                .get('div[class=button]').should('have.length', 2).eq(0).contains('Next').click()
                .get('div[class="four col"]').should('have.length', 3).eq(2).click()
                .get('label[for=bay1]').click()
                .get('div[class=button]').contains('สร้างรหัสธุรกรรม').click()
                .get('select[id=term]').select("6")
                .get('button[class=button]').click()
                .get('a[id=pay_btn]').click()
                .get('input[id=chk_agree]').check({ force: true })
                .get('a[id=pay_btn]').click()
        });

        it('Open and Create TX (Installment BAY2)', () => {

            cy.visit(ms.moneyspace.demoshop.main)
                .get('div[class=button]').should('have.length', 2).eq(0).contains('Next').click()
                .get('div[class="four col"]').should('have.length', 3).eq(2).click()
                .get('label[for=bay2]').click()
                .get('div[class=button]').contains('สร้างรหัสธุรกรรม').click()
                .get('select[id=term]').select("6")
                .get('button[class=button]').click()
                .get('a[id=pay_btn]').click()
                .get('input[id=chk_agree]').check({ force: true })
                .get('a[id=pay_btn]').click()
        });

        it('Open and Create TX (Installment BAY3)', () => {

            cy.visit(ms.moneyspace.demoshop.main)
                .get('div[class=button]').should('have.length', 2).eq(0).contains('Next').click()
                .get('div[class="four col"]').should('have.length', 3).eq(2).click()
                .get('label[for=bay3]').click()
                .get('div[class=button]').contains('สร้างรหัสธุรกรรม').click()
                .get('select[id=term]').select("6")
                .get('button[class=button]').click()
                .get('a[id=pay_btn]').click()
                .get('input[id=chk_agree]').check({ force: true })
                .get('a[id=pay_btn]').click()
        });

        it('Open and Create TX (Installment FCY)', () => {

            cy.visit(ms.moneyspace.demoshop.main)
                .get('div[class=button]').should('have.length', 2).eq(0).contains('Next').click()
                .get('div[class="four col"]').should('have.length', 3).eq(2).click()
                .get('label[for=fcy]').click()
                .get('div[class=button]').contains('สร้างรหัสธุรกรรม').click()
                .get('select[id=term]').select("6")
                .get('button[class=button]').click()
                .get('a[id=pay_btn]').click()
                .get('input[id=chk_agree]').check({ force: true })
                .get('a[id=pay_btn]').click()
        });

});