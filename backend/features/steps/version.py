#!/usr/bin/env python3

# pylint: skip-file

from behave import given, when, then

from api import get_version


@given("that a user wants the backend version")
def step_impl(_):
    pass


@when("/version API endpoint is called")
def step_impl(context):
    context.version = get_version()
    assert context.failed is not True, "/version call failed"


@then("version is returned")
def step_impl(context):
    assert len(context.version) > 0, "Empty response"
