#!/usr/bin/env python3

# pylint: skip-file

from behave import given, when, then

from api import get_schedule

TEAM = "KC"
YEAR = 2025
REGULAR_SEASON = "2"


@given("that a user wants a team schedule")
def step_impl(_):
    pass


@when("/schedule API endpoint is called with a team, year, and season")
def step_impl(context):
    context.schedule = get_schedule(TEAM, YEAR, REGULAR_SEASON)
    assert context.failed is not True, "/schedule call failed"


@then("JSON schedule data is returned")
def step_impl(context):
    assert len(context.schedule) > 0, "Empty JSON response"


@then("the team matches")
def step_impl(context):
    found = False
    for team in context.schedule[0]["competitions"][0]["competitors"]:
        if team["team"]["abbreviation"] == TEAM:
            found = True
            break
    assert found, "Team not found"


@then("the year matches")
def step_impl(context):
    assert context.schedule[0]["season"]["year"] == YEAR
