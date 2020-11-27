Feature: Register a Student and Professor
    This endpoint should allow clients to create students and Professors in the database

    @wipetables
    Scenario Outline: Get all students returns list of students
        Given Express Server is running and address is <address>
        When Student <username> exists
        When Get all students
        Then Operation was successful
        Then Return list of students

    Examples:
    | address          | username |
    | "localhost:8080" | "ryanduan" |

    Scenario Outline: Get all students returns empty list of students
        Given Express Server is running and address is <address>
        When Get all students
        Then Operation was successful
        Then Return empty list of students

    Examples:
    | address          | 
    | "localhost:8080" | 
