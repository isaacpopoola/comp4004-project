import { getByAltText } from "@testing-library/react";
import {
    Before,
    After,
    Given,
    Then,
    When,
    And,
} from "cypress-cucumber-preprocessor/steps";

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

When("I drop course {string}", (courseCode) => {
    cy.wait(200);
    cy.get(".ant-table-row:nth-child(2) a").click();
});

Then("show toast success for dropping out of course", () => {
    cy.wait(200);
    cy.get(".Toastify__toast-body").should("be.visible");
});

And("Course {string} should not exist", (courseCode) => {
    cy.wait(200);
    cy.get(courseCode).should("not.be.visible");
});
