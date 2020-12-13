import {
    Before,
    After,
    Given,
    Then,
    When,
    And,
} from "cypress-cucumber-preprocessor/steps";
import api from "../../../src/Services";

Given(`I open CMS page`, () => {
    cy.visit("localhost:3000");
    cy.wait(200);
});

When(`I see the Sign in modal`, () => {
    cy.wait(200);
    cy.get("div.ant-modal.sign-in-modal").title("Sign In");
});

When(`I type in {string} and {string}`, (username, password) => {
    cy.wait(200);
    cy.get("input#sign-in-username.ant-input").type(username);
    cy.wait(200);
    cy.get("input#sign-in-password.ant-input").type(password);

    cy.get("form#basic.ant-form.ant-form-horizontal.signin-form").submit();
});

And("I click Sign in", () => {
    cy.wait(200);
    cy.get(
        "body > div:nth-child(6) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary"
    ).click();
});

When("I click Courses", () => {
    cy.wait(200);
    cy.get(
        "#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(2)"
    ).click();
});

When("I click Create Term", () => {
    cy.wait(200);
    cy.get(
        "#root > section > section > main > div > div:nth-child(1) > button:nth-child(1)"
    ).click();
});

And("Input term start date {string}", (start) => {
    cy.wait(200);
    cy.get("input#create-term-start-date.ant-input").type(start);
});

And("Input term end date {string}", (end) => {
    cy.wait(200);
    cy.get("input#create-term-end-date.ant-input").type(end);
});

And("Submit form", () => {
    cy.wait(200);
    cy.get(
        "body > div:nth-child(8) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary"
    ).click();
});

Then(`Term should start on {string} and end on {string}`, (start, end) => {
    cy.wait(6000);
    cy.get(
        "#root > section > section > main > div > div:nth-child(1) > button:nth-child(2)"
    ).click();

    cy.get(':nth-child(6) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content').should('have.text', start);
    cy.get(':nth-child(7) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content').should('have.text', end);

});
