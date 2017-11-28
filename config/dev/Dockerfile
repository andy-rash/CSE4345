FROM alpine:latest
ENV LANG=en_US.UTF-8

RUN apk add --update --no-cache g++ gcc libxml2-dev libxslt-dev && \
    apk add --update --no-cache musl-dev python3-dev bash && \
    apk add --update --no-cache libffi-dev libgcc openssl-dev && \
    apk add --update --no-cache jpeg-dev zlib-dev freetype-dev && \
    apk add --update --no-cache lcms2-dev openjpeg-dev tiff-dev && \
    apk add --update --no-cache tk-dev tcl-dev shadow && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache

RUN pip install pipenv
RUN echo "#/usr/bin/env bash" >> /entrypoint.sh && \
    echo "source /app/.local/share/virtualenvs/app/bin/activate" >> /entrypoint.sh && \
    echo 'exec "$@"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

RUN groupadd --gid 1001 app
RUN useradd --uid 1001 --gid app --home /app app
RUN mkdir /app && \
    chown app.app app
USER app
WORKDIR /app/app
COPY Pipfile /app/Pipfile
RUN pipenv install

CMD ["pipenv", "shell", "&&", "gunicorn", "-b", "0.0.0.0:8000", "-w", "4", "tagger:app"]
