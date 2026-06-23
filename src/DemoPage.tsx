import Layout from './components/Layout'
import Resume from './Resume'
import type { ResumeData } from './types/resume'

export const DEMO_NO_PHOTO: ResumeData = {
  personal_info: {
    name: '张三',
    photo: '',
    contact: {
      email: 'zhangsan@zju.edu.cn',
      phone: '+86-138-0000-0000',
      socials: [
        { icon: 'global-line', url: 'https://zhangsan.dev', label: '个人主页' },
        { icon: 'github-line', url: 'https://github.com/zhangsan', label: 'GitHub' },
      ],
    },
  },
  educations: [
    {
      school: '浙江大学',
      school_en: 'Zhejiang University',
      degree: '本科',
      major: '计算机科学与技术',
      start: '2022-09',
      end: '2026-06',
      gpa: '3.9/4.0',
      ranking: '3/120',
      courses: ['数据结构', '操作系统', '计算机网络', '数据库系统', '算法设计与分析'],
    },
    {
      school: '新加坡国立大学',
      school_en: 'National University of Singapore',
      degree: '交换生',
      major: '计算机科学',
      start: '2024-08',
      end: '2025-01',
      gpa: '4.5/5.0',
      courses: ['机器学习', '分布式系统'],
    },
  ],
  internships: [
    {
      company: '阿里巴巴',
      company_en: 'Alibaba Group',
      department: '淘宝技术部',
      role: '后端开发实习生',
      brief: '参与**淘宝核心推荐系统**后端研发，负责`Go`微服务开发与性能优化',
      start: '2025-06',
      end: '2025-09',
      details: [
        '使用`Go`实现高并发接口，QPS达到**10K+**',
        '优化商品召回链路，平均响应时间降低*35%*',
        '编写单元测试与集成测试用例100+，覆盖率__90%__',
      ],
    },
    {
      company: '腾讯',
      department: '微信事业群',
      role: '软件开发实习生',
      brief: '参与**微信支付**核心系统研发，负责`C++`高性能组件开发',
      start: '2024-06',
      end: '2024-09',
      details: [
        '参与微信支付交易系统开发，支撑日均**10亿+**交易量',
        '设计并实现分布式限流组件，保障突发流量下系统稳定',
      ],
    },
  ],
  projects: [
    {
      name: '分布式KV存储引擎',
      name_en: 'Distributed KV Store',
      url: 'https://github.com/zhangsan/kv-store',
      brief: '基于**Raft**协议实现高可用分布式键值存储系统',
      start: '2023-10',
      end: '2024-01',
      details: [
        '基于Raft一致性协议实现多副本强一致性读写',
        'LSM-Tree存储结构，写入吞吐50K ops/s',
        '集成Prometheus监控，关键指标可视化',
      ],
    },
    {
      name: 'MiniSQL 数据库',
      brief: '从零实现支持基本SQL查询的轻量级关系型数据库',
      start: '2023-03',
      end: '2023-06',
      details: [
        '实现SQL解析器、查询优化器和执行引擎',
        '基于B+树实现索引模块，查询性能提升*300%*',
        '实现基于WAL的崩溃恢复机制，保证数据一致性',
      ],
    },
  ],
  skills: [
    { category: '编程语言', items: ['Go', 'Python', 'TypeScript', 'Java', 'C++'] },
    { category: '框架与工具', items: ['React', 'Docker', 'Kubernetes', 'Git'] },
    { category: '数据库', items: ['MySQL', 'Redis', 'Kafka'] },
  ],
  awards: [
    { name: 'ACM-ICPC 亚洲区域赛 银牌', date: '2022' },
    { name: '国家奖学金', date: '2021' },
  ],
}

// Second demo — same data but with photo
export const DEMO_WITH_PHOTO: ResumeData = {
  ...DEMO_NO_PHOTO,
  personal_info: {
    ...DEMO_NO_PHOTO.personal_info,
    photo: 'images/user.svg',
  },
}

const settings = { color_scheme: 'navy' as const, language: 'zh' as const }

export default function DemoPage() {
  return (
    <Layout>
      <div style={{
        flex: 1, overflow: 'auto', display: 'flex', gap: 24,
        justifyContent: 'center', padding: 24, background: '#e9eef3',
        flexWrap: 'wrap',
      }}>
        {/* Without photo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>无照片</span>
          <div style={{
            background: '#fff', borderRadius: 8,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <Resume data={DEMO_NO_PHOTO} settings={settings} />
          </div>
        </div>

        {/* With photo */}
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
