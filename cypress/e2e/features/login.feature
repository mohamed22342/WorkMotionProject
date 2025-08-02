Feature: Login to WorkMotion

  As a user
  I want to log in to the WorkMotion platform
  So that I can access my dashboard

  Scenario: Successful login with valid credentials
    Given I visit the WorkMotion login page
    When I enter valid login credentials
    And I click the login button
    Then I should be redirected to the dashboard

  Scenario: Unsuccessful login with invalid credentials
    Given I visit the WorkMotion login page
    When I enter invalid login credentials
    And I click the login button
    Then I should see an error message: "The email and / or the password you entered is invalid"
