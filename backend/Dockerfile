#!/usr/bin/env -S docker build . --tag=nfld-backend --file

FROM python:3.11-alpine

WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY api.py pyproject.toml healthcheck.sh /backend/
RUN pip install --upgrade --no-cache-dir pip pip-tools && \
    pip-compile --strip-extras && \
    pip-sync && \
    pip uninstall pip-tools -y && \
    pip cache purge && \
    rm requirements.txt

HEALTHCHECK --interval=60s --start-period=5s CMD source /backend/healthcheck.sh

EXPOSE 5555

CMD ["gunicorn", "api:api", "-b", "0.0.0.0:5555"]
