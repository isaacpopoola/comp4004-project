Feature: Login
    I want to be able to login as different types of users

    Scenario Outline: Logging In
        Given I open CMS page
        When I see the Sign in modal
        When I type in <username> and <password>
        Then I should see the <type> Dashboard
    
    Examples:
    | username   | password       | type       |
    | "ipopoola" | "cmspassword"  | "Student"  |