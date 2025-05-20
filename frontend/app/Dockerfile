
# Usa una imagen Node oficial
FROM node:20

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo lo demás
COPY . .

# Compila la app
RUN npm run build

# Puerto expuesto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
