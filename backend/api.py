#!/usr/bin/env python3

"""
API Service
"""

from requests import RequestException
from requests_cache import CachedSession

from flask import Flask

api = Flask(__name__)

# pylint: disable=line-too-long
session = CachedSession("nfld", expire_after=86400, allowable_codes=[200], allowable_methods=["GET"])

def get_url(url):
    """ Get URL """
    try:
        response = session.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except RequestException as e:
        print(f"Request error: {e}")
        return None
    except Exception as e: # pylint: disable=broad-exception-caught
        print(f"Error: {e}")
        return None

# pylint: disable=fixme
@api.route("/api/schedule/<team>") # TODO: Nginx handles /api
def get_schedule(team: str):
    """ Returns team schedule """
    schedule = {}
    response = get_url(f"https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams/{team}/schedule?region=us&lang=en&season=2025&seasontype=2") # pylint: disable=line-too-long
    if response:
        schedule = response["events"]
    return schedule

# pylint: disable=fixme
@api.route("/api/teams") # TODO: Nginx handles /api
def get_teams():
    """ Returns all teams """
    response = get_url("https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams")
    teams = {}
    if response:
        teams = response["sports"][0]["leagues"][0]["teams"]
    return teams

if __name__ == "__main__":
    api.run(host="0.0.0.0", port=5000)
