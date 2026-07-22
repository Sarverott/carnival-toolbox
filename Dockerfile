
FROM alpine:3.17
RUN apk add nodejs>20.11.0 npm>9.1.0 py3-pip>22.3.0 --no-cache
COPY ./conf /conf
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"
COPY ./package.json /package.json
COPY ./LICENSE /LICENSE
RUN npm install
WORKDIR /venv
RUN pip install --upgrade pip
RUN pip install -r /conf/requirements.txt
COPY ./app /app
COPY ./conf/repositories /etc/apk/repositories
WORKDIR /app
