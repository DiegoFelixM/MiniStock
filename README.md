# Mini Stock

Sistema básico de inventario desarrollado con React, Node.js, Express, MySQL y Docker.

---

# Descripción

Mini Stock permite administrar productos mediante operaciones CRUD:

* Listar productos
* Obtener producto por ID
* Crear productos
* Editar productos
* Eliminar productos
* Mostrar mensajes de éxito al realizar operaciones

El proyecto está dividido en frontend, backend y base de datos, ejecutándose mediante Docker Compose.

---

# Tecnologías

* React + Vite
* Node.js
* Express
* MySQL
* Docker
* Docker Compose
* Git / GitHub

---

# Estructura

```txt
mini_stock/
├── backend/
├── frontend/
├── db/
├── docker-compose.yml
└── README.md
```

---

# Endpoints

| Método | Ruta               | Descripción                 |
| ------ | ------------------ | --------------------------- |
| GET    | /api/productos     | Obtener todos los productos |
| GET    | /api/productos/:id | Obtener producto por ID     |
| POST   | /api/productos     | Crear producto              |
| PUT    | /api/productos/:id | Actualizar producto         |
| DELETE | /api/productos/:id | Eliminar producto           |
| GET    | /health            | Validar estado del backend  |

---

# Base de datos

Base de datos:

```txt
mini_stock
```

Tabla:

```txt
productos
```

Campos:

| Campo     | Tipo                           |
| --------- | ------------------------------ |
| id        | INT AUTO_INCREMENT PRIMARY KEY |
| nombre    | VARCHAR(100)                   |
| categoria | VARCHAR(100)                   |
| stock     | INT                            |
| precio    | DECIMAL(10,2)                  |
| creado_en | TIMESTAMP                      |

---

# Variables de entorno

## Backend

Archivo:

```txt
backend/.env
```

```env
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=mini_stock
PORT=3000
```

---

## Frontend local

Archivo:

```txt
frontend/.env
```

```env
REACT_APP_API_URL=http://localhost:3000/api/productos
```

---

## Frontend producción

```env
REACT_APP_API_URL=http://18.224.182.212:3000/api/productos
```

---

# Ejecutar localmente

```bash
docker compose up -d --build
```

Frontend:

```txt
http://localhost:8080
```

Backend:

```txt
http://localhost:3000
```

API:

```txt
http://localhost:3000/api/productos
```

---

# Ejecutar en servidor remoto

Conectarse por SSH:

```bash
ssh -i llave.pem ubuntu@18.224.182.212
```

Clonar repositorio:

```bash
git clone URL_DEL_REPO
cd mini_stock
```

Levantar contenedores:

```bash
sudo docker compose up -d --build
```

Verificar contenedores:

```bash
sudo docker ps
```

---

# Puertos

| Puerto | Servicio |
| ------ | -------- |
| 22     | SSH      |
| 80     | HTTP     |
| 443    | HTTPS    |
| 3000   | Backend  |
| 8080   | Frontend |

---

# Ramas

| Rama    | Uso               |
| ------- | ----------------- |
| develop | Desarrollo/local  |
| main    | Producción/remoto |

---

# Comandos útiles

```bash
docker ps
docker ps -a
docker logs contenedor_backend
docker logs contenedor_frontend
docker logs contenedor_db
docker compose down
docker compose up -d --build
```

Servidor remoto:

```bash
sudo docker ps
sudo docker logs contenedor_backend
sudo docker compose up -d
```
