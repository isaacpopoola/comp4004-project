Feature: Creater Student
    I want to be able to login as different types of users

    @createAdmin
    Scenario Outline: Create student successfully 
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Students
        When I click Create Course
        And Input <student_name>
        And Input <student_username>
        And Input <student_password>
        Then <student_username> should exist in table
        
    
    Examples:
    | admin_username   | admin_password  | student_username    | student_name | student_password |
    | "admin"          | "admin"         | "sampleusername"    | "sampleuser" | "samplepassword" |