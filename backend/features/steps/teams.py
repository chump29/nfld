#!/usr/bin/env python3

# pylint: skip-file

from behave import given, when, then

from api import get_teams

TEAM = "KC"


@given("that a user wants a listing of all teams")
def step_impl(_):
    pass


@when("/teams API endpoint is called")
def step_impl(context):
    context.teams = get_teams()
    assert context.failed is not True, "/teams call failed"


@then("JSON team data is returned")
def step_impl(context):
    assert len(context.teams) > 0, "Empty JSON response"


@then("team is found")
def step_impl(context):
    found = False
    for team in context.teams:
        if team["team"]["abbreviation"] == TEAM:
            found = True
            break
    if not found:
        raise AssertionError("Team not found")
