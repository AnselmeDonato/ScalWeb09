FROM denoland/deno:alpine-1.37.0

EXPOSE 7777

WORKDIR /todo-api

COPY deps.js .

RUN deno cache deps.js

COPY . .

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "app.js" ]
