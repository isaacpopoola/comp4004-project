Feature: Student gets its own final grades
    This endpoint sends student's final grades

    @wipetables @createfinalgrade
    Scenario Outline: Student successfully gets list of final grades
        Given Express Server is running and address is <address>
        When Username is <username>
        When Student gets final grades
        Then Operation was successful
        And Final grades list is not empty

    Examples:
    | address          | course_code   | username                  | course_descr                | credits | prof_id |
    | "localhost:8080" | "COMP4004"    | "ryanduan" | "A very interesting course" | 0.5     | 1       |