
# 📘 Documentation API - CRUD Système de Gestion Restaurant

## 📌 Introduction

Bienvenue dans la documentation officielle de l'API REST du système de gestion de restaurant. Cette API permet aux développeurs frontend de se connecter et d'interagir avec les ressources du backend : **administrateurs**, **clients**, **restaurants**, **plats**, **catégories**, **commandes**, **livraisons**, et **livreurs**.

> ✅ **Base URL :**
```
http://localhost:3000/api/v1
```

---

## ⚙️ Pré-requis

Pour utiliser cette API, vous aurez besoin de :

- Un outil pour effectuer des requêtes HTTP : Axios, Fetch API, Postman, etc.
- Une application frontend (React, Vue, Angular, etc.)
- Le serveur backend lancé sur `localhost:3000`

---

## 🔐 Headers requis

Aucune authentification n’est nécessaire pour la version actuelle.

Utilisez ces headers :
```http
Content-Type: application/json
Accept: application/json
```

---

## 📂 Ressources disponibles

Voici la liste des routes disponibles et comment les consommer :

---

## 1️⃣ **Administrateurs**

| Méthode | Endpoint                         | Description                          |
|--------|----------------------------------|--------------------------------------|
| GET    | `/administrateurs`              | Récupère tous les administrateurs    |
| GET    | `/administrateurs/:id`          | Récupère un administrateur par ID    |
| POST   | `/administrateurs`              | Crée un nouvel administrateur        |
| PUT    | `/administrateurs/:id`          | Met à jour un administrateur         |
| DELETE | `/administrateurs/:id`          | Supprime un administrateur           |

### 📥 Exemple de création (POST)
```js
fetch('http://localhost:3000/api/v1/administrateurs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nom: 'Doe',
    prenom: 'John',
    email: 'john.doe@example.com'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 2️⃣ **Clients**

Même structure que les administrateurs :

- `GET /clients`
- `GET /clients/:id`
- `POST /clients`
- `PUT /clients/:id`
- `DELETE /clients/:id`

---

## 3️⃣ **Restaurants**, **Catégories**, **Plats**, **Livreurs**, **Commandes**, **Livraisons**

Toutes ces ressources suivent le même schéma CRUD :

```js
GET     /[ressource]
GET     /[ressource]/:id
POST    /[ressource]
PUT     /[ressource]/:id
DELETE  /[ressource]/:id
```

> Remplacez `[ressource]` par : `restaurants`, `categories`, `plats`, `livreurs`, `commandes`, ou `livraisons`.

---

## 🔄 Exemple général avec Axios

```js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

export const fetchPlats = async () => {
  const response = await axios.get(`${BASE_URL}/plats`);
  return response.data;
};

export const createClient = async (clientData) => {
  const response = await axios.post(`${BASE_URL}/clients`, clientData);
  return response.data;
};
```

---

## 💥 Gestion des erreurs

Les erreurs sont renvoyées sous forme d'objet :
```json
{
  "message": "Erreur serveur lors de la récupération"
}
```

Codes possibles :

- `200` : OK
- `201` : Créé
- `400` : Mauvaise requête
- `404` : Ressource non trouvée
- `409` : Conflit (ex: doublon email)
- `500` : Erreur serveur

---

## 🧪 Tester les endpoints avec Postman

- Importez les routes
- Utilisez la méthode HTTP correspondante
- Configurez les paramètres `body` ou `URL` selon besoin
- Regardez les réponses et erreurs

---

## 📎 Conseils pour le frontend

- Centralisez la base URL dans un fichier de config
- Gérez les erreurs avec `try/catch`
- Affichez des messages utilisateur selon les réponses
- Ajoutez des spinners lors des appels API
- Utilisez React Query ou SWR pour améliorer l'expérience

---

## ✅ À venir

- Authentification JWT
- Pagination & recherche
- Rôles et autorisations
- Documentation Swagger
