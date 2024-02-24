//@ts-nocheck
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  components.a = (props) => {
    return <Link {...props} />
  }
  return {
    ...components,
  }
}