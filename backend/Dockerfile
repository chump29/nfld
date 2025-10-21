FROM python:3.11-alpine

WORKDIR /backend

RUN pip install --upgrade pip
COPY *.py requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["gunicorn", "wsgi:api", "-b", "0.0.0.0:5000", "-w", "4"]
