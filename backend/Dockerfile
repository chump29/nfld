#!/usr/bin/env -S docker build . --tag=nfld-backend --no-cache --file

FROM python:3.11-alpine

WORKDIR /backend

ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip
COPY *.py requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5555

CMD ["gunicorn", "wsgi:api", "-b", "0.0.0.0:5555", "-w", "2"]
