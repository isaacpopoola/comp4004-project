Feature: Cancel Course
    I want to be able to cancel/delete a Course

    @createCourse
    Scenario Outline: Cancel Course Successfully
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Courses
        And I delete course with course code <course_code>
        Then <course_code> should not exist in table

    Examples:
    | admin_username   | admin_password  | course_code    |
    | "admin"          | "admin"         | "COMP7007"     |