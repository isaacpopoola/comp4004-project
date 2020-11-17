Feature: Register a Student and Professor
    This endpoint should allow clients to create students and Professors in the database

    Scenario Outline: Register Students and Professors
        Given Express Server is running and address is <address>
        When Username is <username>
        When Password is <password>
        When Full name is <name>
        When Type of user is <type>
        When Data is sent to <endpoint>
        Then New user is added to the database

    Examples:
    | name               | username      | password      | type         | address           | endpoint     |
    | "Isaac Popoola"    | "ipopoola"    | "cmspassword" | "Student"    | "localhost:8080"  | "register"   |
    | "Isaac Popoola"    | "ipopoola"    | "cmspassword" | "Professor"  | "localhost:8080"  | "register"   |
    
