Feature: Admin cancels a course
    This endpoint should allow the admin to cancel a course

    @createstudent @createcourse @wipetables
    Scenario Outline: Admin cancels a course
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and course name is <course_name>
        When Student registers for the course
        When Admin cancels the course
        Then Operation was successful

    Examples:
    | address          | course_code | course_name | username   |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  | "ryanduan" |

    Scenario Outline: Admin fails to cancel a course
        Given Express Server is running and address is <address>
        When Course code is <course_code> and course name is <course_name>
        When Admin cancels the course
        Then Operation was unsuccessful

    Examples:
    | address          | course_code | course_name |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  |
