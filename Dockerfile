FROM docker.io/node:18-alpine AS builder

RUN apk add --update \
  git
#  python3 \
#  make \
#  build-base

RUN npm install --global pnpm

#RUN git clone https://github.com/CPlusPatch/web-business.git /app
COPY . /app

RUN cd ./app && pnpm install
RUN cd ./app && pnpm build

FROM docker.io/node:18-alpine

COPY --from=builder /app/.output/ /app
COPY --from=builder /app/templates /templates

CMD ["/app/server/index.mjs"]
