type LexicalNode = Record<string, unknown>

const textNode = (text: string): LexicalNode => ({
  type: 'text',
  version: 1,
  text,
  format: 0,
  mode: 'normal',
  detail: 0,
  style: '',
})

const paragraphNode = (text: string): LexicalNode => ({
  type: 'paragraph',
  version: 1,
  format: '',
  indent: 0,
  direction: null,
  children: [textNode(text)],
})

export const plainTextToLexical = (value: unknown): LexicalNode => {
  const text = typeof value === 'string' ? value : ''
  const paragraphs = text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)

  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: null,
      children: paragraphs.length > 0 ? paragraphs.map(paragraphNode) : [paragraphNode('')],
    },
  }
}
