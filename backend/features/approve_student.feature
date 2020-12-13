Feature: Approve a student
    This endpoint should allow admins to approve students who registered  

    @registerstudent @wipetables 
    Scenario Outline: Approve Registered Student
        Given Express Server is running and address is <address>
        When Username is <username>
        When Student is approved
        Then Operation was successful

    Examples:
    | address          | username       |
    | "localhost:8080" | "isaacpopoola" |