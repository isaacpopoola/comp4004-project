Feature: Creater Student
    I want to be able to login as different types of users


    Scenario Outline: Create student successfully 
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Students
        When I click Create Student
        And Input name <student_name>
        And Input username <student_username>
        And Input password <student_password>
        And Submit form
        Then <student_username> should exist in table
        
    
    Examples:
    | admin_username   | admin_password  | student_username    | student_name  | student_password  |
    | "admin"          | "admin"         | "sampleusername2"   | "sampleuser2" | "samplepassword2" |


    Scenario Outline: Create student with missing username 
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Students
        When I click Create Student
        And Input name <student_name>
        And Input password <student_password>
        And Submit form
        Then Error should exist on username input
        
    
    Examples:
    | admin_username   | admin_password  | student_name  | student_password  |
    | "admin"          | "admin"         | "sampleuser2" | "samplepassword2" |

        Scenario Outline: Create student with missing name 
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Students
        When I click Create Student
        And Input username <student_username>
        And Input password <student_password>
        And Submit form
        Then Error should exist on name input
        
    
    Examples:
    | admin_username   | admin_password  | student_username    | student_password  |
    | "admin"          | "admin"         | "sampleusername2"   | "samplepassword2" |

        Scenario Outline: Create student with missing password 
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Students
        When I click Create Student
        And Input name <student_name>
        And Input username <student_username>
        And Submit form
        Then Error should exist on password input
        
    
    Examples:
    | admin_username   | admin_password  | student_username    | student_name  | 
    | "admin"          | "admin"         | "sampleusername2"   | "sampleuser2" | 