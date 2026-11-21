import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' => الموقع يشتغل من أي مجلد أو دومين فرعي
export default defineConfig({ base: './', plugins: [react()] });
