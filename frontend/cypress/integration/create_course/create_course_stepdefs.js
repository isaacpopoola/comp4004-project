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

  When('I click Courses', () => {
    cy.wait(200);
    cy.get("#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(2)").click();
  })

  When('I click Create Course', () => {
    cy.wait(200);
    cy.get("#root > section > section > main > div > div:nth-child(1) > button").click();
  })

  And('Input course code {string}', (code) => {
    cy.wait(200);
    cy.get('input#create-course-coursecode.ant-input').type(code);
  })

  And('Input course name {string}', (name) => {
    cy.wait(200);
    cy.get('input#create-course-coursename.ant-input').type(name);
  })

  And('Input course decription {string}', (descr) => {
    cy.wait(200);
    cy.get('textarea#create-course-coursedescr.ant-input').type(descr);
  })

  And('Input registration deadline', () => {
    cy.wait(200);
    var d = new Date();
    cy.get('input#create-course-courseregistrationdeadline').click();
    cy.get('input#create-course-courseregistrationdeadline').type(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()+1}{enter}`, {force: true});
  })

  And('Input drop deadline', () => {
    cy.wait(200);
    var d = new Date();
    cy.get('input#create-course-coursedropdeadline').click
    cy.get('input#create-course-coursedropdeadline').type(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()+1}{enter}`, {force: true});

})

And('Input course days {string}', (days) => {
  cy.wait(200);
  cy.get('input#create-course-courseday.ant-input').type(days);
})

And('Input course time {string}', (time) => {
  cy.wait(200);
  cy.get('input#create-course-coursetime.ant-input').type(time);
})

And('Input duration {float}', (duration) => {
  cy.wait(200);
  cy.get('input#create-course-courseduration.ant-input-number-input').type(duration);
})

  And('Input student limit {int}', (limit) => {
    cy.wait(200);
    cy.get('input#create-course-coursestudentlimit.ant-input-number-input').type(limit);
  })

  And('Input credits {float}', (credits) => {
    cy.wait(200);
    cy.get('input#create-course-coursecredits.ant-input-number-input').type(credits);
  })

  And('Input price {float}', (price) => {
    cy.wait(200);
    cy.get('input#create-course-courseprice.ant-input-number-input').type(price);
  })

  And('Submit form', () => {
    cy.wait(200);
    cy.get('body > div:nth-child(8) > div > div.ant-modal-wrap.ant-modal-centered > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary').click()
  })



  Then(`{string} should exist in table`, (course_code) => {
    cy.wait(200);

    cy.get('#root > section > section > main > div > div:nth-child(2) > div > div > div > div > div > div > table > tbody').should('contain', course_code);
  })
  

  Then('Error should exist on course-code input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(1) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the name!/)
    })
  })

  Then('Error should exist on course name input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(2) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the username!/)
    })
  })

  Then('Error should exist on course description input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(3) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the password!/)
    })
  })

  Then('Error should exist on registration deadline input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(3) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the password!/)
    })
  })

  
  Then('Error should exist on drop deadline input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(3) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the password!/)
    })
  })

  
  Then('Error should exist on student limit input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(3) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the password!/)
    })
  })

  
  Then('Error should exist on course credits input', ()=> {
    cy.wait(200)
    cy.get('#basic > div:nth-child(3) > div.ant-col.ant-form-item-control > div.ant-form-item-explain.ant-form-item-explain-error > div').should(($div) => {
        const text = $div.text();

        expect(text).to.match(/Please input the password!/)
    })
  })