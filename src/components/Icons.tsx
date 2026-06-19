// Icons from Lucide (https://lucide.dev) — MIT licensed
// SVG files stored locally in public/images/icons/

interface IconProps {
  size?: number
}

function LocalIcon({ src, size = 12 }: { src: string; size?: number }) {
  return (
    <img
      src={`/icons/${src}`}
      alt=""
      width={size}
      height={size}
      style={{ verticalAlign: 'middle', marginRight: 2, display: 'inline-block' }}
    />
  )
}

export function MailIcon({ size = 12 }: IconProps) {
  return <LocalIcon src="mail.svg" size={size} />
}

export function PhoneIcon({ size = 12 }: IconProps) {
  return <LocalIcon src="phone.svg" size={size} />
}

export function GlobeIcon({ size = 12 }: IconProps) {
  return <LocalIcon src="globe.svg" size={size} />
}

export function GithubIcon({ size = 12 }: IconProps) {
  return <LocalIcon src="github.svg" size={size} />
}

export function LinkIcon({ size = 12 }: IconProps) {
  return <LocalIcon src="link.svg" size={size} />
}

// Section title icons
export function GraduationCapIcon({ size = 16 }: IconProps) {
  return <LocalIcon src="graduation-cap.svg" size={size} />
}

export function BriefcaseIcon({ size = 16 }: IconProps) {
  return <LocalIcon src="briefcase.svg" size={size} />
}

export function CodeIcon({ size = 16 }: IconProps) {
  return <LocalIcon src="code.svg" size={size} />
}

export function CpuIcon({ size = 16 }: IconProps) {
  return <LocalIcon src="cpu.svg" size={size} />
}

export function AwardIcon({ size = 16 }: IconProps) {
  return <LocalIcon src="award.svg" size={size} />
}

/** Custom icon: supports local paths (relative to public/), remote URLs, and data URIs */
export function CustomIcon({ src, size = 12 }: { src: string; size?: number }) {
  const isAbsolute = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')
  return (
    <img
      src={isAbsolute ? src : `/${src}`}
      alt=""
      width={size}
      height={size}
      style={{ verticalAlign: 'middle', marginRight: 2, display: 'inline-block' }}
    />
  )
}
