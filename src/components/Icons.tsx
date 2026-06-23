// Icons powered by Remix Icon (https://remixicon.com) — MIT licensed
// Built-in icons use static imports for tree-shaking.
// DynamicIcon loads arbitrary Remix icons by name at runtime.
// Footer icons (react/vite/typescript/github/lucide) kept as local SVGs in public/icons/.

import { useState, useEffect } from 'react'

// ============================================================
// Static imports — built-in preset icons
// ============================================================
import mailSvg from 'remixicon/icons/Business/mail-line.svg?raw'
import phoneSvg from 'remixicon/icons/Device/phone-line.svg?raw'
import globalSvg from 'remixicon/icons/Business/global-line.svg?raw'
import githubSvg from 'remixicon/icons/Logos/github-line.svg?raw'
import linkSvg from 'remixicon/icons/Editor/link.svg?raw'
import graduationCapSvg from 'remixicon/icons/Others/graduation-cap-line.svg?raw'
import briefcaseSvg from 'remixicon/icons/Business/briefcase-line.svg?raw'
import codeSvg from 'remixicon/icons/Development/code-line.svg?raw'
import cpuSvg from 'remixicon/icons/Device/cpu-line.svg?raw'
import awardSvg from 'remixicon/icons/Business/award-line.svg?raw'
import trophySvg from 'remixicon/icons/Finance/trophy-line.svg?raw'

// Social media
import wechatSvg from 'remixicon/icons/Logos/wechat-line.svg?raw'
import qqSvg from 'remixicon/icons/Logos/qq-line.svg?raw'
import zhihuSvg from 'remixicon/icons/Logos/zhihu-line.svg?raw'
import bilibiliSvg from 'remixicon/icons/Logos/bilibili-line.svg?raw'
import tiktokSvg from 'remixicon/icons/Logos/tiktok-line.svg?raw'
import weiboSvg from 'remixicon/icons/Logos/weibo-line.svg?raw'
import twitterXSvg from 'remixicon/icons/Logos/twitter-x-line.svg?raw'
import instagramSvg from 'remixicon/icons/Logos/instagram-line.svg?raw'
import linkedinSvg from 'remixicon/icons/Logos/linkedin-line.svg?raw'
import redditSvg from 'remixicon/icons/Logos/reddit-line.svg?raw'
import discordSvg from 'remixicon/icons/Logos/discord-line.svg?raw'
import telegramSvg from 'remixicon/icons/Logos/telegram-line.svg?raw'
import rssSvg from 'remixicon/icons/Device/rss-line.svg?raw'
import giteeSvg from 'remixicon/icons/Logos/gitee-line.svg?raw'
import stackOverflowSvg from 'remixicon/icons/Logos/stack-overflow-line.svg?raw'

// ============================================================
// Icon registry — maps preset names to SVG strings
// ============================================================

export interface IconDef {
  key: string
  label: string
  svg: string
}

export const BUILTIN_ICONS: IconDef[] = [
  { key: 'link', label: '链接', svg: linkSvg },
  { key: 'mail-line', label: '邮箱', svg: mailSvg },
  { key: 'phone-line', label: '电话', svg: phoneSvg },
  { key: 'global-line', label: '网站', svg: globalSvg },
  { key: 'github-line', label: 'GitHub', svg: githubSvg },
  { key: 'wechat-line', label: '微信', svg: wechatSvg },
  { key: 'qq-line', label: 'QQ', svg: qqSvg },
  { key: 'zhihu-line', label: '知乎', svg: zhihuSvg },
  { key: 'bilibili-line', label: 'B站', svg: bilibiliSvg },
  { key: 'tiktok-line', label: '抖音', svg: tiktokSvg },
  { key: 'weibo-line', label: '微博', svg: weiboSvg },
  { key: 'twitter-x-line', label: 'X / Twitter', svg: twitterXSvg },
  { key: 'instagram-line', label: 'Instagram', svg: instagramSvg },
  { key: 'linkedin-line', label: 'LinkedIn', svg: linkedinSvg },
  { key: 'reddit-line', label: 'Reddit', svg: redditSvg },
  { key: 'discord-line', label: 'Discord', svg: discordSvg },
  { key: 'telegram-line', label: 'Telegram', svg: telegramSvg },
  { key: 'rss-line', label: 'RSS', svg: rssSvg },
  { key: 'gitee-line', label: 'Gitee', svg: giteeSvg },
  { key: 'stack-overflow-line', label: 'Stack Overflow', svg: stackOverflowSvg },
]

// ============================================================
// Icon components
// ============================================================

interface IconProps { size?: number }

function RawIcon({ svg, size = 13 }: { svg: string; size?: number }) {
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

function presetIcon(key: string): string {
  return BUILTIN_ICONS.find((i) => i.key === key)?.svg ?? linkSvg
}

// Personal info icons (email/phone/link used directly in PersonalInfo.tsx)
export function MailIcon({ size = 13 }: IconProps)    { return <RawIcon svg={presetIcon('mail-line')} size={size} /> }
export function PhoneIcon({ size = 13 }: IconProps)   { return <RawIcon svg={presetIcon('phone-line')} size={size} /> }
export function LinkIcon({ size = 13 }: IconProps)    { return <RawIcon svg={presetIcon('link')} size={size} /> }

// Section title icons
export function GraduationCapIcon({ size = 16 }: IconProps) { return <RawIcon svg={graduationCapSvg} size={size} /> }
export function BriefcaseIcon({ size = 16 }: IconProps)     { return <RawIcon svg={briefcaseSvg} size={size} /> }
export function CodeIcon({ size = 16 }: IconProps)          { return <RawIcon svg={codeSvg} size={size} /> }
export function CpuIcon({ size = 16 }: IconProps)           { return <RawIcon svg={cpuSvg} size={size} /> }
export function AwardIcon({ size = 16 }: IconProps)         { return <RawIcon svg={awardSvg} size={size} /> }
export function TrophyIcon({ size = 13 }: IconProps)        { return <RawIcon svg={trophySvg} size={size} /> }

// Social / link icons — all via presetIcon lookup
export function GlobeIcon({ size = 13 }: IconProps)         { return <RawIcon svg={presetIcon('global-line')} size={size} /> }
export function GithubIcon({ size = 13 }: IconProps)        { return <RawIcon svg={presetIcon('github-line')} size={size} /> }
export function WechatIcon({ size = 13 }: IconProps)        { return <RawIcon svg={presetIcon('wechat-line')} size={size} /> }
export function QQIcon({ size = 13 }: IconProps)             { return <RawIcon svg={presetIcon('qq-line')} size={size} /> }
export function ZhihuIcon({ size = 13 }: IconProps)          { return <RawIcon svg={presetIcon('zhihu-line')} size={size} /> }
export function BilibiliIcon({ size = 13 }: IconProps)       { return <RawIcon svg={presetIcon('bilibili-line')} size={size} /> }
export function TiktokIcon({ size = 13 }: IconProps)         { return <RawIcon svg={presetIcon('tiktok-line')} size={size} /> }
export function WeiboIcon({ size = 13 }: IconProps)          { return <RawIcon svg={presetIcon('weibo-line')} size={size} /> }
export function TwitterXIcon({ size = 13 }: IconProps)       { return <RawIcon svg={presetIcon('twitter-x-line')} size={size} /> }
export function InstagramIcon({ size = 13 }: IconProps)      { return <RawIcon svg={presetIcon('instagram-line')} size={size} /> }
export function LinkedInIcon({ size = 13 }: IconProps)       { return <RawIcon svg={presetIcon('linkedin-line')} size={size} /> }
export function RedditIcon({ size = 13 }: IconProps)         { return <RawIcon svg={presetIcon('reddit-line')} size={size} /> }
export function DiscordIcon({ size = 13 }: IconProps)        { return <RawIcon svg={presetIcon('discord-line')} size={size} /> }
export function TelegramIcon({ size = 13 }: IconProps)       { return <RawIcon svg={presetIcon('telegram-line')} size={size} /> }
export function RssIcon({ size = 13 }: IconProps)            { return <RawIcon svg={presetIcon('rss-line')} size={size} /> }
export function GiteeIcon({ size = 13 }: IconProps)          { return <RawIcon svg={presetIcon('gitee-line')} size={size} /> }
export function StackOverflowIcon({ size = 13 }: IconProps)  { return <RawIcon svg={presetIcon('stack-overflow-line')} size={size} /> }

// ============================================================
// Custom icon: local path, remote URL, data URI, or Remix name
// ============================================================
export function CustomIcon({ src, size = 13 }: { src: string; size?: number }) {
  const isAbsolute = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')
  const isRemixName = !isAbsolute && !src.includes('/') && !src.includes('.')

  if (!isAbsolute && !isRemixName) {
    // Local path — use BASE URL
    const BASE = import.meta.env.BASE_URL
    return <img src={BASE + src} alt="" width={size} height={size}
      style={{ verticalAlign: 'middle', marginRight: 2, display: 'inline-block' }} />
  }

  if (isAbsolute) {
    return <img src={src} alt="" width={size} height={size}
      style={{ verticalAlign: 'middle', marginRight: 2, display: 'inline-block' }} />
  }

  // Remix icon name — dynamic load
  return <DynamicRemixIcon name={src} size={size} />
}

// ============================================================
// Dynamic Remix icon loader — pre-scanned glob, lazy-loaded at runtime
// ============================================================

// Glob-scan all Remix icons for dynamic loading. Vite lazy-loads on demand.
const remixIcons = import.meta.glob<string>(
  '/node_modules/remixicon/icons/**/*.svg',
  { query: '?raw', import: 'default', eager: false }
)

function findRemixIcon(name: string): string | undefined {
  const asSvg = name.endsWith('.svg') ? name : `${name}.svg`
  return Object.keys(remixIcons).find((k) => k.endsWith(`/${asSvg}`))
}

function DynamicRemixIcon({ name, size = 12 }: { name: string; size?: number }) {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setSvg(null)
    setError(false)

    const key = findRemixIcon(name)
    if (!key) { setError(true); return }

    remixIcons[key]?.().then((mod) => {
      setSvg(mod as string)
    }).catch(() => {
      setError(true)
    })
  }, [name])

  if (error) {
    return <RawIcon svg={linkSvg} size={size} />
  }

  if (!svg) {
    return <span style={{ display: 'inline-block', width: size, height: size, verticalAlign: 'middle', marginRight: 2 }} />
  }

  return <RawIcon svg={svg} size={size} />
}
