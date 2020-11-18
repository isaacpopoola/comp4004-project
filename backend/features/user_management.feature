Feature: Manage Student and Professor accounts
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

    Scenario Outline: Delete Students and Professors
        Given Express Server is running and address is <address>
        When User <name>, <username>, <password>, <type> is registered 
        When Username is <username>
        When Type of user is <type>
        When Data is sent to <endpoint>
        Then User is no longer in database

        Examples:
        | name               | username      | password      | type         | address           | endpoint   |
        | "Nathaniel"    | "nathaniel_s"    | "cmspassword" | "Student"    | "localhost:8080"  | "delete"   |
        | "Nathaniel"    | "nathaniel_s"    | "cmspassword" | "Professor"  | "localhost:8080"  | "delete"   |
    
