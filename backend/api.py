#!/usr/bin/env python3

"""
API Service
"""

from requests import RequestException

from flask import abort, Flask
from flask_cors import CORS
from requests_cache import CachedSession

api = Flask(__name__)
CORS(api)

session = CachedSession("nfld", expire_after=86400, allowable_codes=[200], allowable_methods=["GET"]) # pylint: disable=line-too-long

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

@api.route("/schedule/<team>/<season>")
def get_schedule(team: str, season: str):
    """ Returns team schedule """
    response = get_url(f"https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams/{team}/schedule?region=us&lang=en&season=2025&seasontype={season}") # pylint: disable=line-too-long
    schedule = {}
    if response:
        schedule = response["events"]
    return schedule

@api.route("/teams")
def get_teams():
    """ Returns all teams """
    response = get_url("https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams")
    teams = {}
    if response:
        teams = response["sports"][0]["leagues"][0]["teams"]
    return teams

@api.route("/")
def not_found():
    """ Invalid path """
    abort(404)

if __name__ == "__main__":
    api.run(host="0.0.0.0", port=5555)
