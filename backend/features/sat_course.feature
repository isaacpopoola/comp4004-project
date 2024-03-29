Feature: Request for SAT/UNSAT score
    This endpoint should allow students to submit a request for 

    @createcourse @createstudent @wipetables 
    Scenario Outline: Submit request to SAT a course
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code>
        When Course final grade is <grade>
        When Requests to SATUNSAT course
        Then Operation was successful and is <satunsat>

    Examples:
    | address          | username   | course_code | grade | satunsat   |
    | "localhost:8080" | "ryanduan" | "COMP4004"  | 30    | "UNSAT"    |
    | "localhost:8080" | "ryanduan" | "COMP4004"  | 60    | "SAT"      |