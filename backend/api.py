#!/usr/bin/env python3

"""
API Service
"""

from requests import get, RequestException

from flask import Flask

api = Flask(__name__)

def get_url(url):
    """ Get URL """
    try:
        response = get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except RequestException as e:
        print(f"Request error: {e}")
        return None
    except Exception as e: # pylint: disable=broad-exception-caught
        print(f"Error: {e}")
        return None

"""
@api.route("/<team>")
def get_schedule(team: str):
    try:
        resp = None
        team_data = get_by_abbr(team)
        if team_data:
            team_abbr = team_data["abbr"]
            if team_abbr:
                response = get(
                    url=f"https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams/{team_abbr}/schedule?region=us&lang=en&season=2025&seasontype=1", # pylint: disable=line-too-long
                    timeout=10
                )
                response.raise_for_status()
                resp = response.json()
        return resp
    except exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None
"""

@api.route("/api/teams")
def get_teams():
    """ Returns all teams """
    response = get_url("https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams")
    teams = {}
    if response:
        teams = response["sports"][0]["leagues"][0]["teams"]
    return teams

if __name__ == "__main__":
    api.run(host="0.0.0.0", port=5000)
