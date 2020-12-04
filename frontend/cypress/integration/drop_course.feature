Feature: Student drop out of course
    I want students to be able to enroll in courses

    Scenario Outline: Drop out of COMP3004
        Given I open CMS page
        When I see the Sign in modal
        When I type in <username> and <password>
        And I click Sign in
        When I click Courses
        And I drop course <course_code>
        Then show toast success for dropping out of course
        And Course <course_code> should not exist
        
    Examples:
    | username   | password  | course_code  |
    | "ryanduan" | "pw"      | "COMP3004"   |

