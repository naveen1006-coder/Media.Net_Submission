import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/Media.Net_Submission/',
    define: {
        'process.env.MOCK_MODE': JSON.stringify(process.env.MOCK_MODE || 'true')
    }
})
