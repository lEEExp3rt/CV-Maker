import Layout from './components/Layout'
import Resume from './Resume'
import type { ResumeData } from './types/resume'
import demoNoPhoto from '../examples/demo-no-photo.json'
import demoWithPhoto from '../examples/demo-with-photo.json'

export const DEMO_NO_PHOTO = ((demoNoPhoto as any).data ?? demoNoPhoto) as unknown as ResumeData
export const DEMO_WITH_PHOTO = ((demoWithPhoto as any).data ?? demoWithPhoto) as unknown as ResumeData

const settings = { color_scheme: 'navy' as const, language: 'zh' as const }

export default function DemoPage() {
  return (
    <Layout>
      <div style={{
        flex: 1, overflow: 'auto', display: 'flex', gap: 24,
        justifyContent: 'center', padding: 24, background: '#e9eef3',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>无照片</span>
          <div style={{
            background: '#fff', borderRadius: 8,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <Resume data={DEMO_NO_PHOTO} settings={settings} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>有照片</span>
          <div style={{
            background: '#fff', borderRadius: 8,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <Resume data={DEMO_WITH_PHOTO} settings={settings} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
