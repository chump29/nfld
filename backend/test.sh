#!/usr/bin/env -S bash -e

if [ -z "$VIRTUAL_ENV" ]; then
    source .venv/bin/activate
fi

behave --stop
