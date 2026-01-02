@version
Feature: Get backend version
  Scenario: Get backend version
    Given that a user wants the backend version
      When /version API endpoint is called
      Then version is returned
