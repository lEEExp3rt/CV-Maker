import Layout from './components/Layout'
import Resume from './Resume'
import type { ResumeData } from './types/resume'

const DEMO_DATA: ResumeData = {
  personal_info: {
    name: '张三',
    photo: '',
    contact: {
      email: 'zhangsan@zju.edu.cn',
      phone: '+86-138-0000-0000',
      homepage: 'https://zhangsan.dev',
      github: 'https://github.com/zhangsan',
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

export default function DemoPage() {
  return (
    <Layout>
      <div style={{
        flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center',
        padding: 24, background: '#e9eef3',
      }}>
        <div style={{
          background: '#fff', borderRadius: 8,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}>
          <Resume data={DEMO_DATA} settings={{ color_scheme: 'navy', language: 'zh' }} />
        </div>
      </div>
    </Layout>
  )
}
