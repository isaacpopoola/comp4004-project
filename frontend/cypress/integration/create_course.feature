Feature: Create Course
    I want to be able to create a Course

    Scenario Outline: Create Course Successfully
        Given I open CMS page
        When I see the Sign in modal
        When I type in <admin_username> and <admin_password>
        And I click Sign in
        When I click Courses
        When I click Create Course
        And Input course code <course_code>
        And Input course name <course_name>
        And Input course decription <course_descr>
        And Input registration deadline
        And Input drop deadline
        And Input course days <days>
        And Input course time <time>
        And Input duration <duration>
        And Input student limit <course_student_limit>
        And Input credits <course_credits>
        And Input price <price>
        And Submit form
        Then <course_code> should exist in table

    Examples:
    | admin_username   | admin_password  | course_code    | course_name   | course_descr    | course_student_limit | course_credits | time     | days                 | duration | price   |
    | "admin"          | "admin"         | "COMP7008"     | "Test Course" | "A test course" | 250                  | 0.5            | "18:00"  | "Wednesday, Friday"  | 1.5      | 1234.56 |

    
    # Scenario Outline: Create Course Successfully
    #     Given I open CMS page
    #     When I see the Sign in modal
    #     When I type in <admin_username> and <admin_password>
    #     And I click Sign in
    #     When I click Courses
    #     When I click Create Course
    #     And Input course name <course_name>
    #     And Input course decription <course_descr>
    #     And Input registration deadline
    #     And Input drop deadline
    #     And Input student limit <course_student_limit>
    #     And Input credits <course_credits>
    #     And Submit form
    #     Then <course_code> should exist in table

    # Examples:
    # | admin_username   | admin_password  | course_code    | course_name   | course_descr    | course_student_limit | course_credits |
    # | "admin"          | "admin"         | "COMP7007"     | "Test Course" | "A test course" | 250                  | 0.5            |