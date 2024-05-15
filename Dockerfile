FROM node:18
WORKDIR /app
COPY . /app
RUN npm install
ENV PORT 3333
EXPOSE 3333
CMD ["npm", "dev"]
