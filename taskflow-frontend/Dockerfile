# Folosește o imagine Node.js pentru a construi frontend-ul
FROM node:22

# Setează directorul de lucru în container
WORKDIR /app

# Copiază toate fișierele frontend-ului în container
COPY . .

# Instalează dependențele și construiește aplicația
RUN npm install && npm run build

# Folosește o imagine de Nginx pentru a servi frontend-ul
FROM nginx:latest
COPY --from=0 /app/dist /usr/share/nginx/html

# Expune portul frontend-ului
EXPOSE 80