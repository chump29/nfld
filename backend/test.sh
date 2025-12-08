#!/usr/bin/env -S bash -e

if [ -z "$VIRTUAL_ENV" ]; then
    echo "Please activate a virtual environment!"
else
    behave --stop
fi
