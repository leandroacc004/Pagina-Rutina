import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Debe coincidir con el nombre de tu repositorio de GitHub para que
  // GitHub Pages sirva los archivos desde la ruta correcta.
  base: '/Pagina-Rutina/',
  plugins: [react(), tailwindcss()],
})
