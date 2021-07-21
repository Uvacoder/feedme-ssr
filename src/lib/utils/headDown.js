export function headDown(htmlString) {
  return htmlString
    .replace(/h5/ig, 'h6')
    .replace(/h4/ig, 'h5')
    .replace(/h3/ig, 'h4')
    .replace(/h2/ig, 'h3')
    .replace(/h1/ig, 'h2');
}