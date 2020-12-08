import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I open CMS page`, () => {
    cy.visit("localhost:3000");
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

When("I log out", () => {
    cy.wait(200);
    cy.get(".signin > span").click({ force: true });
});

Then("I should see the success toast", () => {
    cy.wait(200);
    cy.get(".Toastify__toast-body").should("be.visible");
    cy.contains("Successfully registered!").should("be.visible");
});
