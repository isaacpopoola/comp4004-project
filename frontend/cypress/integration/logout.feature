Feature: Logout
    I want to be able to logout 

    Scenario Outline: Successfully logout
        Given I open CMS page
        When I see the Sign in modal
        When I type in <username> and <password>
        When I log out
        Then I should see the success toast
    
    Examples:
    | username   | password       | 
    | "ryanduan" | "pw"  |