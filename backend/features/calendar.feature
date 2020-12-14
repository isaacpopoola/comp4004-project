Feature: Calendar Data for student
    This endpoint should return calendar data for the correct student 

    @enrollCOMP3000 @wipetables 
    Scenario Outline: Get Calendar Data for student
        Given Express Server is running and address is <address>
        When Username is <username>
        When Requests to see calendar
        Then <course_code> should exist in the response

    Examples:
    | address          | username       | course_code |
    | "localhost:8080" | "ryanduan"     | "COMP3000"  |