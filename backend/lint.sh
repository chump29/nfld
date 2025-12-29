#!/usr/bin/env -S bash -e

source .venv/bin/activate

pylint api.py

deactivate
