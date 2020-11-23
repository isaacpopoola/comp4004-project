Feature: Create Courses and Assign Professor
    This endpoint should allow Administrators to create courses and assign them to professors

    @wipetables
    Scenario Outline: Course is  created successfully
        Given Express Server is running and address is <address>
        When Course code is <course_code> and course name is <course_name>
        When Professor <prof_id> exists
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was successful

    Examples:
    | address          | course_code   | course_name                  | course_descr                | credits | prof_id |
    | "localhost:8080" | "COMP4004"    | "Software Quality Assurance" | "A very interesting course" | 0.5     | 1       |

    @wipetables
    Scenario Outline: Unsuccessful when Professor ID is missing
        Given Express Server is running and address is <address>
        When Course code is <course_code> and course name is <course_name>
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was unsuccessful

    Examples:
    | address          | course_code   | course_name                  | course_descr                | credits |
    | "localhost:8080" | "COMP4004"    | "Software Quality Assurance" | "A very interesting course" | 0.5     |

    @wipetables
    Scenario Outline: Unsuccessful when course code and course name is missing
        Given Express Server is running and address is <address>
        When Professor <prof_id> exists
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was unsuccessful

    Examples:
    | address          | course_descr                | credits | prof_id |
    | "localhost:8080" | "A very interesting course" | 0.5     | 1       |

    @wipetables
    Scenario Outline: Unsuccessful when Professor Does not exist
        Given Express Server is running and address is <address>
        When Course code is <course_code> and course name is <course_name>
        When Professor <prof_id> exists
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was unsuccessful

    Examples:
    | address          | course_code   | course_name                  | course_descr                | credits | prof_id |
    | "localhost:8080" | "COMP4004"    | "Software Quality Assurance" | "A very interesting course" | 0.5     | 2       |