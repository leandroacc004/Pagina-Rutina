# Mi Rutina

App personal para administrar pendientes de **Trabajo**, **Universidad** y tu **Rutina diaria**, más una vista **General** con todo junto. Los datos se guardan en la nube (Firestore) y se sincronizan en tiempo real entre tus dispositivos.

## Stack

- React + Vite
- Tailwind CSS
- Firebase Authentication (Google Sign-In)
- Firebase Firestore (base de datos)
- GitHub Pages (hosting, deploy automático vía GitHub Actions)

## 1. Crear el proyecto de Firebase

1. Ve a [console.firebase.google.com](https://console.firebase.google.com) → **Agregar proyecto** → dale un nombre (ej. `mi-rutina`) → puedes desactivar Google Analytics, no lo necesitas.
2. Dentro del proyecto, click en el ícono **`</>`** (Web) para agregar una app web. Dale un nombre y **no** actives Firebase Hosting (usaremos GitHub Pages).
3. Firebase te va a mostrar un bloque `firebaseConfig` con varias claves (`apiKey`, `authDomain`, etc.) — los vas a necesitar en el paso 3.

### Activar el login con Google

- En el menú lateral: **Build → Authentication → Get started**.
- Pestaña **Sign-in method** → habilita **Google** → guarda.

### Activar Firestore

- En el menú lateral: **Build → Firestore Database → Create database**.
- Elige modo **production** y la región más cercana a ti.
- Una vez creada, ve a la pestaña **Reglas** y pega el contenido de [`firestore.rules`](./firestore.rules) de este repo (reemplaza lo que haya). Esto asegura que solo tú puedas leer/escribir tus propias tareas. Publica los cambios.

## 2. Correrlo en tu computadora

```bash
npm install
cp .env.example .env.local
```

Abre `.env.local` y pega ahí las claves del `firebaseConfig` del paso 1 (son públicas, no secretas — la seguridad real la dan las reglas de Firestore).

```bash
npm run dev
```

Abre la URL que te muestre la terminal, inicia sesión con Google y ya puedes usar la app.

## 3. Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser privado o público, ambos funcionan con Pages).
2. Si tu repositorio **no** se llama `cosas-por-hacer`, edita `base` en [`vite.config.js`](./vite.config.js) para que coincida: `base: '/nombre-de-tu-repo/'`.
3. Sube el proyecto:

```bash
git init
git add .
git commit -m "Primera versión de Mi Rutina"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

4. En GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. En **Settings → Secrets and variables → Actions → New repository secret**, crea estos 6 secrets con los valores de tu `.env.local`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
6. El workflow en `.github/workflows/deploy.yml` se dispara solo con cada `push` a `main`. Revisa la pestaña **Actions** de tu repo para ver el progreso; al terminar, tu app queda publicada en `https://TU_USUARIO.github.io/TU_REPO/`.

### Último paso: autorizar el dominio en Firebase

- En Firebase Console: **Authentication → Settings → Authorized domains → Add domain** → agrega `TU_USUARIO.github.io`. Sin esto, el login con Google fallará en producción (en `localhost` sí funciona por defecto).

Cada vez que quieras actualizar la app publicada, solo haz `git push` de nuevo a `main` y el deploy se repite automáticamente.

## Estructura del proyecto

```
src/
  firebase.js              # Configuración e inicialización de Firebase
  contexts/AuthContext.jsx # Estado de sesión (login/logout con Google)
  hooks/useTasks.js        # CRUD de tareas + suscripción en tiempo real a Firestore
  utils/dateHelpers.js     # Lógica de "reinicio diario" de la rutina fija
  components/              # Navbar, formulario de agregar, lista e item de tarea
  pages/                   # Trabajo, Universidad, Rutina, General, Login
```

## Cómo funciona la rutina diaria

Cada ítem de Rutina puede ser:

- **Fijo (↻ se repite cada día)**: lo marcas como hecho hoy, y mañana vuelve a aparecer como pendiente automáticamente (no se borra ni se duplica: se calcula comparando la fecha de hoy contra la última vez que lo completaste).
- **Puntual**: se comporta como Trabajo/Universidad — se marca una vez y desaparece de pendientes para siempre.
