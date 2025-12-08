#!/usr/bin/env -S docker build . --tag=nfld-backend --file

FROM python:3.11-alpine

WORKDIR /backend

ENV PYTHONUNBUFFERED=1

COPY *.py pyproject.toml /backend/
RUN pip install --upgrade --no-cache-dir pip pip-tools && \
    pip-compile --strip-extras && \
    pip-sync && \
    pip uninstall pip-tools -y && \
    pip cache purge && \
    rm requirements.txt pyproject.toml

EXPOSE 5555

CMD ["gunicorn", "api:api", "-b", "0.0.0.0:5555", "-w", "9"]
