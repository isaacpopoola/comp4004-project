import { Before, After, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import api from "../../../src/Services"

  Before({ tags: "@createStudent" }, async () => {
    var username = "sampleuser" ;
    var password = "samplepass";
    var name = "samplename";
    await api.createStudent(name, username, password)

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

  When('I click Deliverables', () => {
    cy.wait(200);
    cy.get("#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(4)").click();
  })

  And('Click {string}', (course_code) => {
    cy.wait(200);
    // this.student_username = student_username; this doesnt work in cypress for some reason
    // cy.get("#root > section > section > main > div > div > div:nth-child(1) > div.ant-collapse-header").include(course_code);
    cy.get("#root > section > section > main > div > div > div:nth-child(1) > div.ant-collapse-header").click();
  })

  And("Submit the Assignment", () => {
    cy.wait(200);
    cy.get("#root > section > section > main > div > div > div.ant-collapse-item.ant-collapse-item-active > div.ant-collapse-content.ant-collapse-content-active > div > div > div > div:nth-child(1) > div > div.ant-card-body > div:nth-child(1) > div.ant-col.ant-col-8.ant-col-offset-8 > button").click();
  })

  Then(`Submit button should be disabled`, () => {
    cy.wait(200);
    cy.get("#root > section > section > main > div > div > div.ant-collapse-item.ant-collapse-item-active > div.ant-collapse-content.ant-collapse-content-active > div > div > div > div:nth-child(1) > div > div.ant-card-body > div:nth-child(1) > div.ant-col.ant-col-8.ant-col-offset-8 > button").should("be.disabled");

  })
  