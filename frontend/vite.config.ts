/**
 * @file vite.config.ts
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description Vite build configuration. Enables the React plugin for
 *              JSX/TSX transformation and Fast Refresh during development.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
