# Laboration 4 – Backend

Backend-API utvecklat med Node.js, Express och MongoDB Atlas som en del av Laboration 4 i kursen Backend-baserad webbutveckling vid Mittuniversitetet.

## Beskrivning

API:et hanterar registrering och inloggning av användare samt skyddade anteckningar. Autentisering sker med JSON Web Token (JWT).

Användarnas lösenord hashats med bcrypt innan de lagras i databasen.

## Tekniker

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- dotenv

## Installation

1. Klona projektet från GitHub.
2. Installera beroenden:

   `npm install`

3. Skapa en `.env`-fil i projektets rotmapp med följande miljövariabler:

   ```env
   MONGODB_URI=din_mongodb_anslutningsstrang
   JWT_SECRET=din_hemliga_nyckel
   PORT=3001
   ```

4. Starta servern:

   `node server.js`

## API-endpoints

### Registrera användare

**POST `/api/register`**

Skapar ett nytt användarkonto.

Exempel på JSON-data:

```json
{
  "username": "testuser",
  "password": "mittlosenord123"
}
```

Vid lyckad registrering returneras statuskod `201`.

### Logga in

**POST `/api/login`**

Kontrollerar användarnamn och lösenord och returnerar en JWT-token vid lyckad inloggning.

Exempel på JSON-data:

```json
{
  "username": "testuser",
  "password": "mittlosenord123"
}
```

JWT-token används för att komma åt skyddade endpoints.

### Hämta anteckningar

**GET `/api/notes`**

Hämtar anteckningar som tillhör den inloggade användaren.

Kräver JWT-token i HTTP-headern:

`Authorization: Bearer DIN_TOKEN`

### Skapa anteckning

**POST `/api/notes`**

Skapar en ny anteckning för den inloggade användaren.

Kräver JWT-token i HTTP-headern.

Exempel på JSON-data:

```json
{
  "title": "Min anteckning",
  "content": "Det här är innehållet i anteckningen."
}
```

Vid lyckat anrop returneras statuskod `201`.

## Säkerhet

- Lösenord lagras hashade med bcrypt.
- JWT används för autentisering.
- Middleware kontrollerar JWT innan skyddade endpoints kan användas.
- Användare kan endast hämta sina egna anteckningar.
- Anteckningar kopplas till användaren via ID från den verifierade JWT-token.
- Hemliga miljövariabler lagras i `.env`, som inte ska publiceras på GitHub.

## Statuskoder

| Statuskod | Betydelse |
|---|---|
| 200 | Begäran lyckades |
| 201 | Resurs skapades |
| 400 | Ogiltiga inmatningsuppgifter |
| 401 | Inloggning misslyckades eller token saknas |
| 403 | Ogiltig eller utgången token |
| 409 | Användarnamnet är upptaget |
| 500 | Serverfel |

## Testning

API:et har testats lokalt med PowerShell. Registrering, inloggning, JWT-verifiering samt skapande och hämtning av anteckningar har kontrollerats.

## Publicering

Information om den publicerade backend-adressen läggs till efter driftsättning.

## Kurs

Backend-baserad webbutveckling - Laboration 4, uppgift 1.

## Skapad av 

Emma Ågren student MIUN