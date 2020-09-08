import NextLink from 'next/link'

/**
 * A custom wrapper for Links.
 * Useful for shorthand links
 */
export const Link: React.FC<{
  href: string
}> = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  )
}
