import { ExternalLink } from '@/components/ui/external-link'
import { getProfiles } from '@/lib/content'
import { cn } from '@/lib/utils'

interface ProfileLinksProps {
  className?: string
  linkClassName?: string
}

/**
 * LinkedIn, IMDb and any other profiles that are set, as a row of text links.
 * Each link's tap area extends past its text, so the underline stays put.
 */
export function ProfileLinks({ className, linkClassName }: ProfileLinksProps) {
  const profiles = getProfiles()
  if (!profiles.length) return null
  return (
    <ul className={cn('flex flex-wrap gap-x-6 gap-y-2', className)}>
      {profiles.map((profile) => (
        <li key={profile.key}>
          <ExternalLink
            href={profile.url}
            className={cn(
              "text-link relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']",
              linkClassName
            )}
          >
            {profile.label}
          </ExternalLink>
        </li>
      ))}
    </ul>
  )
}
