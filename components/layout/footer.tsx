import { TransitionLink as Link } from '@/components/motion/transition-link'
import { ExternalLink } from '@/components/ui/external-link'
import { contactConfig, getProfiles } from '@/lib/content'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="frame flex flex-col gap-6 py-10 text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} George Kelly, New York</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          <li>
            <a href={`mailto:${contactConfig.email}`} className="hover:text-screen">
              Email
            </a>
          </li>
          {getProfiles().map((profile) => (
            <li key={profile.key}>
              <ExternalLink href={profile.url} className="hover:text-screen">
                {profile.label}
              </ExternalLink>
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
