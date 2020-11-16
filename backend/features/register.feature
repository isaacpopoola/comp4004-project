Feature: Register a Student and Professor
    This endpoint should allow clients to create students and Professors in the database

    Scenario Outline: Register Students abd Professors
        Given Express Server is running and address is <address>
        When Username is <username>
        When Password is <password>
        When First name is <fname> and Last name is <lname>
        When Type of user is <type>
        When I send this data to <endpoint>
        Then New user is added to the database

    Examples:
    | fname      | lname      | username      | password      | type         | address           | endpoint      |
    | "Isaac"    | "Popoola   | "ipopoola"    | "cmspassword" | "Student"    | "localhost:8080"  | "register"   |
    | "Isaac"    | "Popoola   | "ipopoola"    | "cmspassword" | "Professor"  | "localhost:8080"  | "register"   |
    
