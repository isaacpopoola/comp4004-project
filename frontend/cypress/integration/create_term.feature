Feature: Create Course
    I want to be able to create a Term

    Scenario Outline: Create Term Successfully
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Courses
        When I click Create Term
        And Input term start date <start>
        And Input term end date <end>
        And Submit form
        Then Term should start on <start> and end on <end>

    Examples:
    | admin_username   | admin_password  | course_code    | start      | end          |
    | "admin"          | "admin"         | "COMP7008"     | "2021-1-1" | "2021-12-12" |
