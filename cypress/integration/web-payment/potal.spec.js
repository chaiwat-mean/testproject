/// <reference types="cypress" />

import ms from '../config.json';

describe('Potal', () => {

        it('Login', () => {

            cy.visit("https://stage.moneyspace.net/portal/login")
            .get("input[id=login-user]").type('stepclick.ms@gmail.com')
            .get("input[id=login-password]").type('5{enter}')
           
        });


});    