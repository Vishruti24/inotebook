FROM node:18

WORKDIR /app

# Fix SSL issue
RUN npm config set strict-ssl false

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
