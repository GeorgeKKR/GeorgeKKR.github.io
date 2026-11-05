import { Fragment } from 'react'

export interface Credit {
  role: string
  names: string[]
}

/** Role words: small and grey, raised to sit against the cap height of the names */
const roleClass =
  'inline-block align-[0.35em] text-[max(0.36em,0.875rem)] font-medium leading-none tracking-[0.04em] text-smoke mb-1 sm:mb-0 sm:ml-[0.6em] sm:mr-[0.3em]'
/** Names: heavy condensed caps. Long names may wrap on phones, never on wider screens */
const nameClass = 'inline-block font-black sm:whitespace-nowrap'

/**
 * Credits set like the billing block at the foot of a film poster: small
 * role words run straight into heavy condensed names. Each role is glued to
 * its first name and sits closer to it than to the name before, so a role
 * never ends a line where it would read as belonging to the previous credit.
 * On phones each credit gets its own lines, role above names. On scroll,
 * each credit pulls into focus in turn.
 */
export function BillingBlock({ credits }: { credits: Credit[] }) {
  return (
    <p
      data-reveal="focus"
      className="mx-auto max-w-6xl text-balance text-center font-display text-[clamp(1.75rem,4.6vw,4.5rem)] uppercase leading-[1.02] tracking-[-0.005em]"
    >
      {credits.map((credit, index) => {
        const [first, ...rest] = credit.names
        return (
          <span key={`${credit.role}-${index}`} className="mt-4 block first:mt-0 sm:mt-0 sm:inline">
            <span className="sm:whitespace-nowrap">
              <span data-stagger style={{ ['--i' as string]: index * 2 }} className={roleClass}>
                {credit.role}
              </span>
              <br className="sm:hidden" />
              <span data-stagger style={{ ['--i' as string]: index * 2 + 1 }} className={nameClass}>
                {first}
              </span>
            </span>
            {rest.map((name) => (
              <Fragment key={name}>
                {' '}
                <span
                  data-stagger
                  style={{ ['--i' as string]: index * 2 + 1 }}
                  className={nameClass}
                >
                  {name}
                </span>
              </Fragment>
            ))}{' '}
          </span>
        )
      })}
    </p>
  )
}
