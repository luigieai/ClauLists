FROM node:14-alpine
#Vamos definir uma pasta de execuçao dentro do container
WORKDIR /usr/src/app
#Primeiro, instalar as dependencias do projeto
COPY package*.json ./
RUN npm install
#Agora vamos copiar o app em si para a imagem
COPY . .
#Vamos dar build no app
RUN npm run build
CMD node dist/main
