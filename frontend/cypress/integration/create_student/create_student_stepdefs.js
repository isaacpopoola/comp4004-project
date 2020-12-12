import { Before, After, Given, Then, When, And } from "cypress-cucumber-preprocessor/steps";
import api from "../../../src/Services"

  Given(`I open CMS page`, () => {
      cy.visit("localhost:3000");
      cy.wait(200);
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

      cy.get("form#basic.ant-form.ant-form-horizontal.signin-form").submit();
  })

  And('I click Sign in', () => {
    cy.wait(200);
    cy.get("body > div:nth-child(6) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary").click();
  })

  When('I click Students', () => {
    cy.wait(200);
    cy.get("#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(3)").click();
  })

  When('I click Create Student', () => {
    cy.wait(200);
    cy.get("#root > section > section > main > div > div:nth-child(1) > button").click();
  })

  And('Input name {string}', (student_name) => {
    cy.wait(200);
    cy.get('input#student-name.ant-input').type(student_name);
  })

  And('Input username {string}', (student_username) => {
    cy.wait(200);
    cy.get('input#student-username.ant-input').type(student_username);
  })

  And('Input password {string}', (student_password) => {
    cy.wait(200);
    cy.get('input#student-password.ant-input').type(student_password);
  })

  And('Submit form', () => {
    cy.wait(200);
    cy.get('body > div:nth-child(9) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary').click()
  })



  Then(`{string} should exist in table`, (student_username) => {
    cy.wait(200);

    cy.get('#root > section > section > main > div > div:nth-child(2) > div > div > div > div > div > div > table > tbody').should('contain', student_username);
  })
  

  Then('Error should exist on name input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(1) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the name!/)
    })
  })

  Then('Error should exist on username input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(2) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the username!/)
    })
  })

  Then('Error should exist on password input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(3) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the password!/)
    })
  })