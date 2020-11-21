Feature: Admin deleting Students
    This endpoint should allow admins to delete students and all their records
	
    @createstudent 
	Scenario Outline: Delete Student
        Given Express Server is running and address is <address>
        When Username is <username>
        When Student is deleted
        Then Operation was successful

        Examples:
        | username      | address           |
        | "ryanduan"    | "localhost:8080"  |

    # @wipetables
	Scenario Outline: Fail to Delete Student
        Given Express Server is running and address is <address>
        When Username is <username>
        When Student is deleted
        Then Operation was unsuccessful

        Examples:
        | username      | address           |
        | "ryanduan"    | "localhost:8080"  |