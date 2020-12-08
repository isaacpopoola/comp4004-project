Feature: Student drops a course
    This endpoint should allow students to drop a courses

    @createstudent @createcourse @wipetables
    Scenario Outline: Student drops course before deadline
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and course name is <course_name>
        When Drop deadline is <drop_deadline>
        When Student registers for the course
        When Student drops the course
        Then Operation was successful with no final grade and refund

    Examples:
    | address          | course_code | course_name | username   | drop_deadline |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  | "ryanduan" | "2020/12/25"  |

    @createstudent @createcourse @wipetables
    Scenario Outline: Student drops course after deadline
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and course name is <course_name>
        When Drop deadline is <drop_deadline>
        When Student registers for the course
        When Student drops the course
        Then Operation was successful with final grade and no refund

    Examples:
    | address          | course_code | course_name | username   | drop_deadline |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  | "ryanduan" | "2020/1/1"    |

    @createstudent @wipetables
    Scenario Outline: Student fails to drop course, when course doesnt exist
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and course name is <course_name>
        When Student drops the course
        Then Operation was unsuccessful

    Examples:
    | address          | course_code | course_name | username   |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  | "ryanduan" |

    
    @createstudent @createcourse @wipetables
    Scenario Outline: Student fails to drop course they are not registered in
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and course name is <course_name>
        When Student drops the course
        Then Operation was unsuccessful

    Examples:
    | address          | course_code | course_name | username   |
    | "localhost:8080" | "COMP4004"  | "COMP4004"  | "ryanduan" |