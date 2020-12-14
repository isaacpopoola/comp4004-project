Feature: Delete Student
    I want admins to be able to delete Students

    @createStudent
    Scenario Outline: Delete a student
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