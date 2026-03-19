# 🚀 Task & Project Management API

Backend API для управления задачами и проектами с поддержкой подзадач, тегов, дедлайнов, комментариев и геолокации.

---

## 🎯 Purpose

Этот проект разработан как тестовое задание для демонстрации навыков backend-разработки с использованием Nest.js и MongoDB.

---

## ✨ Features

- JWT Authentication
- Task & Project CRUD
- Nested tasks (subtasks)
- Tags & deadlines
- Comments system
- Geo-based search
- Full-text search (MongoDB)
- Aggregation statistics

---

## 🧰 Технологический стек

- **Nest.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT**
- **class-validator**
- **Swagger**
- **Jest (optional)**

---

## 📌 Основной функционал

### 👤 Users

- Registration
- Login (JWT)
- Get profile
- Update profile
- Delete account

---

### 📋 Tasks

- Create task
- Update task
- Delete task
- Get all tasks
- Get single task
- Filtering & sorting

---

### 📁 Projects

- Create project
- Update project
- Delete project
- Manage members

---

### 💬 Comments

- Add comment to task
- Get task comments

---

## ⚡ Расширенные функции

- Подзадачи (`parentTaskId`)
- Теги (`tags`)
- Дедлайны (`deadline`)
- Комментарии
- Геолокация (`location.coordinates`)

---

## 🧠 MongoDB возможности

### 🔍 Текстовый поиск

```
GET /tasks/search?q=keyword
```

### 📍 Геопоиск

```
GET /tasks/nearby?lng=30&lat=50
```

### 📊 Агрегация

```
GET /tasks/stats
```

---

## 🔐 Authentication

Используется JWT.

### 📌 Flow:

1. `POST /auth/register`
2. `POST /auth/login`
3. Использовать токен:

```
Authorization: Bearer <token>
```

---

## 📡 API Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Users

- `GET /users/me`
- `PATCH /users/me`
- `DELETE /users/me`
- `GET /users`
- `GET /users/:id`

### Tasks

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`
- `GET /tasks/search`
- `GET /tasks/nearby`
- `GET /tasks/stats`

### Comments

- `GET /tasks/:id/comments`
- `POST /tasks/:id/comments`

### Projects

- `POST /projects`
- `GET /projects`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `DELETE /projects/:id`

---

## 📬 Пример запроса

### Создание задачи

```
POST /tasks
```

```json
{
  "title": "Test task",
  "description": "Task description",
  "status": "todo",
  "tags": ["backend", "test"]
}
```

---

## ⚙️ Installation & Run

### 1. Clone repository

```bash
git clone https://github.com/PenitentOne-2005/KIT-GLOBAL.git
cd KIT-GLOBAL
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Environment variables

Создайте `.env` файл:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 📄 Example `.env`

Скопируйте `.env.example` в `.env`:

```env
PORT=3000
MONGO_URI=
JWT_SECRET=
```

> ⚠️ Не добавляйте реальные значения в репозиторий
> ⚠️ Убедитесь, что MongoDB запущен локально или используйте MongoDB Atlas

---

### 💡 MongoDB Atlas пример

```
mongodb+srv://username:password@cluster.mongodb.net/dbname
```

---

### 4. Run app

#### Development

```bash
npm run start:dev
```

#### Production

```bash
npm run build
npm run start:prod
```

---

## 📑 Swagger Documentation

Swagger доступен по адресу:

```
http://localhost:3000/api-docs
```

Для работы с защищёнными эндпоинтами нажмите **Authorize** и вставьте JWT токен:

```
Bearer <your_token>
```

---

## 🗂 Project Structure

```
src/
├── auth/
├── users/
├── tasks/
├── projects/
├── comments/
├── app.module.ts
├── main.ts
```

---

## 🧪 Testing

```bash
npm run test
```

---

## ⚠️ Error Handling

Используются стандартные HTTP статусы:

- 400 — Bad Request
- 401 — Unauthorized
- 404 — Not Found
- 500 — Internal Server Error

---

## 🧱 Database Design

### User

- email
- password
- name

### Task

- title
- description
- status
- assigneeId
- parentTaskId
- tags
- deadline
- location (GeoJSON)

### Project

- name
- description
- members

### Comment

- text
- taskId
- userId

---

## 🌍 Geo Example

```json
{
  "location": {
    "type": "Point",
    "coordinates": [30.5, 50.4]
  }
}
```

---

## 📦 Deployment

### Local

```bash
npm install
npm run build
npm run start:prod
```

### Production

- Node.js server
- MongoDB Atlas
- Environment variables configured

---

## 📌 Additional

✔ Optimized MongoDB schema
✔ REST API
✔ Swagger documentation
✔ JWT security

---

## 👨‍💻 Author

Backend test project (Nest.js)
