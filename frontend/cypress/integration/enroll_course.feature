Feature: Student enroll in course
    I want students to be able to enroll in courses

    Scenario Outline: Enroll in COMP4004
        Given I open CMS page
        When I see the Sign in modal
        When I type in <username> and <password>
        And I click Sign in
        When I click Courses
        And I enroll in course <course_code>
        Then show toast success for enrolling in course
        
    Examples:
    | username   | password  |   course_code  |
    | "ryanduan"          | "pw"         | "COMP4004"        |


    Scenario Outline: Cannot enroll in COMP3000 because overlimit
    Given I open CMS page
    When I see the Sign in modal
    When I type in <username> and <password>
    And I click Sign in
    When I click Courses
    Then cannot enroll in <course_code>
        
    Examples:
    | username   | password  |   course_code  |
    | "ryanduan"          | "pw"         | "COMP3000"        |