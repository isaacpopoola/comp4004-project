import { Before, After, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import api from "../../../src/Services"

  Before({ tags: "@createCourse" }, async () => {
    var course_code = "COMP7007" ;
    var course_name = "Introduction to a Test Course";
    var course_descr = "A very interesting test course";
    var course_registration_deadline = Date.now();
    var course_drop_deadline = Date.now();
    var course_student_limit = 250;
    var course_credits = 0.5;
    await api.createCourse(course_code, course_name, course_descr, course_registration_deadline, course_drop_deadline, course_student_limit, course_credits)

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

  When('I click Courses', () => {
    cy.wait(200);
    cy.get("#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(2)").click();
  })

  And('I delete course with course code {string}', (course_code) => {
    cy.wait(200);
    // this.student_username = student_username; this doesnt work in cypress for some reason
    
    
    const exists = { is: false}; //this is dumb i know 
    
    // selects the column "Course Code" in table
    cy.get("#root > section > section > main > div > div:nth-child(2) > div > div > div > div > div > div > table > tbody > tr > td:nth-child(2)") 
          .each(($e1, index, $list) => {
            
            const text = $e1.text();
            
            // checks if course code exist in table
            if (text.includes(course_code)){
              exists.is = true;
              cy.get(`#root > section > section > main > div > div:nth-child(2) > div > div > div > div > div > div > table > tbody > tr:nth-child(${index+1}) > td:nth-child(8) > div > div > a`).click()
            }

          }).then( () => {
            expect(exists.is).to.be.true;
          })

  })

  Then(`{string} should not exist in table`, (course_code) => {
    cy.wait(200);

    cy.get("#root > section > section > main > div > div:nth-child(2) > div > div > div > div > div > div > table > tbody > tr ") 
    .each(($e1, index, $list) => {
      
      const text = $e1.text();
      expect(text).to.not.include(course_code);

    })
  })
  