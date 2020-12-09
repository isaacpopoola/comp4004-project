Feature: Student Submits a deliverable
    I want students to be able to submit a deliverable

    Scenario Outline: Enroll in COMP4004
        Given I open CMS page
        When I see the Sign in modal
        When I type in <username> and <password>
        And I click Sign in
        When I click Deliverables
        And Click <course_code>
        And Submit the Assignment
        Then Submit button should be disabled
        
    Examples:
    | username   | password  | course_code  |
    | "ryanduan" | "pw"      | "COMP3000"   |