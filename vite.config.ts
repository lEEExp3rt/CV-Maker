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

  const cvPath = path.resolve(__dirname, 'contents/cv.yaml')
  const cvPathYml = path.resolve(__dirname, 'contents/cv.yml')
  const settingsPath = path.resolve(__dirname, 'contents/settings.yaml')
  const settingsPathYml = path.resolve(__dirname, 'contents/settings.yml')

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
    const cvRaw = readYamlFile(cvPath, cvPathYml) || 'personal_info:\n  name: "Your Name"\n  email: ""\n  phone: ""\neducation: []\ninternship: []\nprojects: []'
    const settingsRaw = readYamlFile(settingsPath, settingsPathYml) || 'color_scheme: navy'

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
      const watchFiles = [cvPath, cvPathYml, settingsPath, settingsPathYml]
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
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
