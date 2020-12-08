import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I open CMS page`, () => {
    cy.visit("localhost:3000");
});

When(`I see the Register modal`, () => {
    cy.wait(200);
    cy.get(".ant-tabs-tab:nth-child(2)").click();
});

When(
    "I type in {string} and {string} and {string}",
    (username, password, name) => {
        cy.wait(200);
        cy.get("#sign-in-username").type(username, { force: true });
        cy.wait(200);
        cy.get("#sign-in-password").type(password, { force: true });
        cy.get("#sign-in-name").type(name, { force: true });
        cy.get(".ant-btn:nth-child(2)").click();
    }
);

Then("I should see the success toast", () => {
    cy.wait(200);
    cy.get(".Toastify__toast-body").should("be.visible");
    cy.contains("Successfully registered!").should("be.visible");
});

Then("I should see the failure toast", () => {
    cy.wait(200);
    cy.get(".Toastify__toast-body").should("be.visible");
    cy.contains("Student already exists").should("be.visible");
});
