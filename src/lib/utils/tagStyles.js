export function getTagStyle(tag, colors) {
  const color = colors[tag] || { bg: '#9ca3af', text: 'white' };
  return `background-color: ${color.bg}; color: ${color.text};`;
}
