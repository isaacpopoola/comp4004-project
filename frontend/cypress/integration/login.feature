Feature: Login
    I want to be able to login as different types of users

    Scenario Outline: Logging In
        Given I open CMS page
        When I see the Sign in modal
        When I type in <username> and <password>
        Then <username> should be logged in
    
    Examples:
    | username   | password       | type       |
    | "ryanduan" | "pw"           | "Student"  |