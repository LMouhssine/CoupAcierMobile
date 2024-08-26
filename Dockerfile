# Utilise une image de Node.js comme base
FROM node:16

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier package.json et le fichier package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers du projet
COPY . .

# Expose le port 8081, utilisé par React Native
EXPOSE 8081

# Commande par défaut pour démarrer le projet
CMD ["npm", "start"]
