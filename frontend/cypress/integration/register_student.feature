Feature: Register Student
    I want to be able to register as a student

    Scenario Outline: Register new student
        Given I open CMS page
        When I see the Register modal
        When I type in <username> and <password> and <name>
        Then I should see the success toast
    
    Examples:
    | username   | password       | name       |
    | "ryanduan1234" | "pw"  | "Ryan Duan"  |


    Scenario Outline: Register fails because student (i.e. username) already exists
        Given I open CMS page
        When I see the Register modal
        When I type in <username> and <password> and <name>
        Then I should see the failure toast
    
    Examples:
    | username   | password       | name       |
    | "ryanduan" | "pw"  | "Ryan Duan"  |