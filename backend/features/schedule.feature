@schedule
Feature: Get schedule of a specific team
  Scenario: Get schedule
    Given A user wants a team schedule
      When /schedule API is called with a team and season
      Then JSON schedule data is returned
        And Current year matches
