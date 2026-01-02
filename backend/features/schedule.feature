@schedule
Feature: Get a team schedule
  Scenario: Get a team schedule
    Given that a user wants a team schedule
      When /schedule API endpoint is called with a team, year, and season
      Then JSON schedule data is returned
        And the team matches
        And the year matches
