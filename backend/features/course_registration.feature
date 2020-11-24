Feature: Student registers for a course
    This endpoint should allow students to register for courses

    @createstudent @createcourse @wipetables
    Scenario Outline: Successful registration
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and course name is <course_name>
        When Registration deadline is <reg_deadline>
        When Student registers for the course
        Then Operation was successful

    Examples:
    | address          | course_code | course_name | username   | reg_deadline |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  | "ryanduan" | "2020/12/25" |

    @createstudent @wipetables
    Scenario Outline: Fail to register for course that doesnt exist
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and course name is <course_name>
        When Student registers for the course
        Then Operation was unsuccessful

    Examples:
    | address          | course_code | course_name | username   |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  | "ryanduan" |

    @createstudent @createcourse @wipetables
    Scenario Outline: Fail to register past deadline
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and course name is <course_name>
        When Registration deadline is <reg_deadline>
        When Student registers for the course
        Then Operation was unsuccessful

    Examples:
    | address          | course_code | course_name | username   | reg_deadline |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  | "ryanduan" | "2020/1/1"   |
    