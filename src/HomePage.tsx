import Layout from './components/Layout'
import Resume from './Resume'
import { DEMO_NO_PHOTO, DEMO_WITH_PHOTO } from './DemoPage'

export default function HomePage() {
  return (
    <Layout>
      <div style={{
        maxWidth: 720, margin: '0 auto', padding: '48px 24px',
        textAlign: 'center', fontFamily: 'inherit',
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
          CV-Maker
        </h1>
        <p style={{ fontSize: 16, color: '#334155', lineHeight: 1.8, marginBottom: 8, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          A clean, professional CV/Resume maker for Chinese university students applying for tech internships and campus recruitment.
        </p>
        <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 32 }}>
          面向中国高校学生的互联网技术岗校招与实习求职，<br />
          可视化编辑、实时预览、一键导出 PDF，数据纯本地存储。
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/editor" style={{
            padding: '10px 28px', fontSize: 14, fontWeight: 600,
            background: '#1a365d', color: '#fff', borderRadius: 8,
            textDecoration: 'none', display: 'inline-block',
          }}>
            开始制作
          </a>
          <a href="#demos" onClick={(e) => {
            e.preventDefault()
            document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })
          }} style={{
            padding: '10px 28px', fontSize: 14, fontWeight: 500,
            background: '#fff', color: '#1a365d', borderRadius: 8,
            textDecoration: 'none', border: '1px solid #cbd5e0',
            display: 'inline-block',
          }}>
            查看示例
          </a>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16, marginTop: 48, textAlign: 'left',
        }}>
          {[
            { title: '可视化编辑', desc: '表单填写 + 实时预览，无需写 YAML 或代码' },
            { title: '多项目管理', desc: '侧边栏管理多个简历项目，一键复制、切换' },
            { title: '本地存储', desc: '数据保存在浏览器 localStorage，不上传服务器' },
            { title: 'PDF 导出', desc: '浏览器打印直接输出 A4 格式 PDF' },
            { title: '图标支持', desc: '内置 Lucide 图标 + 自定义上传' },
            { title: 'Markdown', desc: '经历描述支持粗体、斜体、下划线、行内代码' },
          ].map((f) => (
            <div key={f.title} style={{
              padding: 16, background: '#fff', borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{f.title}</h3>
              <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Demo samples */}
        <div id="demos" style={{ marginTop: 48, textAlign: 'left' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', textAlign: 'center', marginBottom: 20, width: '100%' }}>
            效果展示
          </h2>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>无照片</span>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <Resume data={DEMO_NO_PHOTO} settings={{ color_scheme: 'navy', language: 'zh' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>有照片</span>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <Resume data={DEMO_WITH_PHOTO} settings={{ color_scheme: 'navy', language: 'zh' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <hr style={{ marginTop: 48, border: 'none', borderTop: '1px solid #cbd5e0' }} />
        <div style={{
          padding: '24px 48px 36px',
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: 48,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
              Released under the MIT License.
            </p>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
              Copyright &copy; 2026 <a href="https://github.com/lEEExp3rt" target="_blank" rel="noopener"
                style={{ color: '#64748b', textDecoration: 'none' }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#1a365d' }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = '#64748b' }}
              >!EEExp3rt</a>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>Powered by</span>
            {[
              { src: 'icons/react.svg', alt: 'React', href: 'https://react.dev' },
              { src: 'icons/typescript.svg', alt: 'TypeScript', href: 'https://www.typescriptlang.org' },
              { src: 'icons/vite.svg', alt: 'Vite', href: 'https://vite.dev' },
              { src: 'icons/github.svg', alt: 'GitHub Pages', href: 'https://pages.github.com' },
              { src: 'icons/lucide.svg', alt: 'Lucide', href: 'https://lucide.dev' },
            ].map(({ src, alt, href }) => (
              <a key={alt} href={href} target="_blank" rel="noopener" title={alt}
                style={{ display: 'flex', alignItems: 'center', opacity: 0.7, transition: 'opacity 0.15s' }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.opacity = '1' }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.opacity = '0.7' }}
              >
                <img src={src} alt={alt} width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
