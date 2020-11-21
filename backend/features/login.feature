Feature: Login a Student or Administrator
    This endpoint should allow students and administrators to log in

    @wipetables @createstudent
    Scenario Outline: Student Login successfully
        Given Express Server is running and address is <address>
        When Username is <username>
        When Password is <password>
        When Type of user is <type>
        When logs in
        Then Operation was successful

    Examples:
    | address          | username      | password      | type         | 
    | "localhost:8080" | "ryanduan"    | "pw"          | "Student"    |

    @wipetables, @createstudent
    Scenario Outline: Unsuccessful when username does not exist
        Given Express Server is running and address is <address>
        When Username is <username>
        When Password is <password>
        When Type of user is <type>
        When logs in
        Then Operation was unsuccessful

    Examples:
    | address          | username      | password      | type         | 
    | "localhost:8080" | "rd"    | "pw"          | "Student"    |


    @wipetables, @createstudent
    Scenario Outline: fails when password is incorrect
        Given Express Server is running and address is <address>
        When Username is <username>
        When Password is <password>
        When Type of user is <type>
        When logs in
        Then Operation was unsuccessful

    Examples:
    | address          | username      | password      | type         | 
    | "localhost:8080" | "ryanduan"    | "12345"          | "Student"    |

    @wipetables, @createstudent
    Scenario Outline: fails when not provided username/password/type
        Given Express Server is running and address is <address>
        When Username is <username>
        When Password is <password>
        When logs in
        Then Operation was unsuccessful

    Examples:
    | address          | username      | password      |
    | "localhost:8080" | "ryanduan"    | "pw"          | 

@wipetables @createadmin
 Scenario Outline: Administrator Login successfully
        Given Express Server is running and address is <address>
        When Administrator <username> exists
        When Username is <username>
        When Password is <password>
        When Type of user is <type>
        When logs in
        Then Operation was successful

    Examples:
    | address          | username      | password      | type         | 
    | "localhost:8080" | "admin"    | "admin"          | "Administrator"    |

