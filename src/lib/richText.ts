const readNodeText = (node: unknown): string => {
  if (!node || typeof node !== 'object') return ''

  const maybeText = (node as { text?: unknown }).text
  if (typeof maybeText === 'string') return maybeText

  const children = (node as { children?: unknown }).children
  if (!Array.isArray(children)) return ''

  return children.map(readNodeText).join(' ').trim()
}

export const lexicalToPlainText = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''

  // Lexical stores content under a `root` property
  const root = (value as { root?: unknown }).root
  if (root && typeof root === 'object') return readNodeText(root)

  return readNodeText(value)
}