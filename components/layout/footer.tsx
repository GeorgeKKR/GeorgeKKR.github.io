import Link from 'next/link'
import { contactConfig, socialLinks } from '@/lib/content'

const socialLabels: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  vimeo: 'Vimeo',
}

export function Footer() {
  const socials = Object.entries(socialLinks).filter(([, url]) => Boolean(url))

  return (
    <footer className="border-t border-line">
      <div className="frame flex flex-col gap-6 py-10 text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} George Kelly, London</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          <li>
            <a href={`mailto:${contactConfig.email}`} className="hover:text-screen">
              Email
            </a>
          </li>
          {socials.map(([key, url]) => (
            <li key={key}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-screen">
                {socialLabels[key] ?? key}
              </a>
            </li>
          ))}
          <li>
            <Link href="/work" className="hover:text-screen">
              Work
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-screen">
              About
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
