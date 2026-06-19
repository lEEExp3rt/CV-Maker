// ============================================================
// CV-Maker — PDF Export Script
//
// Usage: npm run export
// Prerequisite: npm run build (included in npm run export)
//
// Spins up a Vite preview server, uses headless Puppeteer
// to render the resume page, and saves it as a PDF.
// ============================================================

import { createServer } from 'vite'
import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const outputPath = path.join(distDir, 'resume.pdf')

async function main() {
  console.log('🚀 Starting PDF export...')

  // Ensure dist exists
  fs.mkdirSync(distDir, { recursive: true })

  // Start Vite preview server (auto-find available port)
  let previewPort = 4173
  let previewServer

  while (!previewServer) {
    try {
      const server = await createServer({
        root: distDir,
        mode: 'production',
        server: { port: previewPort, host: '127.0.0.1', strictPort: true },
        preview: {
          port: previewPort,
          host: '127.0.0.1',
        },
      })
      await server.listen()
      previewServer = server
    } catch {
      previewPort++
      if (previewPort > 4183) throw new Error('No available port found (tried 4173–4183)')
    }
  }

  console.log(`  Preview server started on port ${previewPort}`)

  const url = `http://127.0.0.1:${previewPort}?print=true`

  let browser
  try {
    // Launch headless browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })

    const page = await browser.newPage()

    // Set viewport to A4 at 96 DPI
    await page.setViewport({
      width: 794, // 210mm at 96dpi
      height: 1123, // 297mm at 96dpi
      deviceScaleFactor: 1,
    })

    console.log('  Navigating to resume page...')
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

    // Small delay for fonts to load
    await new Promise((r) => setTimeout(r, 500))

    console.log('  Generating PDF...')
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
    })

    console.log(`✅ PDF exported to: ${path.relative(rootDir, outputPath)}`)
  } catch (err) {
    console.error('❌ PDF export failed:', err.message)
    process.exitCode = 1
  } finally {
    if (browser) await browser.close()
    await previewServer.close()
    console.log('  Cleaned up.')
  }
}

main()
