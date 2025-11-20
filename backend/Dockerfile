#!/usr/bin/env -S docker build . --tag=nfld-backend --file

FROM python:3.11-alpine

WORKDIR /backend

ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade --no-cache-dir pip pip-tools
COPY *.py pyproject.toml /backend/
RUN pip-compile
RUN pip-sync
RUN pip uninstall pip-tools -y
RUN pip cache purge
RUN rm requirements.txt pyproject.toml

EXPOSE 5555

CMD ["gunicorn", "wsgi:api", "-b", ":5555", "-w", "2"]
