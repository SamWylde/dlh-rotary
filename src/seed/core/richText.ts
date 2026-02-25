type Node = Record<string, unknown>

export const p = (text: string): Node => ({
  type: 'paragraph',
  version: 1,
  format: '',
  indent: 0,
  direction: null,
  children: [{ type: 'text', version: 1, text, format: 0, mode: 'normal', detail: 0, style: '' }],
})

export const h2 = (text: string): Node => ({
  type: 'heading',
  tag: 'h2',
  version: 1,
  format: '',
  indent: 0,
  direction: null,
  children: [{ type: 'text', version: 1, text, format: 0, mode: 'normal', detail: 0, style: '' }],
})

export const h3 = (text: string): Node => ({
  type: 'heading',
  tag: 'h3',
  version: 1,
  format: '',
  indent: 0,
  direction: null,
  children: [{ type: 'text', version: 1, text, format: 0, mode: 'normal', detail: 0, style: '' }],
})

export const lexical = (...nodes: Node[]) => ({
  root: { type: 'root', version: 1, format: '', indent: 0, direction: null, children: nodes },
})

export const lexicalParagraph = (text: string) => lexical(p(text))

