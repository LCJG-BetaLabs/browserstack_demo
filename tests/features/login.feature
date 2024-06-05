Feature: Elsie 7.0.0

    @TEST_ELLC-1899
    @TESTSET_ELLC-1896
    Scenario: User Login Fail with Microsoft account
        Given the user is on the login screen
        When the user login with Microsoft account
            | username              | password             |
            | joechung@lcjgroup.com | SuperSecretPassword! |
        And the login fail
        Then the user should see a login failure message
        And the user should be prompted to retry login

    @TEST_ELLC-1898
    @TESTSET_ELLC-1896
    Scenario: User Login Successfully with Microsoft account
        Given the user is on the login screen
        When the user login with Microsoft account
            | username | password |
            |          |          |
        Then the user should be directed to the home page
