Feature: Delete Student
    I want to be able to login as different types of users

    @createStudent
    Scenario Outline: Logging In
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Students
        And I delete student with username <student_username>
        Then <student_username> should not exist in table
        
    
    Examples:
    | admin_username   | admin_password  | student_username    |
    | "admin"          | "admin"         | "sampleuser"        |