import type { PersonalInfo as PersonalInfoType } from '../types/resume'

interface Props {
  data: PersonalInfoType
}

export default function PersonalInfo({ data }: Props) {
  const { name, email, phone, birth, homepage, github, linkedin, image, custom_links } = data

  const contactItems: string[] = []

  if (email) contactItems.push(email)
  if (phone) contactItems.push(phone)
  if (birth) contactItems.push(birth)

  // Build link list
  const links: { label: string; url: string }[] = []
  if (homepage) links.push({ label: 'Homepage', url: homepage })
  if (github) links.push({ label: 'GitHub', url: github })
  if (linkedin) links.push({ label: 'LinkedIn', url: linkedin })
  if (custom_links) {
    custom_links.forEach((l) => links.push(l))
  }

  return (
    <>
      <h1 className="resume-name">{name}</h1>

      <div className="resume-contact" style={{ position: 'relative' }}>
        {image && (
          <img
            className="resume-photo"
            src={image}
            alt={`${name}'s photo`}
          />
        )}

        {contactItems.map((item, i) => (
          <span key={`contact-${i}`}>{item}</span>
        ))}

        {links.length > 0 && (
          <>
            {contactItems.length > 0 && <span className="separator">|</span>}
            {links.map((link, i) => (
              <span key={`link-${i}`}>
                {i > 0 && <span className="separator">|</span>}
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </span>
            ))}
          </>
        )}
      </div>
    </>
  )
}
