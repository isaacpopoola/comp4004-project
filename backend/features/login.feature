Feature: Login a Student or Administrator
    This endpoint should allow students and administrators to log in

    @createstudent @wipetables
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

    @createstudent @wipetables
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


    @createstudent @wipetables
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

    @createstudent @wipetables
    Scenario Outline: fails when not provided username/password
        Given Express Server is running and address is <address>
        When Username is <username>
        When logs in
        Then Operation was unsuccessful

    Examples:
    | address          | username      | 
    | "localhost:8080" | "ryanduan"    |

@createadmin @wipetables
 Scenario Outline: Administrator Login successfully
        Given Express Server is running and address is <address>
        When Username is <username>
        When Password is <password>
        When Type of user is <type>
        When logs in
        Then Operation was successful

    Examples:
    | address          | username      | password      | type         | 
    | "localhost:8080" | "admin"    | "admin"          | "Administrator"    |

