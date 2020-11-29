import { Before, After, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import api from "../../../src/Services"

  Before({ tags: "@createStudent" }, async () => {
    var username = "sampleuser" ;
    var password = "samplepass";
    var name = "samplename";
    await api.createStudent({ name, username, password})

  })

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

  When('I delete student with username {string}', (student_username) => {
    cy.wait(200);
    // this.student_username = student_username; this doesnt work in cypress for some reason
    
    
    const exists = { is: false}; //this is dumb i know 
    
    // selects the column "Username" in table
    cy.get("#root > section > section > main > div > div > div > div > div > div > div > table > tbody > tr > td:nth-child(2)") 
          .each(($e1, index, $list) => {
            
            const text = $e1.text();
            
            // checks if username exist in table
            if (text.includes(student_username)){
              exists.is = true;
              cy.get(`#root > section > section > main > div > div > div > div > div > div > div > table > tbody > tr:nth-child(${index+1}) > td:nth-child(4) > div > div > a`).click()
            }

          }).then( () => {
            expect(exists.is).to.be.true;
          })

  })

  Then(`{string} should not exist in table`, (student_username) => {
    cy.wait(200);

    cy.get("#root > section > section > main > div > div > div > div > div > div > div > table > tbody > tr") 
    .each(($e1, index, $list) => {
      
      const text = $e1.text();
      expect(text).to.not.include(student_username);

    })
  })
  