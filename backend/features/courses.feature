Feature: Create Courses and Assign Professor
    This endpoint should allow Administrators to create courses and assign them to professors

    @wipetables
    Scenario Outline: Course is  created successfully
        Given Express Server is running and address is <address>
        When Course code is <course_code> and course name is <course_name>
        When Professor <prof_id> exists
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was successful

    Examples:
    | address          | course_code   | course_name                  | course_descr                | credits | prof_id |
    | "localhost:8080" | "COMP4004"    | "Software Quality Assurance" | "A very interesting course" | 0.5     | 1       |

    @wipetables @createcourse
    Scenario Outline: Course already exists
        Given Express Server is running and address is <address>
        When Course code is <course_code> and course name is <course_name>
        When Professor <prof_id> exists
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was unsuccessful

    Examples:
    | address          | course_code   | course_name                  | course_descr                | credits | prof_id |
    | "localhost:8080" | "COMP4004"    | "Software Quality Assurance" | "A very interesting course" | 0.5     | 1       |

    @wipetables
    Scenario Outline: Unsuccessful when Professor ID is missing
        Given Express Server is running and address is <address>
        When Course code is <course_code> and course name is <course_name>
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was unsuccessful

    Examples:
    | address          | course_code   | course_name                  | course_descr                | credits |
    | "localhost:8080" | "COMP4004"    | "Software Quality Assurance" | "A very interesting course" | 0.5     |

    @wipetables
    Scenario Outline: Unsuccessful when course code and course name is missing
        Given Express Server is running and address is <address>
        When Professor <prof_id> exists
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was unsuccessful

    Examples:
    | address          | course_descr                | credits | prof_id |
    | "localhost:8080" | "A very interesting course" | 0.5     | 1       |

    @wipetables
    Scenario Outline: Unsuccessful when Professor Does not exist
        Given Express Server is running and address is <address>
        When Course code is <course_code> and course name is <course_name>
        When Professor <prof_id> exists
        When Course description is <course_descr>
        When Course credits is <credits>
        When Course is created
        Then Operation was unsuccessful

    Examples:
    | address          | course_code   | course_name                  | course_descr                | credits | prof_id |
    | "localhost:8080" | "COMP4004"    | "Software Quality Assurance" | "A very interesting course" | 0.5     | 2       |

    @wipetables @createcourse
    Scenario Outline: Get all available courses returns list of courses if more than 0 courses are available
        Given Express Server is running and address is <address>
        When Get all courses
        Then Return list of courses
        Then Operation was successful
Examples:
    |address|
    | "localhost:8080" |


    @createunavailablecourse @wipetables 
    Scenario Outline: Get all available courses returns empty list of courses if 0 courses are available
        Given Express Server is running and address is <address>
        When Get all courses
        Then Return empty list of courses
        Then Operation was successful
Examples:
        |address|
    | "localhost:8080" |

    @enrollCOMP3000 @wipetables 
    Scenario Outline: Get all ryanduan's enrolled classes returns non-empty list of courses
        Given Express Server is running and address is <address>
        When Get enrolled courses for <username>
        Then Return list of courses
        Then Operation was successful
        Examples:
        |address           | username   |
        | "localhost:8080" | "ryanduan" |

    @createstudent @wipetables 
    Scenario Outline: Get all ryanduan's enrolled classes returns empty list of courses
        Given Express Server is running and address is <address>
        When Get enrolled courses for <username>
        Then Return empty list of courses
        Then Operation was successful
        Examples:
        |address           | username   |
        | "localhost:8080" | "ryanduan" |
    
        @wipetables @createstudent
    Scenario Outline: Get all ryanduan's enrolled classes returns 400 if no username
        Given Express Server is running and address is <address>
        When Get enrolled courses for <username>
        Then Operation was unsuccessful
        Examples:
        |address           | username   |
        | "localhost:8080" | "" |

        @wipetables @createstudent
    Scenario Outline: Get all ryanduan's enrolled classes returns 400 if user does not exist
        Given Express Server is running and address is <address>
        When Get enrolled courses for <username>
        Then Operation was unsuccessful
        Examples:
        |address           | username   |
        | "localhost:8080" | "harrypotter" |