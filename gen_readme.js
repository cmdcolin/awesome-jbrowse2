import fs from 'fs'
const data = JSON.parse(fs.readFileSync('LINKS.json', 'utf8'))
console.log('# awesome-jbrowse2')

console.log(
  'awesome jbrowse 2 citations, screenshots or instances around the web. visit website here https://cmdcolin.github.io/awesome-jbrowse2\n\n## Publications/instances',
)

console.log('name|instance/url|note|img')
console.log('-----|----|----|----')
data.links.forEach(link => {
  console.log(
    link.name || '',
    '|',
    link.pub?.title || '',
    link.pub?.doi ? `([pub](${link.pub.doi}))` : '',
    link.url ? `([url](${link.url}))` : '',
    '|',
    link.note || '',
    '|',
    link.img ? `[img](img/${link.img})` : '',
  )
})
