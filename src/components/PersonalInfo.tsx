import type { PersonalInfo as PersonalInfoType } from '../types/resume'
import { MailIcon, PhoneIcon, GlobeIcon, GithubIcon, LinkIcon, CustomIcon } from './Icons'

interface Props {
  data: PersonalInfoType
}

export default function PersonalInfo({ data }: Props) {
  const { name, email, phone, homepage, github, photo, customs } = data

  // Strip protocol to show clean URL as link text
  const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  const hasPhoto = !!photo

  return (
    <div className={`resume-header ${hasPhoto ? 'resume-header--with-photo' : ''}`}>
      <div className="resume-header-info">
        <h1 className={`resume-name ${hasPhoto ? 'resume-name--left' : ''}`}>
          {name}
        </h1>

        <div className={`resume-contact ${hasPhoto ? 'resume-contact--photo' : ''}`}>
          {/* Email */}
          {email && (
            <span className="resume-contact-item">
              <MailIcon />
              <a href={`mailto:${email}`}>{email}</a>
            </span>
          )}

          {/* Phone */}
          {phone && (
            <span className="resume-contact-item">
              <PhoneIcon />
              <span>{phone}</span>
            </span>
          )}

          {/* Homepage */}
          {homepage && (
            <span className="resume-contact-item">
              <GlobeIcon />
              <a href={homepage} target="_blank" rel="noopener noreferrer">
                {displayUrl(homepage)}
              </a>
            </span>
          )}

          {/* GitHub */}
          {github && (
            <span className="resume-contact-item">
              <GithubIcon />
              <a href={github} target="_blank" rel="noopener noreferrer">
                {displayUrl(github)}
              </a>
            </span>
          )}

          {/* Custom entries */}
          {customs?.map((link) => {
            const isHttp = /^https?:\/\//.test(link.url)
            const displayText = isHttp ? displayUrl(link.url) : link.url
            return (
              <span className="resume-contact-item" key={`custom-${link.label}`}>
                {link.icon ? <CustomIcon src={link.icon} /> : <LinkIcon />}
                {isHttp ? (
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {displayText}
                  </a>
                ) : (
                  <span>{displayText}</span>
                )}
              </span>
            )
          })}
        </div>
      </div>

      {hasPhoto && (
        <img
          className="resume-photo"
          src={photo}
          alt={`${name}'s photo`}
        />
      )}
    </div>
  )
}
