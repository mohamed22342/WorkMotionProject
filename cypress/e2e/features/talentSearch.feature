Feature: Talent Search on WorkMotion

  As a user of the WorkMotion platform,
  I want to onboard a new talent and verify their presence in the system,
  So that I can ensure successful addition and manage my team efficiently.

  Scenario: Search and view newly added talent
    Given I am logged in and on the dashboard workmotion
    When I navigate to the "Onboardings" tab
    Then I search for the new talent in the Onboarding tab and assert it appears
    And I should see the talent listed in the results
    And I verify the talent information is correct
