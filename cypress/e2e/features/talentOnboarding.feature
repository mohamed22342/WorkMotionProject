Feature: Talent Onboarding on WorkMotion

  As a user
  I want to onboard a new talent
  So that I can grow my team efficiently

    Scenario: Add a new talent with valid data
      Given I am logged in and on the dashboard
      When I click on the Talent button
      And I select "Egypt" as the country
      And I click Get Started
      And I fill in the required fields with valid data
      And I fill in the second screen with valid data
      And I fill in the third screen with valid data
      And I fill in the email screen with valid email
      And I review all data and finish it
      Then I search for the new talent in the Onboarding tab and assert it appears


  Scenario: Add a new talent with missing enter start date
    Given I am logged in and on the dashboard
    When I click on the Talent button
    And I select "Egypt" as the country
    And I click Get Started
    And I fill in the required fields with valid data without set Contract start date
    Then Assert that validation message for start date appear


  Scenario: Add a new talent with missing enter email
    Given I am logged in and on the dashboard
    When I click on the Talent button
    And I select "Egypt" as the country
    And I click Get Started
    And I fill in the required fields with valid data
    And I fill in the second screen with valid data
    And I fill in the third screen with valid data
    And I missing to enter email in email screen
    Then Assert that validation message appear

