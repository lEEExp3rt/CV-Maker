import pkg from '../../package.json'

export interface Envelope {
  type: 'cv-maker'
  version: string
  source: string
  exported: string
  data: any
}

/** Wrap resume data in an envelope for export */
export function wrapEnvelope(data: any): Envelope {
  return {
    type: 'cv-maker',
    version: pkg.version,
    source: typeof window !== 'undefined' ? window.location.origin : 'unknown',
    exported: new Date().toISOString().replace('T', ' ').slice(0, 19),
    data,
  }
}

interface ImportResult {
  data: any
  warning?: string
}

/** Parse imported JSON. Returns data + optional warning. Throws on fatal error. */
export function parseImport(raw: string): ImportResult {
  let parsed: any
  try {
    parsed = JSON.parse(raw)
  } catch (e: any) {
    throw new Error(`JSON 解析失败: ${e.message}`)
  }

  // Check envelope format
  if (parsed && parsed.type === 'cv-maker' && parsed.data) {
    // Version mismatch — warn but still import
    if (parsed.version && parsed.version !== pkg.version) {
      return {
        data: parsed.data,
        warning: `版本不匹配：数据为 ${parsed.version}，当前为 ${pkg.version}，可能存在兼容性问题`,
      }
    }
    return { data: parsed.data }
  }

  // Not cv-maker type — reject
  if (parsed && typeof parsed.type === 'string' && parsed.type !== 'cv-maker') {
    throw new Error(`无效的文件格式: type="${parsed.type}"，需要 type="cv-maker"`)
  }

  // Old-style bare data (backward compatible) — warn user
  return {
    data: parsed,
    warning: '数据为旧版格式（无版本标识），已兼容导入',
  }
}
