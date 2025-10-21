#!/usr/bin/env python3

""" WSGI Entrypoint """

from api import api

if __name__ == "__main__":
    api.run()
