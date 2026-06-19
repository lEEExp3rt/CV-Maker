import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'

// ============================================================
// Custom Vite Plugin: YAML Virtual Modules with HMR
// ============================================================
function yamlVirtualPlugin(): Plugin {
  const virtualModuleId = 'virtual:cv-data'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const cvPath = path.resolve(__dirname, 'contents/cv.yml')
  const cvPathYaml = path.resolve(__dirname, 'contents/cv.yaml')
  const settingsPath = path.resolve(__dirname, 'contents/settings.yml')
  const settingsPathYaml = path.resolve(__dirname, 'contents/settings.yaml')

  function readYamlFile(preferPath: string, fallbackPath: string): string {
    if (fs.existsSync(preferPath)) {
      return fs.readFileSync(preferPath, 'utf-8')
    }
    if (fs.existsSync(fallbackPath)) {
      return fs.readFileSync(fallbackPath, 'utf-8')
    }
    return ''
  }

  function buildModule(): string {
    const cvRaw = readYamlFile(cvPath, cvPathYaml) || 'personal_info:\n  name: "Your Name"\n  email: ""\n  phone: ""\neducations: []\ninternships: []\nprojects: []'
    const settingsRaw = readYamlFile(settingsPath, settingsPathYaml) || 'color_scheme: navy'

    let cvData: unknown
    let settingsData: unknown
    try {
      cvData = yaml.load(cvRaw)
    } catch { cvData = {} }
    try {
      settingsData = yaml.load(settingsRaw)
    } catch { settingsData = {} }

    return `
export const resumeData = ${JSON.stringify(cvData)};
export const settings = ${JSON.stringify(settingsData)};
`
  }

  return {
    name: 'yaml-virtual',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return buildModule()
      }
    },
    configureServer(server) {
      // Watch YAML files and trigger HMR on change
      const watchFiles = [cvPath, cvPathYaml, settingsPath, settingsPathYaml]
      for (const f of watchFiles) {
        server.watcher.add(f)
      }
      server.watcher.on('change', (filePath) => {
        if (watchFiles.includes(filePath)) {
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
          if (mod) {
            server.moduleGraph.invalidateModule(mod)
            server.ws.send({
              type: 'update',
              updates: [
                {
                  type: 'js-update',
                  path: resolvedVirtualModuleId,
                  acceptedPath: resolvedVirtualModuleId,
                  timestamp: Date.now(),
                },
              ],
            })
          }
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [yamlVirtualPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@contents': path.resolve(__dirname, './contents'),
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
