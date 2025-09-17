# RedSocial — Instrucciones para demo de clase

Proyecto de red social (Node + Express + MongoDB + Vite frontend).

Objetivo de la entrega

- Tener funcionando en clase dos endpoints principales:
  - POST /api/user/register  → registrar usuarios
  - POST /api/user/login     → autenticar usuarios (devuelve token)
- Contar con frontend mínimo para registrar y autenticarse (ya integrado en `src/auth/login/login.html`).

Requisitos previos (local)

- Node.js v16+ y npm instalados.
- MongoDB corriendo localmente (o una instancia accesible). Por defecto el proyecto usa la URI:
  - `mongodb://localhost:27017/redsocial`

Archivos clave

- Backend:
  - `index.js` — servidor Express (monta rutas y arranca en puerto 3900)
  - `database/routes/user.js` — define `/register` y `/login`
  - `database/controllers/user.js` — lógica de registro/login
  - `database/models/user.js` — esquema de usuario (name, surname, nick, email, password, role, image)
  - `database/services/jwt.js` — genera tokens JWT
  - `database/connection.js` — conexión a MongoDB

- Frontend (UI mínima lista):
  - `src/auth/login/login.html` — página unificada (login + register con flip)
  - `src/auth/login/login.css` — estilos
  - `src/auth/login/login.js` — lógica (fetch a `/api/user/register` y `/api/user/login`)

Scripts útiles (npm)

- `npm run start`   — arranca solo el backend (nodemon index.js)
- `npm run dev`     — arranca solo el frontend (vite)
- `npm run dev:all` — arranca backend + frontend en paralelo (recomendado para demo)
- `npm run build`   — build del frontend

Cómo preparar la demo (pasos para clase)

1) Asegurarse de que MongoDB esté corriendo

En Windows PowerShell, si MongoDB está instalado como servicio:

```powershell
net start MongoDB
```

Si usas `mongod` manualmente, inicia la terminal y ejecuta:

```powershell
mongod --dbpath "C:\ruta\a\tu\data\db"
```

2) Instalar dependencias (si aún no están)

```powershell
npm install
```

3) Arrancar backend + frontend (en una sola terminal)

```powershell
npm run dev:all
```

- Backend: correrá en `http://localhost:3900`.
- Frontend (Vite): te mostrará el puerto (por ejemplo `http://localhost:5173`).

Si `dev:all` falla por cualquier razón, arranca por separado:

Terminal A:
```powershell
npm run start
```
Terminal B:
```powershell
npm run dev
```

4) Probar endpoints sin UI (opcional, útil para verificar backend rápido)

Registrar (ejemplo con curl en PowerShell):

```powershell
curl -Method POST -Uri http://localhost:3900/api/user/register -ContentType 'application/json' -Body '{"name":"Prueba","surname":"Usuario","nick":"prueba","email":"prueba@example.com","password":"123456"}'
```

Login:

```powershell
curl -Method POST -Uri http://localhost:3900/api/user/login -ContentType 'application/json' -Body '{"email":"prueba@example.com","password":"123456"}'
```

- Si obtienes respuesta 2xx y un campo `token`, el backend funciona.

5) Probar desde el frontend

- Abre la URL que devuelve Vite (ej. `http://localhost:5173`) y navega a la página de autenticación (el archivo está en `src/auth/login/login.html`).
- Usa los formularios: Crear cuenta → luego Entrar. El frontend almacenará el `token` en `localStorage` si el login es exitoso.

Comprobaciones importantes antes de la demo

- Asegúrate de que la variable de entorno `JWT_SECRET` esté configurada (opcional, por seguridad). Si no, el proyecto usa un secreto por defecto `secreto_super_seguro`.
- Verifica que no haya puertos en conflicto (3900). Si el puerto está ocupado, cambia `index.js` o libera el puerto.
- Si tu red bloquea CDNs, el proyecto ahora usa SVG inline para iconos; no deberías tener problemas de iconos.

Pruebas automáticas (opcional)

Puedo añadir pruebas con `jest` + `supertest` para cubrir registro y login en 10–20 minutos. Dime si quieres que lo añada y lo diseccione en PR.

Qué puedo hacer ahora (elige una)

- Intentar arrancar `npm run dev:all` aquí y depurar cualquier error que aparezca (ejecutaré en la workspace y te traeré los logs). Necesito tu OK para ejecutar.
- Añadir un README más extenso que incluya pasos de despliegue en producción (PM2, variables de entorno, Mongo Atlas).
- Añadir pruebas automatizadas para register/login.

---

Si quieres, arranco `npm run dev:all` ahora y depuro cualquier fallo. ¿Lo ejecuto?