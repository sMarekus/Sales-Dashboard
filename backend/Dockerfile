FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install pg --save
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
