// Icons powered by Remix Icon (https://remixicon.com) — MIT licensed
// Static imports live in StaticIcons.ts to avoid overlapping with the glob below.

import { useState, useEffect } from 'react'
import {
  BUILTIN_ICONS, type IconDef,
  graduationCapSvg, briefcaseSvg, codeSvg, cpuSvg, awardSvg, trophySvg,
} from './StaticIcons'

export { IconDef }
export { BUILTIN_ICONS }

// ============================================================
// RawIcon — renders SVG string inline
// ============================================================
interface IconProps { size?: number }

export function RawIcon({ svg, size = 13 }: { svg: string; size?: number }) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, verticalAlign: 'middle', flexShrink: 0,
        marginRight: 2,
      }}
    />
  )
}

// ============================================================
// Named icon components — all via BUILTIN_ICONS preset lookup
// ============================================================
function preset(key: string): string {
  return BUILTIN_ICONS.find((i) => i.key === key)?.svg ?? BUILTIN_ICONS[0].svg
}

export function MailIcon({ size = 13 }: IconProps)    { return <RawIcon svg={preset('mail-line')} size={size} /> }
export function PhoneIcon({ size = 13 }: IconProps)   { return <RawIcon svg={preset('phone-line')} size={size} /> }
export function LinkIcon({ size = 13 }: IconProps)    { return <RawIcon svg={preset('link')} size={size} /> }
export function GlobeIcon({ size = 13 }: IconProps)   { return <RawIcon svg={preset('global-line')} size={size} /> }
export function GithubIcon({ size = 13 }: IconProps)  { return <RawIcon svg={preset('github-line')} size={size} /> }
export function WechatIcon({ size = 13 }: IconProps)  { return <RawIcon svg={preset('wechat-line')} size={size} /> }
export function QQIcon({ size = 13 }: IconProps)       { return <RawIcon svg={preset('qq-line')} size={size} /> }
export function ZhihuIcon({ size = 13 }: IconProps)    { return <RawIcon svg={preset('zhihu-line')} size={size} /> }
export function BilibiliIcon({ size = 13 }: IconProps) { return <RawIcon svg={preset('bilibili-line')} size={size} /> }
export function TiktokIcon({ size = 13 }: IconProps)   { return <RawIcon svg={preset('tiktok-line')} size={size} /> }
export function WeiboIcon({ size = 13 }: IconProps)    { return <RawIcon svg={preset('weibo-line')} size={size} /> }
export function TwitterXIcon({ size = 13 }: IconProps) { return <RawIcon svg={preset('twitter-x-line')} size={size} /> }
export function InstagramIcon({ size = 13 }: IconProps){ return <RawIcon svg={preset('instagram-line')} size={size} /> }
export function LinkedInIcon({ size = 13 }: IconProps) { return <RawIcon svg={preset('linkedin-line')} size={size} /> }
export function RedditIcon({ size = 13 }: IconProps)   { return <RawIcon svg={preset('reddit-line')} size={size} /> }
export function DiscordIcon({ size = 13 }: IconProps)  { return <RawIcon svg={preset('discord-line')} size={size} /> }
export function TelegramIcon({ size = 13 }: IconProps) { return <RawIcon svg={preset('telegram-line')} size={size} /> }
export function RssIcon({ size = 13 }: IconProps)      { return <RawIcon svg={preset('rss-line')} size={size} /> }
export function GiteeIcon({ size = 13 }: IconProps)    { return <RawIcon svg={preset('gitee-line')} size={size} /> }
export function StackOverflowIcon({ size = 13 }: IconProps) { return <RawIcon svg={preset('stack-overflow-line')} size={size} /> }

// Section title icons — direct references to SVGs
export function GraduationCapIcon({ size = 16 }: IconProps) { return <RawIcon svg={graduationCapSvg} size={size} /> }
export function BriefcaseIcon({ size = 16 }: IconProps)     { return <RawIcon svg={briefcaseSvg} size={size} /> }
export function CodeIcon({ size = 16 }: IconProps)          { return <RawIcon svg={codeSvg} size={size} /> }
export function CpuIcon({ size = 16 }: IconProps)           { return <RawIcon svg={cpuSvg} size={size} /> }
export function AwardIcon({ size = 16 }: IconProps)         { return <RawIcon svg={awardSvg} size={size} /> }
export function TrophyIcon({ size = 13 }: IconProps)         { return <RawIcon svg={trophySvg} size={size} /> }

// ============================================================
// Custom icon: local path, remote URL, data URI, or Remix name
// ============================================================
const BASE = import.meta.env.BASE_URL

export function CustomIcon({ src, size = 13 }: { src: string; size?: number }) {
  const isAbsolute = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')
  const isRemixName = !isAbsolute && !src.includes('/') && !src.includes('.')

  if (!isAbsolute && !isRemixName) {
    return <img src={BASE + src} alt="" width={size} height={size}
      style={{ verticalAlign: 'middle', marginRight: 2, display: 'inline-block' }} />
  }

  if (isAbsolute) {
    return <img src={src} alt="" width={size} height={size}
      style={{ verticalAlign: 'middle', marginRight: 2, display: 'inline-block' }} />
  }

  return <DynamicRemixIcon name={src} size={size} />
}

// ============================================================
// Dynamic Remix icon loader — glob-scanned, lazy-loaded
// ============================================================
const remixIcons = import.meta.glob<string>(
  '/node_modules/remixicon/icons/**/*.svg',
  { query: '?raw', import: 'default', eager: false }
)

function findRemixIcon(name: string): string | undefined {
  const asSvg = name.endsWith('.svg') ? name : `${name}.svg`
  return Object.keys(remixIcons).find((k) => k.endsWith(`/${asSvg}`))
}

function DynamicRemixIcon({ name, size = 13 }: { name: string; size?: number }) {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setSvg(null)
    setError(false)
    const key = findRemixIcon(name)
    if (!key) { setError(true); return }
    remixIcons[key]?.().then((mod) => {
      setSvg(mod as string)
    }).catch(() => setError(true))
  }, [name])

  if (error) return <RawIcon svg={preset('link')} size={size} />
  if (!svg) return <span style={{ display: 'inline-block', width: size, height: size, verticalAlign: 'middle', marginRight: 2 }} />
  return <RawIcon svg={svg} size={size} />
}
