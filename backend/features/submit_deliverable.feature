Feature: Student submits a deliverable
    This endpoint should allow students to submit a deliverable and recieve a grade

    @createcourse @createdeliverable @createstudent @wipetables 
    Scenario Outline: Submit deliverable on time with correct answer
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and Deliverable id is <deliverable_id>
        When Deliverable deadline is <deadline>
        When Student submits deliverable with answer <submission>
        Then Operation was successful and grade is <grade>

    Examples:
    | address          | username   | course_code | deliverable_id | deadline     | submission | grade |
    | "localhost:8080" | "ryanduan" | "COMP4004"  | 1              | "2020/12/25" | "correct"  | 70    |

    @createcourse @createdeliverable @createstudent @wipetables 
    Scenario Outline: Submit deliverable late with correct answer
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and Deliverable id is <deliverable_id>
        When Deliverable deadline is <deadline>
        When Student submits deliverable with answer <submission>
        Then Operation was successful and grade is <grade>

    Examples:
    | address          | username   | course_code | deliverable_id | deadline   | submission | grade |
    | "localhost:8080" | "ryanduan" | "COMP4004"  | 1              | "2020/1/1" | "correct"  | 35    |

    @createcourse @createdeliverable @createstudent @wipetables 
    Scenario Outline: Submit deliverable on time with wrong answer
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and Deliverable id is <deliverable_id>
        When Deliverable deadline is <deadline>
        When Student submits deliverable with answer <submission>
        Then Operation was successful and grade is <grade>

    Examples:
    | address          | username   | course_code | deliverable_id | deadline     | submission | grade |
    | "localhost:8080" | "ryanduan" | "COMP4004"  | 1              | "2020/12/25" | "wrong"    | 0     |

    @createcourse @createdeliverable @createstudent @wipetables 
    Scenario Outline: Submit deliverable late with wrong answer
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and Deliverable id is <deliverable_id>
        When Deliverable deadline is <deadline>
        When Student submits deliverable with answer <submission>
        Then Operation was successful and grade is <grade>

    Examples:
    | address          | username   | course_code | deliverable_id | deadline   | submission | grade |
    | "localhost:8080" | "ryanduan" | "COMP4004"  | 1              | "2020/1/1" | "wrong"    | 0     |

    @createstudent @wipetables 
    Scenario Outline: Fail to submit deliverable
        Given Express Server is running and address is <address>
        When Username is <username>
        When Course code is <course_code> and Deliverable id is <deliverable_id>
        When Student submits deliverable with answer <submission>
        Then Operation was unsuccessful

    Examples:
    | address          | username   | course_code | deliverable_id | submission |
    | "localhost:8080" | "ryanduan" | "COMP4004"  | 1              | "wrong"    |
