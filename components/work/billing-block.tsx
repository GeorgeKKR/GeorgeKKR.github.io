import { Fragment } from 'react'

export interface Credit {
  role: string
  names: string[]
}

/**
 * Credits set like the billing block at the foot of a film poster:
 * small role words run straight into heavy condensed names. On scroll,
 * each credit pulls into focus in turn.
 */
export function BillingBlock({ credits }: { credits: Credit[] }) {
  return (
    <p
      data-reveal="focus"
      className="mx-auto max-w-6xl text-balance text-center font-display text-[clamp(1.75rem,4.6vw,4.5rem)] uppercase leading-[1.02] tracking-[-0.005em]"
    >
      {credits.map((credit, index) => (
        <Fragment key={`${credit.role}-${index}`}>
          <span
            data-stagger
            style={{ ['--i' as string]: index * 2 }}
            className="mx-[0.15em] inline-block align-[0.35em] text-[max(0.36em,0.75rem)] font-medium leading-none tracking-[0.04em] text-smoke"
          >
            {credit.role}
          </span>{' '}
          {credit.names.map((name, i) => (
            <Fragment key={name}>
              <span
                data-stagger
                style={{ ['--i' as string]: index * 2 + 1 }}
                className="inline-block whitespace-nowrap font-black"
              >
                {name}
              </span>
              {i < credit.names.length - 1 ? ' ' : ''}
            </Fragment>
          ))}{' '}
        </Fragment>
      ))}
    </p>
  )
}
