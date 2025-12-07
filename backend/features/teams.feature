@teams
Feature: Get listing of all teams
  Scenario: Get all teams
    Given A user wants a listing of all teams
      When /teams API is called
      Then JSON team data is returned
        And KC is found
