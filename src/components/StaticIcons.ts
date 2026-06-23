// Static icon imports from Remix Icon — imported once, bundled into main chunk.
// Separated from Icons.tsx to avoid overlap with import.meta.glob.
// Do NOT add import.meta.glob calls in this file.

import mailSvg     from 'remixicon/icons/Business/mail-line.svg?raw'
import phoneSvg    from 'remixicon/icons/Device/phone-line.svg?raw'
import globalSvg   from 'remixicon/icons/Business/global-line.svg?raw'
import githubSvg   from 'remixicon/icons/Logos/github-line.svg?raw'
import linkSvg     from 'remixicon/icons/Editor/link.svg?raw'
import graduationCapSvg from 'remixicon/icons/Others/graduation-cap-line.svg?raw'
import briefcaseSvg from 'remixicon/icons/Business/briefcase-line.svg?raw'
import codeSvg     from 'remixicon/icons/Development/code-line.svg?raw'
import cpuSvg      from 'remixicon/icons/Device/cpu-line.svg?raw'
import awardSvg    from 'remixicon/icons/Business/award-line.svg?raw'
import trophySvg   from 'remixicon/icons/Finance/trophy-line.svg?raw'
import wechatSvg   from 'remixicon/icons/Logos/wechat-line.svg?raw'
import qqSvg       from 'remixicon/icons/Logos/qq-line.svg?raw'
import zhihuSvg    from 'remixicon/icons/Logos/zhihu-line.svg?raw'
import bilibiliSvg from 'remixicon/icons/Logos/bilibili-line.svg?raw'
import tiktokSvg   from 'remixicon/icons/Logos/tiktok-line.svg?raw'
import weiboSvg    from 'remixicon/icons/Logos/weibo-line.svg?raw'
import twitterXSvg from 'remixicon/icons/Logos/twitter-x-line.svg?raw'
import instagramSvg from 'remixicon/icons/Logos/instagram-line.svg?raw'
import linkedinSvg from 'remixicon/icons/Logos/linkedin-line.svg?raw'
import redditSvg   from 'remixicon/icons/Logos/reddit-line.svg?raw'
import discordSvg  from 'remixicon/icons/Logos/discord-line.svg?raw'
import telegramSvg from 'remixicon/icons/Logos/telegram-line.svg?raw'
import rssSvg      from 'remixicon/icons/Device/rss-line.svg?raw'
import giteeSvg    from 'remixicon/icons/Logos/gitee-line.svg?raw'
import stackOverflowSvg from 'remixicon/icons/Logos/stack-overflow-line.svg?raw'

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

// Direct exports for single-icon users (Footer, etc.)
export { graduationCapSvg, briefcaseSvg, codeSvg, cpuSvg, awardSvg, trophySvg }
