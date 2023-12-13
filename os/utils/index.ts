export function getSpacing(spacing: number, spacer = ' '): string {
  const text = []
  let i = spacing
  while (i > 0) {
    text.push(spacer)
    i -= 1
  }
  return text.join('')
}
