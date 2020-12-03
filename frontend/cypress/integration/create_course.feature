Feature: Create Course
    I want to be able to create a Course

    @createCourse @createProf @createAdmin
    Scenario Outline: Cancel Course Successfully
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Courses
        When I click Create Course
        And Input <course_code>
        And Input <course_name>
        And Input <profId>
        And Input <course_descr>
        And Input registratoin deadline
        And Input drop deadline
        And Input <course_student_limit>
        And Input <course_credits>
        And Input <section>
        Then <course_code> should exist in table

    Examples:
    | admin_username   | admin_password  | course_code    | course_name   | profId | course_descr    | course_student_limit | course_credits | section |
    | "admin"          | "admin"         | "COMP7007"     | "Test Course" | 1      | "A test course" | 250                  | 0.5            | "A"     |