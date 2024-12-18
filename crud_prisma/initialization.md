## 1. Initialisation
In the project directory: `npm init -y`.

## 2. Installation des dépendances
`npm i @prisma/client express`\
`npm i -D nodemon prisma` (environnement de développement)

## 3. Initialisation de prisma
`npx prisma init`

Création du fichier `schema.prisma` dans le dossier `prisma/` :
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model ...
```

## 4. Variables d'environnement
Variables d'environnement (`DATABASE_URL`) dans le fichier `.env`.

## 5. Génération du client prisma
`npx prisma generate`

## 6. Migration du schéma
`npx prisma migrate dev --name init`

## 7. Prisma studio : UI pour visualiser les résultats
`npx prisma studio`