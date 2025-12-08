@teams
Feature: Get listing of all teams
  Scenario: Get listing of all teams
    Given that a user wants a listing of all teams
      When /teams API endpoint is called
      Then JSON team data is returned
        And KC team is found
