#!/usr/bin/env python3

"""Docker healthcheck"""

import sys

from requests import get

def main():
    """Call healthcheck API endpoint"""
    resp = get("http://localhost:5555/api/healthcheck", verify=False, timeout=5)
    if resp.status_code == 200:
        sys.exit()
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
