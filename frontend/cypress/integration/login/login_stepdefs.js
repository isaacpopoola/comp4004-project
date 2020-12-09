import { Before, After, Given, Then, When } from "cypress-cucumber-preprocessor/steps";


  Given(`I open CMS page`, () => {
      cy.visit("localhost:3000");
  })

  When(`I see the Sign in modal`, () => {
    cy.wait(200);
    cy.get("div.ant-modal.sign-in-modal").title("Sign In");
  })

  When(`I type in {string} and {string}`, (username, password) => {
      cy.wait(200);
      cy.get('input#sign-in-username.ant-input').type(username);
      cy.wait(200)
      cy.get('input#sign-in-password.ant-input').type(password);

      cy.get("body > div:nth-child(6) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary").click();
  })

  Then(`{string} should be logged in`, (username) => {
    cy.wait(500);
    cy.getCookie('username').should('have.property', 'value', `${username}`)
  })
  