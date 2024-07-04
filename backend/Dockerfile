FROM python:3.8-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y build-essential python3-dev python2.7-dev \
        libldap2-dev libsasl2-dev libssl-dev ldap-utils tox \
        lcov valgrind \
    && apt-get -y install gcc

COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY .env .env

EXPOSE 5000

CMD ["python", "app.py"]