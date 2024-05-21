FROM node:18
WORKDIR /app
COPY . /app
RUN yarn install
ENV PORT 3333
EXPOSE 3333
CMD ["yarn", "dev"]
