#!/usr/bin/env python3

# pylint: skip-file

from datetime import datetime

from behave import given, when, then

from api import get_schedule


REGULAR_SEASON = "2"


@given("A user wants a team schedule")
def step_impl(context):
    pass


@when("/schedule API is called with a team and season")
def step_impl(context):
    context.schedule = get_schedule("KC", REGULAR_SEASON)
    assert context.failed is not True, "/schedule call failed"


@then("JSON schedule data is returned")
def step_impl(context):
    assert len(context.schedule) > 0, "Empty JSON response"


@then("Current year matches")
def step_impl(context):
    assert context.schedule[0]["season"]["year"] == datetime.now().year
