import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    'process.env.VITE_API_KEY' : JSON.stringify(process.env.VITE_API_KEY),
            
    'process.env.VITE_AUTH_DOMAIN'         : JSON.stringify(process.env.VITE_AUTH_DOMAIN),
    'process.env.VITE_PROJECT_ID'          :JSON.stringify(process.env.VITE_PROJECT_ID),
    'process.env.VITE_STORAGE_BUCKET'      :JSON.stringify(process.env.VITE_STORAGE_BUCKET),
    'process.env.VITE_MESSAGE_SENDER_ID'   :JSON.stringify(process.env.VITE_MESSAGE_SENDER_ID),
    'process.env.VITE_APP_ID'              :JSON.stringify(process.env.VITE_APP_ID),
    'process.env.VITE_MEASUREMENT_ID'      :JSON.stringify(process.env.VITE_MEASUREMENT_ID)   
  }
})
