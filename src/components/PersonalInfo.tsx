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

  const links: { label: string; url: string }[] = []
  if (homepage) links.push({ label: 'Homepage', url: homepage })
  if (github) links.push({ label: 'GitHub', url: github })
  if (linkedin) links.push({ label: 'LinkedIn', url: linkedin })
  if (custom_links) {
    custom_links.forEach((l) => links.push(l))
  }

  const hasPhoto = !!image

  return (
    <div className={`resume-header ${hasPhoto ? 'resume-header--with-photo' : ''}`}>
      <div className="resume-header-info">
        <h1 className={`resume-name ${hasPhoto ? 'resume-name--left' : ''}`}>
          {name}
        </h1>

        <div className={`resume-contact ${hasPhoto ? 'resume-contact--photo' : ''}`}>
          {contactItems.map((item, i) => (
            <span key={`contact-${i}`}>{item}</span>
          ))}

          {links.map((link) => (
            <span key={`link-${link.label}`}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      {hasPhoto && (
        <img
          className="resume-photo"
          src={image}
          alt={`${name}'s photo`}
        />
      )}
    </div>
  )
}
