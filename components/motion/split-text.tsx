import { Fragment } from 'react'

interface SplitTextProps {
  text: string
  /** Extra delay before the first unit, in ms */
  delay?: number
  /** Animate letter by letter (titles) or word by word (sentences) */
  by?: 'char' | 'word'
}

/**
 * Splits text into letters (or words) that rise out of a mask.
 * Screen readers get the plain text; the letters are hidden from them.
 * Pair with a parent carrying [data-reveal="rise"].
 */
export function SplitText({ text, delay = 0, by = 'char' }: SplitTextProps) {
  let index = 0
  const words = text.split(' ')

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ ['--delay' as string]: `${delay}ms` }}>
        {words.map((word, w) => (
          <Fragment key={`${word}-${w}`}>
            <span className="rise-mask">
              {by === 'word' ? (
                <span className="rise-unit" style={{ ['--i' as string]: index++ * 2 }}>
                  {word}
                </span>
              ) : (
                Array.from(word).map((char, c) => (
                  <span key={c} className="rise-unit" style={{ ['--i' as string]: index++ }}>
                    {char}
                  </span>
                ))
              )}
            </span>
            {w < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </>
  )
}
